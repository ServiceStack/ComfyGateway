using Microsoft.Extensions.Logging;
using MyApp.ServiceModel;
using ServiceStack;
using ServiceStack.OrmLite;

namespace MyApp.ServiceInterface;

public class DeviceServices(ILogger<DeviceServices> log, AppData appData, AgentEventsManager agentEvents) 
    : Service
{
    public object Any(FindAssets request)
    {
        var ret = new FindAssetsResponse();

        var fileNames = request.Assets.Map(x => x.LastRightPart('/'));
        var assets = Db.Select<Asset>(x => fileNames.Contains(x.FileName));

        foreach (var modelPath in request.Assets.Safe())
        {
            var fileName = modelPath.LastRightPart('/');
            var assetUrl = assets.FirstOrDefault(x => x.FileName == fileName)?.Url;
            if (assetUrl == null)
            {
                var q = Db.From<WorkflowVersion>();
                q.Where(q.Column<WorkflowVersion>(x => x.Info) + " LIKE {0}", 
                    $"%{fileName}%");
                var workflowVersion = Db.Single(q);
                var asset = workflowVersion?.Info?.Assets.FirstOrDefault(x => x.Asset.EndsWith(fileName));
                if (asset?.Url != null)
                    assetUrl = asset.Url;
            }
            
            if (assetUrl != null)
            {
                ret.Results[modelPath] = assetUrl;
            }
        }
        
        return ret;
    }
    
    public object Any(FindCustomNodes request)
    {
        var ret = new FindCustomNodesResponse();

        foreach (var nodeType in request.Types.Safe())
        {
            if (appData.NodesUrlMap.TryGetValue(nodeType, out var nodeUrl))
            {
                ret.Results[nodeType] = nodeUrl;
            }
        }
        
        return ret;
    }
    
    private ComfyAgent GetRequiredAgent(string deviceId)
    {
        var agent = appData.GetComfyAgent(new(DeviceId:deviceId))
            ?? Db.Single<ComfyAgent>(x => x.DeviceId == deviceId)
            ?? throw HttpError.NotFound("Device not found");

        var userId = Request.GetRequiredUserId();
        if (agent.UserId != userId && !Request.GetClaimsPrincipal().IsAdmin())
            throw HttpError.Forbidden("Device does not belong to you");
        
        return agent;
    }

    public object Post(InstallPipPackage request)
    {
        var agent = GetRequiredAgent(request.DeviceId);
        agent.RequirePip ??= new();
        if (!agent.RequirePip.Contains(request.Package))
        {
            if (request.Require == true)
                agent.RequirePip.AddIfNotExists(request.Package);
            
            agent.Status = $"Queued pip install {request.Package}...";
            agent.SetLastUpdate();

            Db.UpdateOnly(() => new ComfyAgent {
                RequirePip = agent.RequirePip,
                Status = agent.Status,
                ModifiedDate = agent.ModifiedDate,
            }, where: x => x.DeviceId == agent.DeviceId);
        }
        
        agentEvents.Enqueue(request.DeviceId, new AgentEvent
        {
            Name = EventMessages.InstallPipPackage,
            Args = new() {
                ["package"] = request.Package,
            }
        });
        return new StringResponse
        {
            Result = $"Enqueued {request.Package} for {request.DeviceId}"
        };
    }

    public object Post(InstallCustomNode request)
    {
        var agent = GetRequiredAgent(request.DeviceId);
        agent.RequireNodes ??= new();
        if (!agent.RequireNodes.Contains(request.Url))
        {
            if (request.Require == true)
                agent.RequirePip.AddIfNotExists(request.Url);
            agent.Status = $"Queued install {request.Url.RightPart('@').LastLeftPart('?')}...";
            agent.SetLastUpdate();

            Db.UpdateOnly(() => new ComfyAgent {
                RequireNodes = agent.RequireNodes,
                Status = agent.Status,
                ModifiedDate = agent.ModifiedDate,
            }, where: x => x.DeviceId == agent.DeviceId);
        }
        
        agentEvents.Enqueue(request.DeviceId, new AgentEvent
        {
            Name = EventMessages.InstallCustomNode,
            Args = new() {
                ["url"] = request.Url,
            }
        });
        return new StringResponse
        {
            Result = $"Enqueued {request.Url} for {request.DeviceId}"
        };
    }

    public object Post(InstallModel request)
    {
        var agent = GetRequiredAgent(request.DeviceId);
        agent.RequireModels ??= new();
        var model = $"{request.SaveTo.Trim()} {request.Url.Trim()}";
        var now = DateTime.UtcNow;
        
        if (!agent.RequireModels.Contains(model))
        {
            agent.RequireModels.AddIfNotExists(model);
            agent.Status = $"Queued download {request.SaveTo}...";
            agent.SetLastUpdate();
            
            Db.UpdateOnly(() => new ComfyAgent {
                RequireModels = agent.RequireModels,
                Status = agent.Status,
                ModifiedDate = agent.ModifiedDate,
            }, where: x => x.DeviceId == agent.DeviceId);
        }

        var url = (!string.IsNullOrEmpty(request.Token) ? request.Token + "@" : "") + request.Url;
        agentEvents.Enqueue(request.DeviceId, new AgentEvent
        {
            Name = EventMessages.DownloadModel,
            Args = new() {
                ["model"] = $"{request.SaveTo} {url}",
            }
        });
        return new StringResponse
        {
            Result = $"Enqueued {url} > {request.SaveTo} for {request.DeviceId}"
        };
    }

    public object Post(RebootAgent request)
    {
        var agent = GetRequiredAgent(request.DeviceId);
        agentEvents.Enqueue(request.DeviceId, new AgentEvent {
            Name = EventMessages.Reboot,
        });
        
        agent.Status = "Reboot queued...";
        agent.SetLastUpdate();
            
        Db.UpdateOnly(() => new ComfyAgent {
            RequireModels = agent.RequireModels,
            Status = agent.Status,
            ModifiedDate = agent.ModifiedDate,
        }, where: x => x.DeviceId == agent.DeviceId);
        
        return new StringResponse
        {
            Result = agent.Status
        };
    }

    public async Task<object> Get(GetDeviceStatus request)
    {
        var agent = GetRequiredAgent(request.DeviceId);
        var startedAt = DateTime.UtcNow;
        var updateCounter = agent.Updates;
        
        if (request.Poll == true)
        {
            var waitFor = TimeSpan.FromSeconds(60);
            do
            {
                await Task.Delay(200);
            } while (updateCounter == agent.Updates 
                && (request.StatusChanged == null || agent.Status == request.StatusChanged)
                && (DateTime.UtcNow - startedAt) < waitFor);
        }
        
        return agent.ConvertTo<GetDeviceStatusResponse>();
    }
}
