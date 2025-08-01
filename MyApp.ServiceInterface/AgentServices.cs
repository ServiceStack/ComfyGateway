using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using MyApp.ServiceModel;
using ServiceStack;
using ServiceStack.Data;
using ServiceStack.Host;
using ServiceStack.OrmLite;
using ServiceStack.Text;
using SkiaSharp;

namespace MyApp.ServiceInterface;

public class AgentServices(ILogger<AgentServices> log, 
    AppData appData, 
    ComfyMetadata metadata, 
    ComfyGateway comfyGateway,
    IDbConnectionFactory dbFactory,
    AgentEventsManager agentManager,
    ICommandExecutor executor)
    : Service
{
    public AgentEventsManager AgentManager { get; } = agentManager;
    
    public object Post(UpdateComfyAgent request)
    {
        var userId = Request.AssertApiKeyUserId();
        var now = DateTime.UtcNow;

        using var db = Db;
        if (request.RunningGenerationIds?.Count > 0)
        {
            db.UpdateOnly(() => new WorkflowGeneration
            {
                ModifiedBy = userId,
                ModifiedDate = DateTime.UtcNow,
                StatusUpdate = GenerationStatus.GenerationStarted,
            }, where: x => x.DeviceId == request.DeviceId 
               && request.RunningGenerationIds.Contains(x.Id)
               && x.StatusUpdate != GenerationStatus.GenerationStarted);
        }
        
        if (request.QueuedGenerationIds?.Count > 0)
        {
            db.UpdateOnly(() => new WorkflowGeneration
            {
                ModifiedBy = userId,
                ModifiedDate = DateTime.UtcNow,
                StatusUpdate = GenerationStatus.AssignedToAgent,
            }, where: x => x.DeviceId == request.DeviceId
               && request.QueuedGenerationIds.Contains(x.Id)
               && x.StatusUpdate != GenerationStatus.AssignedToAgent);
        }

        if (!appData.ComfyAgents.TryGetValue(request.DeviceId, out var agent))
        {
            return new EmptyResponse();
        }

        agent.SetLastUpdate();
        agent.QueueCount = request.QueueCount;
        agent.RunningGenerationIds = request.RunningGenerationIds ?? [];
        agent.QueuedGenerationIds = request.QueuedGenerationIds ?? [];
        agent.QueuedIds = [..agent.QueuedGenerationIds, ..agent.RunningGenerationIds];
        agent.Gpus = request.Gpus ?? agent.Gpus;
        agent.RunningGenerationIds = request.RunningGenerationIds ?? [];
        agent.QueuedGenerationIds = request.QueuedGenerationIds ?? [];
            
        db.UpdateOnly(() => new ComfyAgent
        {
            QueueCount = agent.QueueCount,
            Gpus = agent.Gpus,
            ModifiedDate = agent.ModifiedDate,
            LastIp = Request!.UserHostAddress,
        }, where: x => x.DeviceId == request.DeviceId);
        
        return new EmptyResponse();
    }

    public object Any(UpdateComfyAgentStatus request)
    {
        var userId = Request.AssertApiKeyUserId();
        var now = DateTime.UtcNow;

        var sb = StringBuilderCache.Allocate();
        if (!string.IsNullOrEmpty(request.Status))
        {
            sb.AppendLine(request.Status);
        }
        if (!string.IsNullOrEmpty(request.Logs))
        {
            sb.AppendLine(request.Logs);
        }
        if (request.Error != null)
        {
            sb.AppendLine($"ERROR: {request.Error.ErrorCode} {request.Error.Message}");
            if (!string.IsNullOrEmpty(request.Error.StackTrace))
            {
                sb.AppendLine(request.Error.StackTrace);
            }
        }
        if (sb.Length > 0)
        {
            log.LogInformation("[{DeviceId}] Update:\n{Status}", request.DeviceId[..4], sb.ToString());
        }

        if (!appData.ComfyAgents.TryGetValue(request.DeviceId, out var agent))
        {
            return new EmptyResponse();
        }

        agent.Status = request.Status ?? agent.Status;
        agent.Downloading = request.Downloading ?? agent.Downloading;
        agent.Downloaded = request.Downloaded ?? agent.Downloaded;
        agent.DownloadFailed = request.DownloadFailed ?? agent.DownloadFailed;
        agent.Logs = request.Logs ?? agent.Logs;
        agent.Error = request.Error ?? agent.Error;
        agent.SetLastUpdate(now);

        using var db = Db;
        if (request.Logs != null)
        {
            db.UpdateOnly(() => new ComfyAgent
            {
                Status = agent.Status,
                Downloading = agent.Downloading,
                Downloaded = agent.Downloaded,
                DownloadFailed = agent.DownloadFailed,
                Logs = agent.Logs,
                Error = agent.Error,
                ModifiedDate = agent.ModifiedDate,
            }, where: x => x.DeviceId == request.DeviceId);
        }
        else
        {
            db.UpdateOnly(() => new ComfyAgent
            {
                Status = agent.Status,
                Downloading = agent.Downloading,
                Downloaded = agent.Downloaded,
                DownloadFailed = agent.DownloadFailed,
                Error = agent.Error,
                ModifiedDate = now,
            }, where: x => x.DeviceId == request.DeviceId);
        }
        
        return new EmptyResponse();
    }

    const int MaxAgentQueueCount = 3;

    /* This method handles agent polling requests to get tasks to execute
     * 
     * Flow:
     * 1. Updates status of running/queued generations in the database
     * 2. Checks if agent is registered, returns Register event if not
     * 3. Updates agent state with current queue information
     * 4. Returns any pending events for the agent immediately if available
     * 5. If agent is at max capacity, waits for capacity to free up (with timeout)
     * 6. Checks for missing assigned generations for this device
     * 7. Checks for pending generations for this device or user
     * 8. Checks for any pending generations for any device
     * 9. Waits for new events if no generations found
     * 10. As last resort, assigns any unassigned generations to this agent
     */
    public async Task<object> Get(GetComfyAgentEvents request)
    {
        var startedAt = DateTime.UtcNow;
        var waitFor = TimeSpan.FromSeconds(60);

        var ret = new GetComfyAgentEventsResponse();
        
        var userId = Request.AssertApiKeyUserId();
        using var db = Db;

        if (!appData.ComfyAgents.TryGetValue(request.DeviceId, out var agent))
        {
            ret.Results.Add(new AgentEvent { Name = EventMessages.Register });
            return ret;
        }
        agent.SetLastUpdate();
        
        log.LogDebug("🖥 GetComfyAgentEvents from {DeviceId} {HostAddress} 📬 {QueueCount}\n    Language Models: {LanguageModels}\n    {GenerationsCount} Generations, {AiTasksCount} AI Tasks",
            agent.DeviceId, agent.LastIp, agent.QueueCount, agent.LanguageModels?.Join(", ") ?? "none", 
            agentManager.QueuedGenerations.Count, AgentManager.AiTasks.Count);

        var spareCapacity = MaxAgentQueueCount - agent.QueueCount;
        long generationsCounter = -1;
        long aiTasksCounter = -1;
        var pollCounter = 0;
        do
        {
            // Return any pending events immediately
            var agentEvents = AgentManager.GetAgentEvents(agent.DeviceId);
            while (agentEvents.TryTake(out var msg) && ret.Results.Count < MaxAgentQueueCount)
            {
                ret.Results.Add(msg);
            }
            if (ret.Results.Count > 0)
            {
                log.LogInformation("👉 GetComfyAgentEvents: {DeviceId} - assigned {Count} new agent events", 
                    agent.DeviceId, ret.Results.Count);
                return ret;
            }

            // Check for any pending generations for this device
            if (generationsCounter != AgentManager.GenerationRequest && spareCapacity > 0)
            {
                var nextGenerations = AgentManager.GetNextGenerations(db, agent, userId, take: spareCapacity);
                if (nextGenerations.Length > 0)
                {
                    ret.Results.AddRange(nextGenerations.Map(x => x.ToExecWorkflow()));
                    log.LogInformation("👉 GetComfyAgentEvents: {DeviceId} - assigned {Count} new Generation Requests ({GenerationsCount} Generations, {AiTasksCount} AI Tasks):\n{GenerationIds}", 
                        agent.DeviceId, ret.Results.Count, agentManager.QueuedGenerations.Count, AgentManager.AiTasks.Count, nextGenerations.Map(x => x.Id).Join(", "));
                    return ret;
                }
                generationsCounter = AgentManager.GenerationRequest;
            }

            // Check for any pending AI Tasks for this device
            if (aiTasksCounter != AgentManager.AiTaskRequest && spareCapacity > 0)
            {
                var nextAiTasks = AgentManager.GetNextAiTasks(agent, userId, take: spareCapacity);
                if (nextAiTasks.Length > 0)
                {
                    ret.Results.AddRange(nextAiTasks);
                    log.LogInformation("👉 GetComfyAgentEvents: {DeviceId} - assigned {Count} new AI Tasks ({GenerationsCount} Generations, {AiTasksCount} AI Tasks)", 
                        agent.DeviceId, ret.Results.Count, agentManager.QueuedGenerations.Count, AgentManager.AiTasks.Count);
                    return ret;
                }
                aiTasksCounter = AgentManager.AiTaskRequest;
            }

            // Check if they've reported a lower queue count
            spareCapacity = MaxAgentQueueCount - agent.QueueCount;

            // Return empty response to agent if we've been waiting for too long
            if (DateTime.UtcNow - startedAt > waitFor)
            {
                var olderThan5Minutes = DateTime.UtcNow.AddMinutes(-5);
                var pendingGenerationsForDevice = Db.Select(Db.From<WorkflowGeneration>()
                    .Where(x => x.Result == null && x.Error == null && x.DeletedDate == null 
                        && x.DeviceId == agent.DeviceId && x.ModifiedDate < olderThan5Minutes)
                    .OrderBy(x => x.CreatedDate));

                if (pendingGenerationsForDevice.Count > 0)
                {
                    ret.Results.AddRange(pendingGenerationsForDevice.Map(x => x.ToExecWorkflow()));
                    log.LogInformation("👉 GetComfyAgentEvents: Agent {DeviceId} has {Count} pending generations older than 5 minutes", 
                        agent.DeviceId, pendingGenerationsForDevice.Count);
                    return ret;
                }
                
                log.LogInformation("👉 GetComfyAgentEvents: {DeviceId} 📬 {QueueCount} - timed out ({GenerationsCount} Generations, {AiTasksCount} AI Tasks)", 
                    agent.DeviceId, agent.QueueCount, agentManager.QueuedGenerations.Count, AgentManager.AiTasks.Count);
                return ret;
            }

            // All checks are against in-memory collections so can poll frequently
            await Task.Delay(100);
            pollCounter++;
        } while (true);
    }
    
    public object Any(TestGenerations request)
    {
        var activeDeviceIds = appData.GetActiveComfyAgentDeviceIds();
        var results = Db.Select(Db.From<WorkflowGeneration>()
            .Where(x => x.Result == null && x.Error == null && x.DeletedDate == null 
                        && x.CreatedDate < DateTime.UtcNow.AddMinutes(-5) && !activeDeviceIds.Contains(x.DeviceId))
            .OrderBy(x => x.CreatedDate));
        return results;
    }
    
    public async Task<object> Any(RegisterComfyAgent request)
    {
        var objectInfoFile = base.Request!.Files.FirstOrDefault();
        if (objectInfoFile == null)
            throw new ArgumentException("No object_info file uploaded.");

        var debugInfoJson = await objectInfoFile.InputStream.ReadToEndAsync();
        
        var nodeDefs = ComfyMetadata.ParseNodeDefinitions(debugInfoJson);

        var apiKey = (ApiKeysFeature.ApiKey)Request.GetApiKey();
        var userId = apiKey.UserId
            ?? throw new Exception("API Key not assigned to a user");

        var workflowPath = request.DeviceId.GetObjectInfoPath();
        await appData.WriteAppDataTextFileAsync(workflowPath, debugInfoJson);

        List<string> sorted(IEnumerable<string>? items) => items?.OrderBy(x => x).ToList() ?? [];
        
        using var db = Db;
        var agent = db.Single<ComfyAgent>(x => x.DeviceId == request.DeviceId);
        if (agent != null)
        {
            if (agent.UserId != userId)
                throw new Exception("Device already registered to another user");
            agent.UserName = Request.GetClaimsPrincipal().GetUserName();
        }
        else
        {
            agent = new ComfyAgent
            {
                DeviceId = request.DeviceId,
                UserId = userId,
                CreatedDate = DateTime.UtcNow,
                QueueCount = request.QueueCount,
                RequirePip = appData.RequirePip,
                RequireNodes = appData.RequireNodes,
                RequireModels = appData.RequireModels,
                DevicePool = DateTime.UtcNow,
                Settings = new ComfyAgentSettings {
                    PreserveOutputs = false,
                },
            };
        }
        
        agent.SetLastUpdate();
        agent.Version = request.Version;
        agent.ComfyVersion = request.ComfyVersion;
        agent.Gpus = request.Gpus;
        agent.NodeDefs = nodeDefs;
        agent.Nodes = sorted(nodeDefs.Keys.Where(x => !appData.DefaultGatewayNodes.Contains(x)));
        agent.Workflows = request.Workflows ?? [];
        agent.UserName = apiKey.UserName;
        agent.ApiKey = apiKey.Key;
        agent.Enabled = true;
        agent.OfflineDate = null;
        agent.LastIp = Request.UserHostAddress;
        agent.LanguageModels = request.LanguageModels;
        agent.Downloading = null;
        agent.Status = "Registered";
        agent.Logs = null;
        agent.Error = null;

        if (!nodeDefs.TryGetValue("CheckpointLoader", out var checkpointLoader))
            throw new Exception("CheckpointLoader node not found");
        agent.Checkpoints = sorted(checkpointLoader.GetInput("ckpt_name")?.EnumValues);

        if (nodeDefs.TryGetValue("UNETLoader", out var unetLoader))
            agent.DiffusionModels = sorted(unetLoader.GetInput("unet_name")?.EnumValues);
        if (nodeDefs.TryGetValue("VAELoader", out var vaeLoader))
            agent.Vae = sorted(vaeLoader.GetInput("vae_name")?.EnumValues);
        if (nodeDefs.TryGetValue("CLIPLoader", out var clipLoader))
            agent.Clip = sorted(clipLoader.GetInput("clip_name")?.EnumValues);
        if (nodeDefs.TryGetValue("CLIPVisionLoader", out var clipVisionLoader))
            agent.ClipVision = sorted(clipVisionLoader.GetInput("clip_name")?.EnumValues);
        if (nodeDefs.TryGetValue("LoraLoader", out var loraLoader))
            agent.Loras = sorted(loraLoader.GetInput("lora_name")?.EnumValues);
        if (nodeDefs.TryGetValue("UpscaleModelLoader", out var upscaleLoader))
            agent.UpscaleModels = sorted(upscaleLoader.GetInput("model_name")?.EnumValues);
        if (nodeDefs.TryGetValue("ControlNetLoader", out var controlNetLoader))
            agent.Controlnet = sorted(controlNetLoader.GetInput("control_net_name")?.EnumValues);
        if (nodeDefs.TryGetValue("StyleModelLoader", out var styleLoader))
            agent.StyleModels = sorted(styleLoader.GetInput("style_model_name")?.EnumValues);
        if (nodeDefs.TryGetValue("PhotoMakerLoader", out var photoMakerLoader))
            agent.Photomaker = sorted(photoMakerLoader.GetInput("photomaker_model_name")?.EnumValues);
        if (nodeDefs.TryGetValue("GLIGENLoader", out var gligenLoader))
            agent.Gligen = sorted(gligenLoader.GetInput("gligen_name")?.EnumValues);
        
        //TODO Verify predicted locations
        agent.Hypernetworks = sorted(nodeDefs.TryGetValue("HypernetworkLoader", out var hypernetworkLoader) 
            ? hypernetworkLoader.GetInput("hypernetwork_name")?.EnumValues : null);
        agent.Diffusers = sorted(nodeDefs.TryGetValue("DiffusersLoader", out var diffusersLoader) 
            ? diffusersLoader.GetInput("model_path")?.EnumValues : null); // diffusers_name?
        agent.Embeddings = sorted(nodeDefs.TryGetValue("TextualInversionLoader", out var textualInversionLoader) 
            ? textualInversionLoader.GetInput("textual_inversion_name")?.EnumValues : null);
        agent.Configs = sorted(nodeDefs.TryGetValue("ConfigLoader", out var configLoader) 
            ? configLoader.GetInput("config_name")?.EnumValues : null);
        agent.VaeApprox = sorted(nodeDefs.TryGetValue("VAEApproxLoader", out var vaeApproxLoader) 
            ? vaeApproxLoader.GetInput("vae_approx_name")?.EnumValues : null);
        
        db.Save(agent);

        appData.RegisterComfyAgent(agent);
        
        // Reset all pending Generations and AI Tasks for this agent
        var updatedGenerations = db.UpdateOnly(() => new WorkflowGeneration
        {
            DeviceId = null,
            PromptId = null,
            StatusUpdate = GenerationStatus.InAgentsPool,
        }, where: x => x.DeviceId == request.DeviceId && 
            (x.Result == null && x.Error == null && x.DeletedDate == null));
        
        using var dbTasks = appData.OpenAiTaskDb();
        var updatedTasks = dbTasks.UpdateOnly(() => new OllamaGenerateTask
        {
            State = TaskState.Queued,
            DeviceId = null,
            UserId = null,
        }, where: x => x.DeviceId == request.DeviceId && 
            (x.State == TaskState.Assigned || x.State == TaskState.Started));
        updatedTasks += dbTasks.UpdateOnly(() => new OpenAiChatTask
        {
            State = TaskState.Queued,
            DeviceId = null,
            UserId = null,
        }, where: x => x.DeviceId == request.DeviceId && 
            (x.State == TaskState.Assigned || x.State == TaskState.Started));

        // If any tasks were updated, reload the agent events queue
        if (updatedGenerations > 0 || updatedTasks > 0)
        {
            AgentManager.Reload(db);
        }
        
        var ret = new RegisterComfyAgentResponse
        {
            DeviceId = request.DeviceId,
            ApiKey = Request.GetBearerToken(),
            // Nodes = nodeDefs.Keys.ToList(),
            Categories = appData.CategoryNames,
            RequirePip = appData.RequirePip,
            RequireNodes = appData.RequireNodes,
            RequireModels = appData.RequireModels,
            Settings = agent.Settings,
        };
        
        return ret;
    }

    public object Post(UnRegisterComfyAgent request)
    {
        appData.UnRegisterComfyAgent(request.DeviceId);
        return new EmptyResponse();
    }

    public async Task<object> Post(UpdateWorkflowGeneration request)
    {
        using var db = Db;
        var generation = db.SingleById<WorkflowGeneration>(request.Id);
        if (generation == null)
            throw HttpError.NotFound("Workflow generation could not be found");

        if (generation.DeviceId != null && generation.DeviceId != request.DeviceId)
            throw HttpError.Conflict("This Device does not own this Workflow generation");

        var userId = Request.AssertApiKeyUserId();
        var now = DateTime.UtcNow;

        if (request.QueueCount != null)
        {
            Db.UpdateOnly(() => new ComfyAgent {
                QueueCount = request.QueueCount.Value
            }, where: x => x.DeviceId == request.DeviceId);
        }

        // When Agent Uploads the Results
        if (request is { Status: not null, Outputs: not null })
        {
            var prompt = (generation.Args?.GetValueOrDefault("positivePrompt") ?? generation.Description) as string;
            var minRating = appData.GetMinRatingForPrompt(prompt);
            var outputs = request.Outputs.ParseAsObjectDictionary();
            var status = request.Status.ParseAsObjectDictionary();

            var artifacts = new List<Artifact>();
            var credits = 0;
            string? posterImage = null;
            
            if (outputs.Count > 0 && status.Count > 0)
            {
                // Extract the outputs and duration
                var result = ComfyConverters.GetOutputs(outputs, minRating);
                result.Duration = ComfyConverters.GetDuration(status);
                AssetType? outputType = null;

                credits = appData.CalculateCredits(generation.DeviceId, result.Duration);

                // Save the uploaded files and replace the URL with the relative path of the uploaded artifact
                var allFileNames = Request!.Files.Map(x => x.FileName);
                log.LogInformation("Upload FileNames: {FileNames}", allFileNames.Join(", "));
                log.LogInformation("Output FileNames: {FileNames}", result.Assets.Map(x => x.FileName).Join(", "));

                string? versionName = null;
                
                for (var i = 0; i < Request!.Files.Length; i++)
                {
                    var file = Request!.Files[i];
                    var fileName = await appData.SaveUploadedArtifactAsync(file);
                    var relativePath = "/artifacts".CombineWith(fileName);
                    // Replace the URL with the relative path
                    if (relativePath != null && result.Assets != null)
                    {
                        var asset = result.Assets.FirstOrDefault(x => x.FileName == file.FileName)
                            ?? (result.Assets.Count >= Request.Files.Length
                                ? result.Assets[i]
                                : null);
                        if (asset == null)
                        {
                            log.LogWarning("Failed to find Asset for File: {FileName}", file.FileName);
                            continue;
                        }
                        
                        var ext = asset.FileName.LastRightPart('.');
                        outputType = outputType is null or AssetType.Text or AssetType.Binary
                            ? ext.ToAssetType()
                            : outputType;
                        if (asset.FileName == file.FileName)
                        {
                            asset.Url = relativePath;
                            posterImage ??= asset.Url;
                        }
                        else
                        {
                            log.LogInformation("Ignore unmatched Artifact '{FileName}': {Url}", asset.FileName,
                                asset.Url);
                            continue;
                        }

                        if (outputType == AssetType.Image && (asset.Width == null || asset.Height == null))
                        {
                            await using var stream = appData.OpenArtifactStream(fileName);
                            using var bitmap = SKBitmap.Decode(stream);
                            asset.Width = bitmap.Width;
                            asset.Height = bitmap.Height;
                        }
                        
                        int? variantId = null;
                        string? variantName = null;

                        // If input is a SHA256 hash, check 
                        if (generation.Inputs?.Count > 0)
                        {
                            var hashes = generation.Inputs.Map(x => x.WithoutExtension())
                                .Where(x => x.Length == 64)
                                .ToList();
                            if (hashes.Count > 0)
                            {
                                variantId = await Db.ScalarAsync<int?>(
                                    Db.From<Artifact>().Where(x => x.Hash == hashes[0])
                                        .Select(x => new { x.Id }));
                                
                                versionName ??= await Db.ScalarAsync<string?>(Db.From<WorkflowVersion>()
                                    .Where(x => x.Id == generation.VersionId)
                                    .Select(x => new { x.Name }));
                                variantName = versionName;
                            }
                        }

                        artifacts.Add(new()
                        {
                            GenerationId = request.Id,
                            FileName = file.FileName,
                            Type = asset.Type,
                            Url = asset.Url,
                            Hash = fileName.WithoutExtension(),
                            WorkflowId = generation.WorkflowId,
                            VersionId = generation.VersionId,
                            Width = asset.Width,
                            Height = asset.Height,
                            Length = file.ContentLength,
                            Credits = credits <= 0
                                ? 0
                                : result.Assets.Count == 1
                                    ? credits
                                    : (int)Math.Ceiling(credits / (double)result.Assets.Count),
                            Rating = asset.ToAssetRating(minRating),
                            Ratings = asset.Ratings,
                            Categories = asset.Categories,
                            Tags = asset.Tags,
                            Objects = asset.Objects,
                            Phash = asset.Phash,
                            Color = asset.Color,
                            VariantId = variantId,
                            VariantName = variantName,
                            CreatedBy = userId,
                            CreatedDate = now,
                            ModifiedBy = userId,
                            ModifiedDate = now,
                        });
                    }
                }

                // Update the generation with the outputs and duration
                db.UpdateOnly(() => new WorkflowGeneration
                {
                    PromptId = request.PromptId,
                    Output = outputType,
                    Status = status,
                    Outputs = outputs,
                    Result = result,
                    PosterImage = posterImage,
                    Credits = credits,
                    ModifiedBy = userId,
                    ModifiedDate = now,
                    Error = null,
                    StatusUpdate = GenerationStatus.GenerationCompleted,
                }, where: x => x.Id == request.Id);

                if (artifacts.Count > 0)
                {
                    var oldArtifacts = db.Select<Artifact>(x => x.GenerationId == request.Id);
                    if (oldArtifacts.Count > 0)
                    {
                        var removeArtifactFiles = oldArtifacts.Where(x => artifacts.All(y => y.Url != x.Url))
                            .Select(x => x.Url).ToList();

                        if (removeArtifactFiles.Count > 0)
                        {
                            log.LogInformation("Deleting {Count} old artifact files for generation {Id}", removeArtifactFiles.Count, generation.Id);
                            appData.DeleteArtifactFiles(removeArtifactFiles);
                            Db.DeleteByIds<Artifact>(oldArtifacts.Map(x => x.Id));
                            Db.BulkInsert(oldArtifacts.Map(x => new DeletedRow { Table = Table.Artifact, Key = $"{x.Id}" }));
                        }
                    }
                    
                    db.BulkInsert(artifacts);
                    await appData.SaveArtifactsMetadataAsync(artifacts.Map(x => x.ToArtifactMetadata()));
                }
            }
            else
            {
                request.Error ??= new ResponseStatus("Exception", "This workflow generation did not return any results");
            }
        }
        else if (request.PromptId != null)
        {
            // When Agent Queues the Workflow
            db.UpdateOnly(() => new WorkflowGeneration
            {
                PromptId = request.PromptId,
                ModifiedBy = userId,
                ModifiedDate = DateTime.UtcNow,
                StatusUpdate = GenerationStatus.AssignedToAgent,
            }, where: x => x.Id == request.Id);
        }

        // When the Agent reports a failure
        if (request.Error != null)
        {
            db.UpdateOnly(() => new WorkflowGeneration
            {
                PromptId = request.PromptId,
                Error = request.Error,
                ModifiedBy = userId,
                ModifiedDate = now,
                StatusUpdate = GenerationStatus.GenerationFailed,
            }, where: x => x.Id == request.Id);
        }
        
        AgentManager.SignalGenerationUpdated();
        
        return new EmptyResponse();
    }

    public async Task<object> Any(CaptionArtifact request)
    {
        var userId = Request.AssertApiKeyUserId();
        var now = DateTime.UtcNow;
        var artifacts = Db.Select<Artifact>(x => x.Url == request.ArtifactUrl);
        if (artifacts.Count == 0)
            throw HttpError.NotFound($"Artifact not found: {request.ArtifactUrl.SafeInput()}");

        var genCache = new Dictionary<string, string?>();
        
        foreach (var artifact in artifacts)
        {
            artifact.Caption = request.Caption?.StripQuotes().Trim();
            artifact.Description = request.Description?.StripQuotes().Trim();
            artifact.ModifiedBy = userId;
            artifact.ModifiedDate = now;
            
            log.LogInformation("[{DeviceId}] Captioning Artifact {Id} {GenerationId} {Url} with '{Caption}':\n{Description}", 
                request.DeviceId[..4], artifact.Id, artifact.GenerationId, artifact.Url, request.Caption, request.Description);
            
            Db.UpdateOnly(() => new Artifact {
                Caption = artifact.Caption,
                Description = artifact.Description,
                ModifiedBy = artifact.ModifiedBy,
                ModifiedDate = artifact.ModifiedDate,
            }, where:x => x.Url == request.ArtifactUrl);
            
            if (artifact.PublishedDate != null)
            {
                var description = genCache.GetValueOrDefault(artifact.GenerationId)
                    ?? (genCache[artifact.GenerationId] = Db.SqlScalar<string?>(
                        Db.From<WorkflowGeneration>()
                            .Where(x => x.Id == artifact.GenerationId)
                            .Select(x => x.Description)));
            }
        }
        
        await appData.SaveArtifactsMetadataAsync(artifacts.Map(x => x.ToArtifactMetadata()));
        return new EmptyResponse();
    }
    
    public object Get(GetOllamaGenerateTask request)
    {
        var userId = Request.AssertApiKeyUserId();
        var now = DateTime.UtcNow;

        var taskId = request.TaskId;
        var createdDate = new DateTime(taskId);
        using var dbTasks = appData.OpenAiTaskDb(createdDate);
        
        var task = dbTasks.SingleById<OllamaGenerateTask>(taskId);
        if (task == null)
            throw HttpError.NotFound("Task not found");
        
        var ollama = task.Request;
        if (ollama.Images?.Count > 0)
        {
            for (var i = 0; i < ollama.Images.Count; i++)
            {
                var image = ollama.Images[i];
                if (image.StartsWith('/') || image.StartsWith("../"))
                {
                    var imageBytes = File.ReadAllBytes(appData.ContentRootPath.CombineWith(image));
                    var base64 = Convert.ToBase64String(imageBytes);
                    ollama.Images[i] = base64;
                }
                else if (image.StartsWith("http://") || image.StartsWith("https://"))
                {
                    var imageBytes = image.GetBytesFromUrl();
                    var base64 = Convert.ToBase64String(imageBytes);
                    ollama.Images[i] = base64;
                }
            }
        }
        
        dbTasks.UpdateOnly(() => new OllamaGenerateTask
        {
            State = TaskState.Started,
            Status = GenerationStatus.GenerationStarted,
            ModifiedBy = userId,
            ModifiedDate = now,
        }, x => x.Id == taskId);

        return ollama;
    }

    public async Task<object> Post(CompleteOllamaGenerateTask request)
    {
        var userId = Request.AssertApiKeyUserId();
        var now = DateTime.UtcNow;

        var taskId = request.TaskId;
        var createdDate = new DateTime(taskId);
        using var dbTasks = appData.OpenAiTaskDb(createdDate);
        
        var task = dbTasks.SingleById<OllamaGenerateTask>(taskId);
        if (task == null)
            throw HttpError.NotFound("Task not found");
        
        task.ModifiedBy = userId;
        task.ModifiedDate = now;

        if (request.ResponseStatus != null)
        {
            dbTasks.UpdateOnly(() => new OllamaGenerateTask
            {
                State = TaskState.Failed,
                Status = GenerationStatus.GenerationFailed,
                ModifiedBy = task.ModifiedBy,
                ModifiedDate = task.ModifiedDate,
                ErrorCode = request.ResponseStatus.ErrorCode,
                Error = request.ResponseStatus,
            }, x => x.Id == taskId);
        }
        else
        {
            OllamaGenerateResponse response = request;
            task.State = TaskState.Executed;
            task.Status = task.Callback != null
                ? GenerationStatus.GenerationExecuted
                : GenerationStatus.GenerationCompleted;
            task.Response = response;
            task.Result = response.Response;
            
            dbTasks.UpdateOnly(() => new OllamaGenerateTask
            {
                State = task.State,
                Status = task.Status,
                ModifiedBy = task.ModifiedBy,
                ModifiedDate = task.ModifiedDate,
                Response = task.Response,
                Result = task.Result,
            }, x => x.Id == taskId);

            if (task.Callback != null)
            {
                var feature = AssertPlugin<CommandsFeature>();
                var commandInfo = feature.AssertCommandInfo(task.Callback);
                var commandType = commandInfo.Type;
                var services = Request.GetServiceProvider();
                var command = services.GetRequiredService(commandType);
        
                var commandResult = await feature.ExecuteCommandAsync(command, task);

                task.ModifiedDate = now;
                if (commandResult.Error != null)
                {
                    task.ErrorCode = commandResult.Error.ErrorCode;
                    task.Error = commandResult.Error;
                    
                    dbTasks.UpdateOnly(() => new OllamaGenerateTask
                    {
                        State = TaskState.Failed,
                        Status = GenerationStatus.CallbackFailed,
                        ModifiedBy = task.ModifiedBy,
                        ModifiedDate = task.ModifiedDate,
                        ErrorCode = task.ErrorCode,
                        Error = task.Error,
                    }, x => x.Id == taskId);
                }
                else
                {
                    task.State = TaskState.Completed;
                    task.Status = GenerationStatus.GenerationCompleted;
                    task.Result = feature.GetCommandResultAsString(command, commandResult) ?? task.Result;
                    
                    dbTasks.UpdateOnly(() => new OllamaGenerateTask
                    {
                        State = task.State,
                        Status = task.Status,
                        ModifiedBy = task.ModifiedBy,
                        ModifiedDate = task.ModifiedDate,
                        Result = task.Result,
                    }, x => x.Id == taskId);
                }
            }
        }
        return new EmptyResponse();
    }
    
    public object Get(GetOpenAiChatTask request)
    {
        var userId = Request.AssertApiKeyUserId();
        var now = DateTime.UtcNow;

        var taskId = request.TaskId;
        var createdDate = new DateTime(taskId);
        using var dbTasks = appData.OpenAiTaskDb(createdDate);
        
        var task = dbTasks.SingleById<OpenAiChatTask>(taskId);
        if (task == null)
            throw HttpError.NotFound("Task not found");
        
        var ollama = task.Request;
        dbTasks.UpdateOnly(() => new OpenAiChatTask
        {
            State = TaskState.Started,
            Status = GenerationStatus.GenerationStarted,
            ModifiedBy = userId,
            ModifiedDate = now,
        }, x => x.Id == taskId);

        return ollama;
    }

    public async Task<object> Post(CompleteOpenAiChatTask request)
    {
        var userId = Request.AssertApiKeyUserId();
        var now = DateTime.UtcNow;

        var taskId = request.TaskId;
        var createdDate = new DateTime(taskId);
        using var dbTasks = appData.OpenAiTaskDb(createdDate);
        
        var task = dbTasks.SingleById<OpenAiChatTask>(taskId);
        if (task == null)
            throw HttpError.NotFound("Task not found");
        
        task.ModifiedBy = userId;
        task.ModifiedDate = now;

        if (request.ResponseStatus != null)
        {
            dbTasks.UpdateOnly(() => new OpenAiChatTask
            {
                State = TaskState.Failed,
                Status = GenerationStatus.GenerationFailed,
                ModifiedBy = task.ModifiedBy,
                ModifiedDate = task.ModifiedDate,
                ErrorCode = request.ResponseStatus.ErrorCode,
                Error = request.ResponseStatus,
            }, x => x.Id == taskId);
        }
        else
        {
            OpenAiChatResponse response = request;
            task.State = TaskState.Executed;
            task.Status = task.Callback != null
                ? GenerationStatus.GenerationExecuted
                : GenerationStatus.GenerationCompleted;
            task.Response = response;
            var content = response.Choices.Map(x => x.Message.Content).Join("\n");
            task.Result = content;
            
            dbTasks.UpdateOnly(() => new OpenAiChatTask
            {
                State = task.State,
                Status = task.Status,
                ModifiedBy = task.ModifiedBy,
                ModifiedDate = task.ModifiedDate,
                Response = task.Response,
                Result = task.Result,
            }, x => x.Id == taskId);

            if (task.Callback != null)
            {
                var feature = AssertPlugin<CommandsFeature>();
                var commandInfo = feature.AssertCommandInfo(task.Callback);
                var commandType = commandInfo.Type;
                var services = Request.GetServiceProvider();
                var command = services.GetRequiredService(commandType);
        
                var commandResult = await feature.ExecuteCommandAsync(command, task);

                task.ModifiedDate = now;
                if (commandResult.Error != null)
                {
                    task.ErrorCode = commandResult.Error.ErrorCode;
                    task.Error = commandResult.Error;
                    
                    dbTasks.UpdateOnly(() => new OpenAiChatTask
                    {
                        State = TaskState.Failed,
                        Status = GenerationStatus.CallbackFailed,
                        ModifiedBy = task.ModifiedBy,
                        ModifiedDate = task.ModifiedDate,
                        ErrorCode = task.ErrorCode,
                        Error = task.Error,
                    }, x => x.Id == taskId);
                }
                else
                {
                    task.State = TaskState.Completed;
                    task.Status = GenerationStatus.GenerationCompleted;
                    task.Result = feature.GetCommandResultAsString(command, commandResult) ?? task.Result;
                    
                    dbTasks.UpdateOnly(() => new OpenAiChatTask
                    {
                        State = task.State,
                        Status = task.Status,
                        ModifiedBy = task.ModifiedBy,
                        ModifiedDate = task.ModifiedDate,
                        Result = task.Result,
                    }, x => x.Id == taskId);
                }
            }
        }
        return new EmptyResponse();
    }
}