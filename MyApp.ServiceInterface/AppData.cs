using System.Collections.Concurrent;
using System.Data;
using System.Diagnostics;
using System.Text.RegularExpressions;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using MyApp.ServiceModel;
using ServiceStack;
using ServiceStack.Data;
using ServiceStack.Logging;
using ServiceStack.OrmLite;
using ServiceStack.Text;
using ServiceStack.Web;

namespace MyApp.ServiceInterface;

public class AppData(ILogger<AppData> log, IHostEnvironment env, 
    ComfyMetadata metadata, AppConfig appConfig, IDbConnectionFactory dbFactory)
{
    public static AppData Instance { get; set; }
    public AppConfig Config { get; } = appConfig;
    public string ContentRootPath => env.ContentRootPath;
    public string WebRootPath => env.ContentRootPath.CombineWith("wwwroot");
    public ComfyMetadata Metadata { get; } = metadata;
    public HashSet<string> DefaultGatewayNodes { get; set; } = new();

    public ConcurrentDictionary<string, ComfyAgent> ComfyAgents { get; set; } = new();
    public List<Asset> Assets { get; private set; } = [];
    public List<Workflow> Workflows { get; private set; } = [];
    public List<Tag> Tags { get; private set; } = [];
    public Dictionary<string,Tag> TagsMap { get; private set; } = [];
    public List<string> CategoryNames { get; private set; } = [];
    public List<Category> Categories { get; private set; } = [];
    public Dictionary<string,Category> CategoriesMap { get; private set; } = [];
    public Dictionary<Rating, HashSet<string>> PromptRatings { get; private set; } = new();
    public Dictionary<Rating, HashSet<string>> TagRatings { get; private set; } = new();
    public Dictionary<Rating, HashSet<string>> ObjectRatings { get; private set; } = new();
    
    // ComfyAgent Default Installs
    public List<string>? RequireNodes { get; set; }
    public List<string>? RequireModels { get; set; }
    public List<string>? RequirePip { get; set; }

    public ConcurrentDictionary<string, DateTime> BannedUsersMap { get; set; } = new();
    public int MaxDeletedRowId { get; set; }
    
    public int GetMaxDeletedRowId(IDbConnection db)
    {
        return MaxDeletedRowId = db.Scalar<int>(db.From<DeletedRow>().Select(x => Sql.Max(x.Id)));
    }

    public List<ComfyAgent> GetVisibleComfyAgents(string? userId=null)
    {
        var agents = ComfyAgents.Values
            .Where(x => x.OfflineDate == null 
                        && x.LastUpdate > DateTime.UtcNow.AddMinutes(-5)
                        && x.Gpus?.Count > 0
                        && (userId == null || x.UserId == userId))
            .ToList();
        return agents;
    }

    public string? ReadTextFile(string path)
    {
        var fullPath  = Path.Combine(env.ContentRootPath, path);
        return File.Exists(fullPath)
            ? File.ReadAllText(fullPath)
            : null;
    }

    public void WriteTextFile(string path, string contents)
    { 
        var fullPath  = Path.Combine(env.ContentRootPath, path);
        Path.GetDirectoryName(fullPath).AssertDir();
        File.WriteAllText(fullPath, contents);
    }

    public async Task WriteAppDataTextFileAsync(string path, string contents)
    {
        var fullPath  = Path.GetFullPath(Path.Combine(env.ContentRootPath, appConfig.AppDataPath, path));
        Path.GetDirectoryName(fullPath).AssertDir();
        await File.WriteAllTextAsync(fullPath, contents);
    }
    
    public async Task<string> SaveUploadedArtifactAsync(IHttpFile uploadedFile)
    {
        var fileName = await AssetManager.SaveFileAsync(uploadedFile, appConfig.ArtifactsPath);
        return fileName;
    }

    public Stream OpenArtifactStream(string fileName) => File.OpenRead(GetArtifactPath(fileName));
    public string GetArtifactPath(string fileName) => appConfig.ArtifactsPath.CombineWith(fileName[..2], fileName);

    ServerEvent RegisterEvent = new() { Event = "register" };
    ServerEvent HeartbeatEvent = new() { Event = "heartbeat", Data = "pulse" };

    public ServerEvent? AgentConnected(string deviceId)
    {
        if (!ComfyAgents.TryGetValue(deviceId, out var agent))
            return RegisterEvent;

        if (agent.OfflineDate != null)
        {
            agent.OfflineDate = null;
            agent.LastUpdate = DateTime.UtcNow;
            return RegisterEvent;
        }
        return null;
    }

    public ServerEvent AgentHeartbeat(string deviceId)
    {
        if (!ComfyAgents.TryGetValue(deviceId, out var agent))
            return RegisterEvent;

        return HeartbeatEvent;
    }
    
    public void RegisterComfyAgent(ComfyAgent agent)
    {
        ComfyAgents[agent.DeviceId] = agent;
    }

    public void UnRegisterComfyAgent(string deviceId)
    {
        ComfyAgents.Remove(deviceId, out _);
    }

    public void Reload(IDbConnection db)
    {
        LoadDefaultObjectInfo();
        LoadAssets(db);
        LoadWorkflows(db);
        LoadTags(db);
        LoadCategories(db);
        LoadPromptRatings();
        LoadTagRatings();
        LoadObjectRatings();
        LoadComfyAgentInstallDefaults();
    }

    public string OverridesPath => Path.GetFullPath(Path.Combine(appConfig.AppDataPath, "/overrides"));
    
    public void LoadDefaultObjectInfo()
    {
        var json = ReadTextFile(Path.Combine(OverridesPath, "object_info.gateway.json"))
            ?? ReadTextFile("wwwroot/data/object_info.gateway.json")
            ?? throw new Exception("object_info.gateway.json not found");
        Metadata.LoadObjectInfo(json);
        DefaultGatewayNodes = Metadata.DefaultNodeDefinitions.Keys.ToSet();
    }

    public void LoadAssets(IDbConnection db)
    {
        var assets = db.Select<Asset>();
        var assetUrls = new Dictionary<string, Asset>();
        var assetPaths = new Dictionary<string, Asset>();
        var count = 0;
        foreach (var asset in assets)
        {
            assetUrls[asset.Url] = asset;
            assetPaths[asset.SavePath.CombineWith(asset.FileName)] = asset;
        }

        void AddModel(Asset model)
        {
            if (string.IsNullOrEmpty(model.FileName))
            {
                log.LogWarning("Asset has no Filename: {Url}", model.Url);
                return;
            }
            if (string.IsNullOrEmpty(model.Url))
            {
                log.LogWarning("Asset has no URL: {Filename}", model.FileName);
                return;
            }
            if (string.IsNullOrEmpty(model.SavePath))
            {
                log.LogWarning("Asset has no SavePath: {Url}", model.Url);
                return;
            }
            
            if (assetUrls.TryGetValue(model.Url, out _))
                return;
            if (assetPaths.TryGetValue(model.SavePath.CombineWith(model.FileName), out _))
                return;

            if (model.Type == "")
                model.Type = null;
            if (model.Base == "")
                model.Base = null;
            if (model.Description == "")
                model.Description = null;
            if (model.Reference == "")
                model.Reference = null;
            if (model.Size == "")
                model.Size = null;
            if (model.Hash == "")
                model.Hash = null;
            
            if (string.IsNullOrEmpty(model.Type))
            {
                model.Type = model.SavePath.LeftPart('/');
            }
            if (string.IsNullOrEmpty(model.Name))
            {
                model.Name = StringFormatters.FormatName(model.FileName).LastLeftPart('.');
            }
            if (model.Length == 0 && !string.IsNullOrEmpty(model.Size))
            {
                if (model.Size.EndsWith('K') || model.Size.EndsWith('M') || 
                    model.Size.EndsWith('G') || model.Size.EndsWith('T'))
                    model.Size += "B";
                model.Length = StringFormatters.HumanSizeToBytes(model.Size);
            }

            model.Id = (int) db.Insert(model, selectIdentity: true);
            count++;
            assets.Add(model);
            assetUrls[model.Url] = model;
            assetPaths[model.SavePath.CombineWith(model.FileName)] = model;
        }
        
        var comfyManagerAssets = ReadTextFile("wwwroot/data/assets.json").FromJson<List<Asset>>();
        if (comfyManagerAssets != null)
        {
            foreach (var model in comfyManagerAssets)
            {
                AddModel(model);
            }
        }
        var assetDownloaderAssets = ReadTextFile(Path.Combine(OverridesPath, "assets.json")).FromJson<List<Asset>>();
        if (assetDownloaderAssets != null)
        {
            foreach (var model in assetDownloaderAssets)
            {
                AddModel(model);
            }
        }

        log.LogInformation("Loaded {Count} New Assets, Total {Total} Assets", count, assets.Count);
        Assets = assets;
    }
    
    public Workflow? GetWorkflow(int? workflowId) => workflowId == null 
        ? null 
        : Workflows.FirstOrDefault(x => x.Id == workflowId);
    
    public void LoadWorkflows(IDbConnection db)
    {
        var workflows = db.Select<Workflow>();
        var workflowVersions = db.Select<WorkflowVersion>();
        var workflowPaths = workflows.ToDictionary(x => x.Path);
        
        var workflowsPath = WebRootPath.CombineWith("data", "workflows");
        var files = Directory.GetFiles(workflowsPath, "*.json", SearchOption.AllDirectories);
        var allWorkflows = files.Map(x => x[workflowsPath.Length..].TrimStart('/'));
        // allWorkflows.PrintDump();
        foreach (var workflowPath in allWorkflows)
        {
            if (workflowPaths.TryGetValue(workflowPath, out _))
                continue;

            var parts = workflowPath.Split('/');
            if (parts.Length != 3)
            {
                log.LogWarning("Invalid Workflow Path: {WorkflowPath}, should be <category>/<group>/<filename>.json", workflowPath);
                continue;
            }
            
            var workflowJson = ReadTextFile(workflowsPath.CombineWith(workflowPath))
                ?? throw new Exception($"Workflow not found: {workflowPath}");

            var workflowObj = workflowJson.ParseAsObjectDictionary();
            List<string> nodes;
            List<string> assets;
            try
            {
                if (workflowObj["nodes"] is not List<object> nodesObj)
                    throw new Exception("No nodes found in workflow JSON");

                nodes = nodesObj.Map(x => ((Dictionary<string, object>)x)["type"].ToString()!);
                assets = ComfyWorkflowParser.ExtractAssetPaths(workflowObj, log).ToList();
            }
            catch (Exception e)
            {
                log.LogError(e, "Failed to parse workflow JSON: {WorkflowPath}", workflowPath);
                continue;
            }

            WorkflowInfo workflowInfo;
            try
            {
                workflowInfo = ComfyWorkflowParser.Parse(workflowObj, workflowPath, Metadata.DefaultNodeDefinitions);
            }
            catch (Exception e)
            {
                log.LogError(e, "Failed to parse workflow info: {WorkflowPath}", workflowPath);
                continue;
            }

            var defaultUser = AppConfig.Instance.DefaultUserId;

            var name = parts[2].WithoutExtension();
            var workflow = new Workflow
            {
                Path = workflowPath,
                Category = parts[0],
                Base = parts[1],
                Name = name,
                Slug = name.GenerateSlug(),
                CreatedBy = defaultUser,
                CreatedDate = DateTime.UtcNow,
                ModifiedBy = defaultUser,
                ModifiedDate = DateTime.UtcNow,
            };

            workflow.Id = (int) db.Insert(workflow, selectIdentity: true);
            workflowPaths[workflowPath] = workflow;
            workflows.Add(workflow);

            var workflowVersion = new WorkflowVersion
            {
                ParentId = workflow.Id,
                Version = "v1",
                Workflow = workflowObj,
                Info = workflowInfo,
                Nodes = nodes,
                Assets = assets,
                CreatedBy = defaultUser,
                CreatedDate = DateTime.UtcNow,
                ModifiedBy = defaultUser,
                ModifiedDate = DateTime.UtcNow,
            };
            workflowVersion.Id = (int) db.Insert(workflowVersion, selectIdentity: true);
            workflowVersions.Add(workflowVersion);
                
            db.UpdateOnly(() => new Workflow {
                PinVersionId = workflowVersion.Id,
            }, x => x.Id == workflow.Id);
        }
        Workflows = workflows;
    }

    public void LoadTags(IDbConnection db)
    {
        Tags = db.Select<Tag>();
        TagsMap = Tags.ToDictionary(x => x.Name);
    }

    // Replace multiple occurrences of '_' with a single '_'
    readonly Regex CollapseUnderscoresRegex = new(@"_+", RegexOptions.Compiled);
    public string SanitizeTag(string name)
    {
        name = name.ToLower().SafeVarName();
        name = CollapseUnderscoresRegex.Replace(name,"_");
        return name;
    }

    public Tag GetOrCreateTag(IDbConnection db, string name)
    {
        name = SanitizeTag(name);
        if (TagsMap.TryGetValue(name, out var tag))
            return tag;

        tag = new Tag
        {
            Name = name,
            CreatedDate = DateTime.UtcNow,
        };
        tag.Id = (int) db.Insert(tag, selectIdentity: true);
        log.LogInformation("Created Tag {Name}", name);
        Tags.Add(tag);
        TagsMap[name] = tag;
        return tag;
    }
    
    public Tag? GetTag(string name)
    {
        name = SanitizeTag(name);
        TagsMap.TryGetValue(name, out var tag);
        return tag;
    }

    public void LoadCategories(IDbConnection db)
    {
        var json = ReadTextFile(Path.Combine(OverridesPath, "categories-list.json"))
                   ?? ReadTextFile("wwwroot/data/categories-list.json")
                   ?? throw new Exception("categories-list.json not found");
        CategoryNames = json.FromJson<List<string>>();
        Categories = db.Select<Category>();
        CategoriesMap = Categories.ToDictionary(x => x.Name);
        
        foreach (var name in CategoryNames)
        {
            GetOrCreateCategory(db, name);
        }
    }

    public Category GetOrCreateCategory(IDbConnection db, string name)
    {
        name = SanitizeTag(name);
        if (CategoriesMap.TryGetValue(name, out var category))
            return category;

        category = new Category {
            Name = name,
        };
        category.Id = (int) db.Insert(category, selectIdentity: true);
        log.LogInformation("Created Category {Name}", name);
        Categories.Add(category);
        CategoriesMap[name] = category;
        return category;
    }
    public Category? GetCategory(string name)
    {
        name = SanitizeTag(name);
        CategoriesMap.TryGetValue(name, out var category);
        return category;
    }


    public void LoadPromptRatings()
    {
        var json = ReadTextFile(Path.Combine(OverridesPath, "prompt-ratings.json"))
                   ?? ReadTextFile("wwwroot/data/prompt-ratings.json")
                   ?? throw new Exception("prompt-ratings.json not found");
        PromptRatings = json.FromJson<Dictionary<Rating, HashSet<string>>>();
    }

    public void LoadTagRatings()
    {
        var json = ReadTextFile(Path.Combine(OverridesPath, "tag-ratings.json"))
                   ?? ReadTextFile("wwwroot/data/tag-ratings.json")
                   ?? throw new Exception("tag-ratings.json not found");
        TagRatings = json.FromJson<Dictionary<Rating, HashSet<string>>>();
    }

    public void LoadObjectRatings()
    {
        var json = ReadTextFile(Path.Combine(OverridesPath, "object-ratings.json"))
                   ?? ReadTextFile("wwwroot/data/object-ratings.json")
                   ?? throw new Exception("object-ratings.json not found");
        TagRatings = json.FromJson<Dictionary<Rating, HashSet<string>>>();
    }

    public void LoadComfyAgentInstallDefaults()
    {
        var requireNodes = ReadTextFile(Path.Combine(OverridesPath, "install", "require-nodes.txt"))
           ?? ReadTextFile("wwwroot/data/install/require-nodes.txt")
           ?? throw new Exception("install/require-nodes.txt not found");
        RequireNodes = requireNodes.Split('\n').Map(x => x.Trim())
            .Where(x => !string.IsNullOrEmpty(x)).ToList();
        
        var requireModels = ReadTextFile(Path.Combine(OverridesPath, "install", "require-models.txt"))
           ?? ReadTextFile("wwwroot/data/install/require-models.txt")
           ?? throw new Exception("install/require-models.txt not found");
        RequireModels = requireModels.Split('\n').Map(x => x.Trim())
            .Where(x => !string.IsNullOrEmpty(x))
            .Select(x => x.LeftPart(' ').Trim() + " " + x.RightPart(' ').Trim())
            .ToList();
        
        var requirePip = ReadTextFile(Path.Combine(OverridesPath, "install", "requirements.txt"))
           ?? ReadTextFile("wwwroot/data/install/requirements.txt")
           ?? throw new Exception("install/requirements.txt not found");
        RequirePip = requirePip.Split('\n').Map(x => x.Trim())
            .Where(x => !string.IsNullOrEmpty(x)).ToList();
    }

    public List<string> GetActiveComfyAgentDeviceIds()
    {
        return ComfyAgents.Values
            .Where(x => x.OfflineDate == null && x.LastUpdate > DateTime.UtcNow.AddMinutes(-5))
            .Map(x => x.DeviceId).ToList();
    }

    public ComfyAgent? GetComfyAgent(ComfyAgentQuery options=default)
    {
        if (options.DeviceId != null)
        {
            ComfyAgents.TryGetValue(options.DeviceId, out var agent);
            return agent;
        }

        var candidates = new List<ComfyAgent>();
        if (options.UserId != null)
        {
            candidates.AddRange(ComfyAgents.Values.Where(x => x.UserId == options.UserId));
        }

        if (candidates.Count == 0)
        {
            log.LogWarning("No ComfyAgents found for user {UserId}, total {Total} agents online", 
                options.UserId, ComfyAgents.Count);
            candidates = ComfyAgents.Values.ToList();
        }
        
        var ret = candidates
            .OrderBy(x => x.QueueCount)
            .ThenByDescending(x => x.LastUpdate)
            .ToList();

        if (options.LanguageModel != null)
            return ret.FirstOrDefault(x => x.LanguageModels?.Contains(options.LanguageModel) == true);

        return ret.FirstOrDefault();
    }

    private long DefaultMemory = 12;

    public long GetTotalGBMemory(string? deviceId)
    {
        if (deviceId == null)
            return DefaultMemory;
        
        if (!ComfyAgents.TryGetValue(deviceId, out var agent))
            return DefaultMemory;
        
        return agent.Gpus?.Sum(x => x.Total) / 1024 ?? DefaultMemory;
    }
    
    // ComfyUI can only use 1 GPU, so use Max GPU for calculating VRAM
    public long GetMaxGBMemory(string? deviceId)
    {
        if (deviceId == null)
            return DefaultMemory;
        
        if (!ComfyAgents.TryGetValue(deviceId, out var agent))
            return DefaultMemory;
        
        return agent.Gpus?.Max(x => x.Total) / 1024 ?? DefaultMemory;
    }
    
    public int CalculateCredits(string? deviceId, TimeSpan? duration)
    {
        duration ??= TimeSpan.FromSeconds(10);
        var memory = GetMaxGBMemory(deviceId);
        var credits = (int) Math.Ceiling(memory * duration.Value.TotalSeconds / 10);
        return credits;
    }

    public List<string> GetArtifactVariants(IEnumerable<string> artifactPaths)
    {
        // Also include any variants:
        // /App_Data/artifacts/9b/9b4279185b58d8d4e2f71e4716558d605ff031d790ded0b9bdc515a42f31e52f.webp
        // /App_Data/artifacts/9b/9b4279185b58d8d4e2f71e4716558d605ff031d790ded0b9bdc515a42f31e52f_512w512h.webp
        var variantsPaths = new List<string>();
        foreach (var path in artifactPaths)
        {
            try
            {
                var dir = Path.GetDirectoryName(path);
                var fileWithoutExt = path.LastRightPart('/').LastLeftPart('.');
                var files = Directory.GetFiles(dir, fileWithoutExt + "*");
                foreach (var file in files)
                {
                    variantsPaths.AddIfNotExists(dir.CombineWith(file.LastRightPart('/')));
                }
            }
            catch (Exception e)
            {
                log.LogError(e, "Failed to get artifact variants for {Path}", path);
            }
        }

        return variantsPaths;
    }

    public List<string> DeleteArtifact(IDbConnection db, int artifactId)
    {
        var artifact = db.SingleById<Artifact>(artifactId);
        if (artifact == null)
            throw HttpError.NotFound("Artifact not found");
        
        return DeleteArtifact(db, artifact);
    }

    public List<string> DeleteArtifactFiles(IEnumerable<string> fileNames)
    {
        var artifactPaths = new List<string>();
        foreach (var fileName in fileNames)
        {
            artifactPaths.AddRange(DeleteArtifactFile(fileName));
        }
        return artifactPaths;
    }

    public List<string> DeleteArtifactFile(string fileName, int? id = null)
    {
        var artifactPaths = new List<string>();
        var filePath = fileName.Contains('/')
            ? GetArtifactPath(fileName.LastRightPart('/'))
            : GetArtifactPath(fileName);
        var Id = id != null ? $" {id}" : "";
        if (File.Exists(filePath))
        {
            try
            {
                log.LogInformation("Deleting Artifact{Id} file {Path}", filePath, Id);
                File.Delete(filePath);
                artifactPaths.Add(filePath);
            }
            catch (Exception e)
            {
                LogManager.GetLogger(GetType()).Error(e.Message, e);
            }
        }
        var variantPaths = GetArtifactVariants([filePath]);
        foreach (var variantPath in variantPaths)
        {
            if (File.Exists(variantPath))
            {
                try
                {
                    log.LogInformation("Deleting Artifact{Id} variant {Path}", variantPath, Id);
                    File.Delete(variantPath);
                    artifactPaths.Add(filePath);
                }
                catch (Exception e)
                {
                    LogManager.GetLogger(GetType()).Error(e.Message, e);
                }
            }
        }
        return artifactPaths;
    }
    
    public List<string> DeleteArtifact(IDbConnection db, Artifact artifact)
    {
        var artifactsSharingUrl = db.Count<Artifact>(x => x.Url == artifact.Url);
        if (artifactsSharingUrl > 1)
        {
            db.DeleteArtifact(artifact.Id);
            log.LogInformation("Artifact Deleted {Id}. {Count} remaining Artifacts with same url", 
                artifact.Id, artifactsSharingUrl - 1);
            return [];
        }
        JsConfig.Init(new()
        {
            ExcludeDefaultValues = false
        });

        var artifactPaths = DeleteArtifactFile(artifact.Url.LastRightPart('/'), artifact.Id);

        db.DeleteArtifact(artifact.Id);
        log.LogInformation("Artifact Deleted {Id}", artifact.Id);
        
        // check if generation has any other artifacts
        var generation = db.SingleById<WorkflowGeneration>(artifact.GenerationId);
        if (generation != null)
        {
            var otherArtifacts = db.Select(db.From<Artifact>()
                .Where(x => x.GenerationId == artifact.GenerationId && x.Id != artifact.Id));
            if (otherArtifacts.Count == 0)
            {
                log.LogInformation("Deleting generation {Id} as it has no other artifacts", generation.Id);
                db.DeleteById<WorkflowGeneration>(generation.Id);
                db.Insert(new DeletedRow { Table = Table.WorkflowGeneration, Key = generation.Id });
            }
        }

        return artifactPaths;
    }
    
    private static Regex RemoveNonAlphaNumericRegex = new(@"[^a-z0-9\s]", RegexOptions.Compiled);
    private static Regex RemoveExtraSpacesRegex = new(@"\s+", RegexOptions.Compiled);

    public Rating GetMinRatingForPrompt(string? prompt)
    {
        var ratings = new HashSet<Rating>
        {
            Rating.PG
        };

        if (!string.IsNullOrEmpty(prompt))
        {
            var usePrompt = prompt.ToLower();
            // replace non alpha numeric chars with spaces:
            usePrompt = RemoveNonAlphaNumericRegex.Replace(usePrompt, " ");
            // remove extra spaces
            usePrompt = RemoveExtraSpacesRegex.Replace(usePrompt, " ");
            var promptWords = new HashSet<string>(usePrompt.Split(' ', 
                StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries));
            foreach (var promptWord in promptWords)
            {
                foreach (var (rating, ratingWords) in PromptRatings)
                {
                    if (ratingWords.Contains(promptWord))
                    {
                        ratings.Add(rating);
                    }
                }
            }
        }
        return ratings.GetMaxRating();
    }

    public bool AgentCanRunWorkflow(ComfyAgent agent, WorkflowGeneration gen)
    {
        return AgentCanRunWorkflow(agent, gen.RequiredNodes, gen.RequiredAssets);
    }
    
    public bool AgentCanRunWorkflow(ComfyAgent agent, HashSet<string> RequiredNodes, HashSet<string> RequiredAssets)
    {
        var missingNodes = new List<string>();
        var missingAssets = new List<string>();
        
        foreach (var node in RequiredNodes)
        {
            if (!DefaultGatewayNodes.Contains(node) && !agent.Nodes.Contains(node))
                missingNodes.Add(node);
        }

        foreach (var asset in RequiredAssets)
        {
            var type = asset.LeftPart('/');
            var fileName = asset.LastRightPart('/');
            switch (type)
            {
                //https://github.com/comfyanonymous/ComfyUI/blob/master/folder_paths.py
                case "checkpoints":
                case "Stable-diffusion":
                    if (!agent.Checkpoints.Contains(fileName))
                        missingAssets.Add(asset);
                    break;
                case "diffusion_models":
                case "unet":
                    if (!agent.Unets.Contains(fileName))
                        missingAssets.Add(asset);
                    break;
                case "loras":
                    if (!agent.Loras.Contains(fileName))
                        missingAssets.Add(asset);
                    break;
                case "embeddings":
                    if (!agent.Embeddings.Contains(fileName))
                        missingAssets.Add(asset);
                    break;
                case "vae":
                case "VAE":
                    if (!agent.Vaes.Contains(fileName))
                        missingAssets.Add(asset);
                    break;
                case "clip":
                case "text_encoders":
                    if (!agent.Clips.Contains(fileName))
                        missingAssets.Add(asset);
                    break;
                case "clip_vision":
                    if (!agent.ClipVisions.Contains(fileName))
                        missingAssets.Add(asset);
                    break;
                case "upscale_models":
                    if (!agent.Upscalers.Contains(fileName))
                        missingAssets.Add(asset);
                    break;
                case "controlnet":
                case "t2i_adapter":
                    if (!agent.ControlNets.Contains(fileName))
                        missingAssets.Add(asset);
                    break;
                case "style_models":
                    if (!agent.Stylers.Contains(fileName))
                        missingAssets.Add(asset);
                    break;
                case "photomaker":
                    if (!agent.PhotoMakers.Contains(fileName))
                        missingAssets.Add(asset);
                    break;
                case "gligen":
                    if (!agent.Gligens.Contains(fileName))
                        missingAssets.Add(asset);
                    break;
            }
        }
        
        if (missingAssets.Count > 0 || missingNodes.Count > 0)
        {
            log.LogInformation("Agent {DeviceId} ({AgentIp}) cannot run workflow due to: {MissingAssets}{MissingNodes}",
                agent.DeviceId, agent.LastIp,
                missingAssets.Count > 0
                    ? $"\n{missingAssets.Count} missing assets: {string.Join(", \n", missingAssets)}"
                    : "",
                missingNodes.Count > 0
                    ? $"\n{missingNodes.Count} missing nodes: {string.Join(", \n", missingNodes)}"
                    : "");
            if (missingAssets.Count > 0)
            {
                log.LogInformation("Agent {DeviceId} ({AgentIp}) checkpoints: {Checkpoints}",
                    agent.DeviceId, agent.LastIp, string.Join("\n", agent.Checkpoints.OrderBy(x => x)));
            }
            if (missingNodes.Count > 0)
            {
                log.LogInformation("Agent {DeviceId} ({AgentIp}) nodes: {Nodes}",
                    agent.DeviceId, agent.LastIp, string.Join("\n", agent.Nodes.OrderBy(x => x)));
            }
            return false;
        }
        
        return true;
    }
    
    public Dictionary<string, NodeInfo> GetSupportedNodeDefinitions(HashSet<string> requiredNodes, HashSet<string> requiredAssets)
    {
        foreach (var agent in ComfyAgents.Values)
        {
            if (AgentCanRunWorkflow(agent, requiredNodes, requiredAssets))
                return agent.NodeDefs;
        }
        return Metadata.DefaultNodeDefinitions;
    }

    public List<WorkflowGeneration> GetNextGenerations(IDbConnection db, ComfyAgent agent, string userId, int take)
    {
        bool AssignedToAgent(string generationId)
        {
            var updated = db.UpdateOnly(() => new WorkflowGeneration
            {
                DeviceId = agent.DeviceId,
                ModifiedBy = userId,
                ModifiedDate = DateTime.UtcNow,
                StatusUpdate = GenerationStatus.AssignedToAgent,
            }, where: x => x.Id == generationId && x.DeviceId == null);
            return updated != 0;
        }

        // Check for any missing assigned generations for this device
        // Generations can be lost when agents restart, resend any assigned generations that is not in their queue 
        var missingAssignedGenerations = db.Select<WorkflowGeneration>()
            .Where(x => x.Result == null && x.Error == null && x.DeletedDate == null 
                        && x.DeviceId == agent.DeviceId && !agent.QueuedIds.Contains(x.Id))
            .OrderBy(x => x.CreatedDate);

        var ret = missingAssignedGenerations.Take(take).ToList();
        var missingAssignedGenerationsCount = ret.Count;
        var pendingUserOrDeviceGenerationsCount = 0;
        var pendingForAnyDeviceCount = 0;
        var unassignedPendingGenerationsCount = 0;
        var reassignedForInactiveAgentsCount = 0;

        var incompatibleIds = new HashSet<string>();
        bool CanRunWorkflow(WorkflowGeneration gen)
        {
            if (incompatibleIds.Contains(gen.Id))
                return false;
            if (!AgentCanRunWorkflow(agent, gen))
            {
                incompatibleIds.Add(gen.Id);
                return false;
            }
            return true;
        }

        if (ret.Count <= take)
        {
            // Check for any pending generations for this device or user
            var pendingUserOrDeviceGenerations = db.Select(db.From<WorkflowGeneration>()
                .Where(x => x.Result == null && x.Error == null && x.DeletedDate == null && x.PromptId == null
                            && (x.DeviceId == agent.DeviceId || x.UserId == userId))
                .OrderBy(x => x.CreatedDate));
            foreach (var pendingGeneration in pendingUserOrDeviceGenerations)
            {
                if (ret.Any(x => x.Id == pendingGeneration.Id))
                    continue;
                if (!CanRunWorkflow(pendingGeneration)) 
                    continue;
                if (!AssignedToAgent(pendingGeneration.Id)) 
                    continue;
                
                ret.Add(pendingGeneration);
                pendingUserOrDeviceGenerationsCount++;
                if (ret.Count >= take)
                    break;
            }
        }

        if (ret.Count <= take)
        {
            // Check for any pending generations for any device
            var pendingForAnyDevice = db.Select(db.From<WorkflowGeneration>()
                .Where(x => x.Result == null && x.Error == null && x.DeletedDate == null && x.PromptId == null && x.DeviceId == null)
                .OrderBy(x => x.CreatedDate));
            foreach (var pendingGeneration in pendingForAnyDevice)
            {
                if (ret.Any(x => x.Id == pendingGeneration.Id))
                    continue;
                if (!CanRunWorkflow(pendingGeneration))
                    continue;
                if (!AssignedToAgent(pendingGeneration.Id)) 
                    continue;

                ret.Add(pendingGeneration);
                pendingForAnyDeviceCount++;
                if (ret.Count >= take)
                    break;
            }
        }

        int updated = 0;
        if (ret.Count <= take)
        {
            // Check for any pending generations for unassigned device
            var unassignedPendingGenerations = db.Select(db.From<WorkflowGeneration>()
                .Where(x => x.Result == null && x.Error == null && x.DeletedDate == null && x.DeviceId == null)
                .OrderBy(x => x.CreatedDate));
            foreach (var queuedGeneration in unassignedPendingGenerations)
            {
                if (ret.Any(x => x.Id == queuedGeneration.Id))
                    continue;
                if (!CanRunWorkflow(queuedGeneration))
                    continue;
                
                updated = db.UpdateOnly(() => new WorkflowGeneration
                {
                    DeviceId = agent.DeviceId,
                    ModifiedBy = userId,
                    ModifiedDate = DateTime.UtcNow,
                    StatusUpdate = GenerationStatus.AssignedToAgent,
                }, where: x => x.Id == queuedGeneration.Id && x.DeviceId == null);
                if (updated > 0)
                {
                    ret.Add(queuedGeneration);
                    unassignedPendingGenerationsCount++;
                    if (ret.Count >= take)
                        break;
                }
            }
        }

        if (ret.Count <= take)
        {
            // Reassign any pending generations to inactive agents
            var activeDeviceIds = GetActiveComfyAgentDeviceIds();
            var reassignedForInactiveAgents = db.Select(db.From<WorkflowGeneration>()
                .Where(x => x.Result == null && x.Error == null && x.DeletedDate == null 
                            && x.CreatedDate < DateTime.UtcNow.AddMinutes(-5) && !activeDeviceIds.Contains(x.DeviceId))
                .OrderBy(x => x.CreatedDate));
            foreach (var queuedGeneration in reassignedForInactiveAgents)
            {
                if (ret.Any(x => x.Id == queuedGeneration.Id))
                    continue;
                if (!CanRunWorkflow(queuedGeneration))
                    continue;
                
                updated = db.UpdateOnly(() => new WorkflowGeneration
                {
                    DeviceId = agent.DeviceId,
                    PromptId = null,
                    ModifiedBy = userId,
                    ModifiedDate = DateTime.UtcNow,
                    StatusUpdate = GenerationStatus.AssignedToAgent,
                }, where: x => x.Id == queuedGeneration.Id);
                if (updated > 0)
                {
                    ret.Add(queuedGeneration);
                    reassignedForInactiveAgentsCount++;
                    if (ret.Count >= take)
                        break;
                }
            }
        }
        
        if (ret.Count > take)
            ret = ret.Take(take).ToList();

        if (ret.Count > 0)
        {
            log.LogInformation("Agent {DeviceId} ({AgentIp}) has been assigned {Count} new generations: " +
                               "{MissingAssignedDeviceGenerationsCount} missing assigned, " +
                               "{PendingUserOrDeviceGenerationsCount} pending user or device, " +
                               "{PendingForAnyDeviceCount} pending for any device, " +
                               "{UnassignedPendingGenerationsCount} unassigned, " +
                               "{ReassignedForInactiveAgentsCount} reassigned for inactive agents.", 
                agent.DeviceId, agent.LastIp, ret.Count, missingAssignedGenerationsCount, 
                pendingUserOrDeviceGenerationsCount, pendingForAnyDeviceCount, 
                unassignedPendingGenerationsCount, reassignedForInactiveAgentsCount);
        }
        else
        {
            log.LogInformation("Agent {DeviceId} ({AgentIp}) has not been assigned any new generations.", 
                agent.DeviceId, agent.LastIp);
        }
        
        return ret;
    }

    public void SaveArtifactMetadata(ArtifactMetadata metadata)
    {
        File.WriteAllText(GetArtifactPath(metadata.FileName!.LastLeftPart('.') + ".json"), metadata.ToJson().IndentJson());
    }

    public async Task SaveArtifactsMetadataAsync(List<ArtifactMetadata> metadatas)
    {
        var tasks = metadatas.Map(x => File.WriteAllTextAsync(GetArtifactPath(x.FileName!.LastLeftPart('.') + ".json"), x.ToJson().IndentJson()));
        await Task.WhenAll(tasks);
    }
    
    public List<Artifact> GetFeaturedPortraitArtifacts(IDbConnection db, int take)
    {
        var q = db.From<Artifact>()
            .Where(x => x.PublishedDate != null
                        && (x.Rating == Rating.PG || x.Rating == Rating.PG13)
                        && x.Height > x.Width)
            .Take(take)
            .OrderByRandom();
        
        if (Config.FeaturedUserIds.Length == 1)
        {
            var featuredUserId = Config.FeaturedUserIds.First();
            q.Where(x => x.PublishedBy == featuredUserId);
        }
        else if (Config.FeaturedUserIds.Length > 0)
        {
            q.Where(x => Sql.In(x.PublishedBy, Config.FeaturedUserIds));
        }
        
        return db.Select(q);
    }

    public IDbConnection OpenAiTaskDb(DateTime? createdDate=null)
    {
        var date = createdDate ?? DateTime.UtcNow;
        
        if (date.Year is < 2025 or > 2026)
            throw new ArgumentException($"Invalid {createdDate}", nameof(createdDate));
        
        var monthDb = $"ai_{date.Year}-{date.Month:00}.db";
        if (!OrmLiteConnectionFactory.NamedConnections.ContainsKey(monthDb))
        {
            var path = Config.TaskConnection.RightPart('=').LastLeftPart(';');
            var dir = ContentRootPath.CombineWith(path.LastLeftPart('/'));
            dir.AssertDir();
            var connString = Config.TaskConnection.Replace("{db}", monthDb);
            dbFactory.RegisterConnection(monthDb, connString, SqliteConfiguration.Configure(SqliteDialect.Create()));
            var db = dbFactory.OpenDbConnection(monthDb);

            db.CreateTableIfNotExists<OllamaGenerateTask>();
            db.CreateTableIfNotExists<OpenAiChatTask>();
            
            return db;
        }
        return dbFactory.OpenDbConnection(monthDb);
    }
}

public record struct ComfyAgentQuery(
    string? DeviceId = null, 
    string? UserId = null, 
    HashSet<string>? RequiredNodes = null,
    HashSet<string>? RequiredAssets = null,
    string? LanguageModel = null);
