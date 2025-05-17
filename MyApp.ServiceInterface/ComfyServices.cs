using System.Net;
using Microsoft.Extensions.Logging;
using MyApp.ServiceModel;
using ServiceStack;
using ServiceStack.Data;
using ServiceStack.Host;
using ServiceStack.Jobs;
using ServiceStack.OrmLite;

namespace MyApp.ServiceInterface;

public class ComfyServices(ILogger<ComfyServices> log,
    AppData appData, 
    ComfyMetadata metadata, 
    ComfyGateway comfyGateway,
    IBackgroundJobs jobs, 
    IDbConnectionFactory dbFactory)
    : Service
{
    public const string ComfyBaseUrl = "http://localhost:7860/api";
    public const string ComfyApiKey = "";
    private static long Counter;
    
    public async Task<object> GetAsync(GetComfyTasks request)
    {
        await Task.Delay(5_000); // simulate delay
        return new ComfyTasksResponse
        {
            Results = [
                new ComfyTask
                {
                    Id = Interlocked.Increment(ref Counter),
                    Name = $"{DateTime.UtcNow:T}",
                }
            ]
        };
    }

    public async Task<object> Any(RegisterComfyAgent request)
    {
        var objectInfoFile = base.Request.Files.FirstOrDefault();
        if (objectInfoFile == null)
            throw new ArgumentException("No object_info file uploaded.");

        var json = await objectInfoFile.InputStream.ReadToEndAsync();
        
        var nodeDefs = ComfyMetadata.ParseNodeDefinitions(json);
        var apiKey = (ApiKeysFeature.ApiKey)Request.GetApiKey();
        
        var userId = apiKey.UserId
            ?? throw new Exception("API Key not assigned to a user");

        var workflowPath = request.DeviceId.GetObjectInfoPath();
        await appData.WriteAppDataTextFileAsync(workflowPath, json);

        using var db = dbFactory.OpenDbConnection();
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
            };
        }

        agent.NodeDefs = nodeDefs;
        agent.WorkflowInfo = ComfyWorkflowParser.Parse(json, workflowPath, nodeDefs, log);
        agent.Nodes = nodeDefs.Keys.ToList();
        agent.UserName = apiKey.UserName;
        agent.ApiKey = apiKey.Key;
        agent.Enabled = true;
        agent.OfflineDate = null;
        agent.ModifiedDate = DateTime.UtcNow;

        if (!nodeDefs.TryGetValue("CheckpointLoader", out var checkpointLoader))
            throw new Exception("CheckpointLoader node not found");
        agent.Checkpoints = [..checkpointLoader.GetInput("ckpt_name")?.EnumValues ?? []];

        if (nodeDefs.TryGetValue("UNETLoader", out var unetLoader))
            agent.Unets = [..unetLoader.GetInput("unet_name")?.EnumValues ?? []];
        if (nodeDefs.TryGetValue("VAELoader", out var vaeLoader))
            agent.Vaes = [..vaeLoader.GetInput("vae_name")?.EnumValues ?? []];
        if (nodeDefs.TryGetValue("CLIPLoader", out var clipLoader))
            agent.Clips = [..clipLoader.GetInput("clip_name")?.EnumValues ?? []];
        if (nodeDefs.TryGetValue("CLIPVisionLoader", out var clipVisionLoader))
            agent.ClipVisions = [..clipVisionLoader.GetInput("clip_name")?.EnumValues ?? []];
        if (nodeDefs.TryGetValue("LoraLoader", out var loraLoader))
            agent.Loras = [..loraLoader.GetInput("lora_name")?.EnumValues ?? []];
        if (nodeDefs.TryGetValue("UpscaleModelLoader", out var upscaleLoader))
            agent.Upscalers = [..upscaleLoader.GetInput("model_name")?.EnumValues ?? []];
        if (nodeDefs.TryGetValue("ControlNetLoader", out var controlNetLoader))
            agent.ControlNets = [..controlNetLoader.GetInput("control_net_name")?.EnumValues ?? []];
        if (nodeDefs.TryGetValue("StyleModelLoader", out var styleLoader))
            agent.Stylers = [..styleLoader.GetInput("style_model_name")?.EnumValues ?? []];
        if (nodeDefs.TryGetValue("PhotoMakerLoader", out var photoMakerLoader))
            agent.PhotoMakers = [..photoMakerLoader.GetInput("photomaker_model_name")?.EnumValues ?? []];
        if (nodeDefs.TryGetValue("GLIGENLoader", out var gligenLoader))
            agent.Gligens = [..gligenLoader.GetInput("gligen_name")?.EnumValues ?? []];

        lock (Locks.AppDb)
        {
            db.Save(agent);
        }

        appData.RegisterComfyAgent(agent);
        
        var ret = new RegisterComfyAgentResponse
        {
            DeviceId = request.DeviceId,
            ApiKey = Request.GetBearerToken(),
            //Nodes = nodeDefs.Keys.ToArray(),
            Checkpoints = agent.Checkpoints,
            Unets = agent.Unets,
            Vaes = agent.Vaes,
            Loras = agent.Loras,
            Clips = agent.Clips,
            ClipVisions = agent.ClipVisions,
            Controlnets = agent.ControlNets,
            Upscalers = agent.Upscalers,
            Stylers = agent.Stylers,
            PhotoMakers = agent.PhotoMakers,
            Gligens = agent.Gligens,
            Embeddings = agent.Embeddings,
        };
        
        // using var db = dbFactory.OpenDbConnection();
        // var agent = db.Single<ComfyAgent>(x => x.DeviceId == request.DeviceId);
        // if (agent == null)
        // {
        //     agent = new ComfyAgent
        //     {
        //         DeviceId = request.DeviceId,
        //     };
        // }
        //
        // agent.Enabled = true;
        // agent.OfflineDate = DateTime.UtcNow;
        // db.Save(agent);

        return ret;
    }
    
    public List<string> Get(GetComfyWorkflows request)
    {
        var workflowsPath = appData.WebRootPath.CombineWith("data", "workflows");
        var files = Directory.GetFiles(workflowsPath, "*.json", SearchOption.AllDirectories);

        var allWorkflows = files.Map(x => x[workflowsPath.Length..].TrimStart('/'));

        var overrideWorkflowPath = appData.ContentRootPath.CombineWith("App_Data", "overrides", "workflows");

        if (Directory.Exists(overrideWorkflowPath))
        {
            var overrideFiles =  Directory.GetFiles(overrideWorkflowPath, "*.json", SearchOption.AllDirectories);

            allWorkflows.AddRange(overrideFiles.Map(x => x[overrideWorkflowPath.Length..].TrimStart('/')));
        }

        allWorkflows.Sort();

        return allWorkflows;
    }

    public async Task<object> Get(GetComfyWorkflowInfo request)
    {
        var workflowInfo = await GetWorkflowInfoAsync(request.Workflow);
        return new GetComfyWorkflowInfoResponse
        {
            Result = workflowInfo
        };
    }

    public async Task<ComfyWorkflowInfo> GetWorkflowInfoAsync(string path)
    {
        path = path.Replace('\\', '/');
        var workflowJson = await GetWorkflowJsonAsync(path);

        if (workflowJson == null)
            throw HttpError.NotFound("Workflow not found");

        var workflowInfo = ComfyWorkflowParser.Parse(workflowJson, path, metadata.DefaultNodeDefinitions);
        return workflowInfo;
    }

    private async Task<string?> GetWorkflowJsonAsync(string path)
    {
        path = path.Replace('\\', '/');
        var workflowsPath = appData.WebRootPath.CombineWith("lib", "data", "workflows");
        if (!path.IsPathSafe(workflowsPath))
            throw new ArgumentNullException(nameof(GetComfyWorkflowInfo.Workflow), "Invalid Workflow Path");

        var overridePath = appData.ContentRootPath.CombineWith("App_Data", "overrides", "workflows").Replace('\\', '/');
        string? workflowJson = null;

        if (File.Exists(overridePath.CombineWith(path)))
        {
            workflowJson = await File.ReadAllTextAsync(overridePath.CombineWith(path));
        }
        else if (File.Exists(workflowsPath.CombineWith(path)))
        {
            workflowJson = await File.ReadAllTextAsync(workflowsPath.CombineWith(path));
        }
        else
        {
            if (File.Exists(overridePath.CombineWith(path)))
            {
                workflowJson = await File.ReadAllTextAsync(overridePath.CombineWith(path));
            }
            else
            {
                var allPaths = Get(new GetComfyWorkflows());
                var matches = allPaths.Where(x => x.EndsWith(path)).ToList();
                if (matches.Count == 1)
                {
                    if (File.Exists(overridePath.CombineWith(matches[0])))
                    {
                        workflowJson = await File.ReadAllTextAsync(overridePath.CombineWith(matches[0]));
                    }
                    else if (File.Exists(workflowsPath.CombineWith(matches[0])))
                    {
                        workflowJson = await File.ReadAllTextAsync(workflowsPath.CombineWith(matches[0]));
                    }
                }
                else if (matches.Count > 1)
                {
                    throw HttpError.Conflict("Multiple matches found");
                }
            }
        }

        return workflowJson;
    }

    public async Task<string> Get(GetComfyApiPrompt request)
    {
        var client = comfyGateway.CreateHttpClient(ComfyBaseUrl, ComfyApiKey);
        var nodeDefs = await metadata.LoadNodeDefinitionsAsync(client);
        var workflowInfo = await GetWorkflowInfoAsync(request.Workflow);
        
        var workflowJson = await GetWorkflowJsonAsync(workflowInfo.Path)
                           ?? throw HttpError.NotFound("Workflow not found");
        if (request.Args?.Count > 0)
        {
            var result = ComfyWorkflowParser.MergeWorkflow(workflowJson, request.Args, nodeDefs);
            workflowJson = result.Result;
        }
        var apiPromptJson = ComfyConverters.ConvertWorkflowToApiPrompt(workflowJson, nodeDefs, log:log);
        return apiPromptJson;
    }

    public async Task<object> Post(QueueComfyWorkflow request)
    {
        throw new NotImplementedException();
        /*
        var candidates = appData.ComfyAgents
            .Where(x => x is { Enabled: true, OfflineDate: null }).ToList();

        if (candidates.Count == 0)
            throw new Exception("No ComfyUI providers available");

        var randomCandidate = candidates[new Random().Next(candidates.Count)];
        var comfyUiApiBaseUrl = randomCandidate.ApiBaseUrl.CombineWith("api");

        var client = comfyGateway.CreateHttpClient(comfyUiApiBaseUrl, randomCandidate.ApiKey);
        var nodeDefs = await metadata.LoadNodeDefinitionsAsync(client);
        var workflowInfo = await GetWorkflowInfoAsync(request.Workflow);
        var workflowJson = await GetWorkflowJsonAsync(workflowInfo.Path)
            ?? throw HttpError.NotFound("Workflow not found");

        if (request.Args?.Count > 0)
        {
            var result = ComfyWorkflowParser.MergeWorkflow(workflowJson, request.Args, nodeDefs);
            workflowJson = result.Result;
        }

        var clientId = Guid.NewGuid().ToString("N");
        var apiPromptJson = ComfyConverters.ConvertWorkflowToApiPrompt(workflowJson, nodeDefs, clientId, log:log);
        log.LogInformation("Queueing ComfyUI Workflow: {ApiPromptJson}", apiPromptJson);
        var resultJson = await comfyGateway.ExecuteApiPromptAsync(comfyUiApiBaseUrl, randomCandidate.ApiKey, apiPromptJson);
        var resultObj = (Dictionary<string, object>)JSON.parse(resultJson);
        var promptId = resultObj.GetValueOrDefault("prompt_id")?.ToString()
            ?? throw new Exception("Invalid ComfyUI Queue Result");

        var KeyId = (Request.GetApiKey() as ApiKeysFeature.ApiKey)?.Id ?? 0;
        log.LogInformation("Received QueueComfyWorkflow from '{KeyId}' to execute workflow '{Workflow}' using '{Provider}'",
            KeyId, request.Workflow, randomCandidate.ApiBaseUrl);

        var args = new Dictionary<string, string> {
            [nameof(KeyId)] = $"{KeyId}",
        };

        var jobRef = jobs.EnqueueCommand<GetComfyResultsCommand>(new GetComfyResults
        {
            MediaProviderId = randomCandidate.Id,
            ClientId = clientId,
            PromptId = promptId,
        }, new() { RefId = clientId, Args = args });

        return new QueueComfyWorkflowResponse
        {
            MediaProviderId = randomCandidate.Id,
            RefId = clientId,
            PromptId = promptId,
            JobId = jobRef.Id,
        };
     */
    }

    public async Task<object> Get(GetExecutedComfyWorkflowResults request)
    {
        var job = jobs.GetJobByRefId(request.RefId);
        if (job == null)
            return HttpError.NotFound("Workflow execution could not be found");
        
        var startedAt = DateTime.UtcNow;
        var pollForSecs = request.Poll == true
            ? 60
            : 0;
        
        do
        {
            if (job.Completed != null)
            {
                return new GetExecutedComfyWorkflowResultsResponse
                {
                    Result = job.Completed.ResponseBody.FromJson<ComfyResult>()
                };
            }
            if (job.Failed != null)
            {
                throw new HttpError(job.Failed.Error, HttpStatusCode.InternalServerError);
            }
            await Task.Delay(200);
        } while(job.Completed == null && job.Failed == null 
                && (DateTime.UtcNow - startedAt) < TimeSpan.FromSeconds(pollForSecs));
        
        throw HttpError.NotFound("Workflow execution could not be found");
    }
    
    public async Task<object> Get(GetExecutedComfyWorkflowsResults request)
    {
        if (!(request.RefIds?.Count >= 1))
            throw new ArgumentNullException(nameof(request.RefIds));

        var ret = new GetExecutedComfyWorkflowsResultsResponse
        {
            Results = [],
            Errors = [],
        };
        
        var startedAt = DateTime.UtcNow;
        var pollForSecs = request.Poll == true
            ? 60
            : 0;

        do
        {
            foreach (var refId in request.RefIds)
            {
                var job = jobs.GetJobByRefId(refId);
                var error = job == null
                    ? DtoUtils.CreateResponseStatus("NotFound", "Workflow execution could not be found")
                    : null;
                
                error ??= job?.Failed?.Error;
                if (error != null)
                {
                    ret.Errors[refId] = error;
                }
                else
                {
                    var result = job?.Completed?.ResponseBody.FromJson<ComfyResult>();
                    if (result != null)
                    {
                        ret.Results[refId] = result;
                    }
                }
            }
            await Task.Delay(200);
        } while(ret.Results.Count == 0 && ret.Errors.Count == 0 
                && (DateTime.UtcNow - startedAt) < TimeSpan.FromSeconds(pollForSecs));
        return ret;
    }
    
}

public class GetComfyResults
{
    public long MediaProviderId { get; set; }
    public string PromptId { get; set; }
    public string ClientId { get; set; }
    public TimeSpan? Timeout { get; set; }
}

/*
public class GetComfyResultsCommand(
    ILogger<GetComfyResultsCommand> logger, 
    IBackgroundJobs jobs,
    AppData appData, 
    AppConfig appConfig,
    ComfyGateway comfyGateway) 
    : AsyncCommandWithResult<GetComfyResults,ComfyResult>
{
    protected override async Task<ComfyResult> RunAsync(GetComfyResults request, CancellationToken token)
    {
        var job = Request.GetBackgroundJob();
        var log = Request.CreateJobLogger(jobs, logger);

        var mediaProvider = appData.ComfyAgents.FirstOrDefault(x => x.Id == request.MediaProviderId)
                            ?? throw new Exception($"Comfy Agent {request.MediaProviderId} not available");

        var keyId = job.Args?.TryGetValue("KeyId", out var oKeyId) == true ? oKeyId : "0";
        var timeout = request.Timeout ?? TimeSpan.FromSeconds(5 * 60);
        var startedAt = DateTime.UtcNow;
        while (DateTime.UtcNow - startedAt < timeout)
        {
            using var client = comfyGateway.CreateHttpClient(mediaProvider.ApiBaseUrl!, mediaProvider.ApiKey);
            var response = await client.GetAsync($"/api/history/{request.PromptId}", token);
            response.EnsureSuccessStatusCode();
            var historyJson = await response.Content.ReadAsStringAsync(token);

            if (historyJson.IndexOf(request.PromptId, StringComparison.OrdinalIgnoreCase) >= 0)
            {
                log.LogInformation("Prompt {Prompt} from {Url} has completed", request.PromptId, mediaProvider.ApiBaseUrl);
                
                var now = DateTime.UtcNow;
                var result = ComfyConverters.ParseComfyResult(historyJson, mediaProvider.ApiBaseUrl.CombineWith("api"));

                if (result.Assets?.Count > 0)
                {
                    log.LogInformation("Downloading {Count} Assets for {Prompt} from {Url}", 
                        result.Assets.Count, request.PromptId, mediaProvider.ApiBaseUrl);
                    
                    var tasks = result.Assets.Map(async x =>
                    {
                        var output = new ComfyAssetOutput
                        {
                            NodeId = x.NodeId,
                            Type = x.Type,
                            FileName = x.FileName,
                        };
                        var url = x.Url;
                        if (!url.StartsWith("http://") && !url.StartsWith("https://"))
                        {
                            url = mediaProvider.ApiBaseUrl.CombineWith(url);
                        }

                        var ext = output.FileName.LastRightPart('.');
                        if (output.Type == AssetType.Image)
                        {
                            url = url.AddQueryParam("preview", "webp");
                            ext = "webp";
                        }

                        var response = await client.GetAsync(new Uri(url), token);
                        if (!response.IsSuccessStatusCode)
                        {
                            log.LogError("Failed to download {Url}: {Message}", 
                                url, response.ReasonPhrase ?? response.StatusCode.ToString());
                            return output;
                        }
                        
                        var imageBytes = await response.Content.ReadAsByteArrayAsync(token);
                        var sha256 = imageBytes.ComputeSha256();
                        output.FileName = $"{sha256}.{ext}";
                        var relativePath = $"{now:yyyy}/{now:MM}/{now:dd}/{keyId}/{output.FileName}";
                        var path = appConfig.ArtifactsPath.CombineWith(relativePath);
                        Path.GetDirectoryName(path).AssertDir();
                        await File.WriteAllBytesAsync(path, imageBytes, token);
                        output.Url = $"/artifacts/{relativePath}";

                        if (output.Type == AssetType.Image)
                        {
                            var info = MediaTypeNames.Image.Identify(imageBytes);
                            output.Width = info.Width;
                            output.Height = info.Height;
                        }
                        return output;
                    });

                    var allTasks = await Task.WhenAll(tasks);
                    var completedTasks = allTasks
                        .Where(x => x.Url != null).ToList();
                    
                    log.LogInformation("Downloaded {Count}/{Total} Assets for Prompt {Prompt}:\n{Urls}",
                        completedTasks.Count, allTasks.Length, request.PromptId, 
                        string.Join('\n',completedTasks.Map(x => appConfig.AssetsBaseUrl.CombineWith(x.Url))));
                    
                    result.Assets = completedTasks;
                }
                else if ((result.Texts?.Count ?? 0) == 0)
                {
                    log.LogError("Prompt {Prompt} from {Url} did not return any results", 
                        request.PromptId, mediaProvider.ApiBaseUrl);

                    throw new Exception($"Prompt {request.PromptId} from {mediaProvider.ApiBaseUrl} did not return any results");
                }
                
                return result;
            }
            
            await Task.Delay(1000, token);
        }
        
        log.LogError("Exceeded timeout of {Seconds} seconds for Prompt {Prompt}", 
            timeout.TotalSeconds, request.PromptId);
        
        throw new TimeoutException($"Exceeded timeout of {timeout.TotalSeconds} seconds for Prompt {request.PromptId}");
    }
}
*/