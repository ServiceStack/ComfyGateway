using System.Diagnostics;
using Microsoft.Extensions.Logging;
using MyApp.ServiceModel;
using ServiceStack;
using ServiceStack.Text;

namespace MyApp.ServiceInterface;

public interface IComfyWorkflowConverter
{
    Task<ApiPromptResult> CreateApiPromptAsync(WorkflowVersion workflowVersion, Dictionary<string, object?> args, string? clientId=null);
}

public record class ApiPromptResult(ApiPrompt ApiPrompt, Dictionary<string, object?> Workflow);

public class CSharpComfyWorkflowConverter(ILogger<CSharpComfyWorkflowConverter> log, AppData appData) : IComfyWorkflowConverter
{
    public Task<ApiPromptResult> CreateApiPromptAsync(WorkflowVersion workflowVersion, Dictionary<string, object?> args, string? clientId = null)
    {
        var workflow = workflowVersion.Workflow;
        var workflowInfo = workflowVersion.Info;
        if (args.Count > 0)
        {
            var result = ComfyWorkflowParser.MergeWorkflow(workflow, args, workflowInfo);
            workflow = result.Result;
        }
        var apiPrompt = CreateApiPrompt(workflow, args, clientId);
        return Task.FromResult(new ApiPromptResult(apiPrompt, workflow));
    }

    public ApiPrompt CreateApiPrompt(Dictionary<string, object?> workflow, Dictionary<string,object?> args, string? clientId=null) 
    {
        var requiredNodes = ComfyWorkflowParser.ExtractNodeTypes(workflow, log);
        var requiredAssets = ComfyWorkflowParser.ExtractAssetPaths(workflow, log);
        var nodeDefs = appData.GetSupportedNodeDefinitions(requiredNodes, requiredAssets);
        var apiPrompt = ComfyConverters.ConvertWorkflowToApiPrompt(workflow, nodeDefs, clientId, log:log);
        return apiPrompt;
    }
}

public class NodeComfyWorkflowConverter(ILogger<NodeComfyWorkflowConverter> log, AppData appData) 
    : IComfyWorkflowConverter
{
    public async Task<ApiPromptResult> CreateApiPromptAsync(WorkflowVersion workflowVersion, Dictionary<string, object?> args, string? clientId = null)
    {
        var workflow = workflowVersion.Workflow;
        var requiredNodes = ComfyWorkflowParser.ExtractNodeTypes(workflow, log);
        var requiredAssets = ComfyWorkflowParser.ExtractAssetPaths(workflow, log);
        var agent = appData.GetSupportedAgent(requiredNodes, requiredAssets);
        var nodeDefinitionPath = agent != null
            ? appData.GetDeviceObjectInfoPath(agent.DeviceId)
            : appData.DefaultObjectInfoPath;
        var workflowPath = appData.WorkflowsPath.CombineWith(workflowVersion.Path);
        
        if (!File.Exists(nodeDefinitionPath))
            throw HttpError.NotFound("object_info.json was not found");
        if (!File.Exists(workflowPath))
            throw HttpError.NotFound($"Workflow {workflowVersion.Path} does not exist");

        var processInfo = new ProcessStartInfo
        {
            WorkingDirectory = appData.ContentRootPath,
            FileName = appData.Config.BunExePath,
            Arguments = $"./to-api-prompt.ts {nodeDefinitionPath.Quoted()} {workflowPath.Quoted()}",
        };
        var sb = StringBuilderCache.Allocate();
        var sbError = StringBuilderCacheAlt.Allocate();

        await ProcessUtils.RunAsync(processInfo, 2000,
            onOut: data => sb.AppendLine(data),
            onError: data => sbError.AppendLine(data)).ConfigAwait();
        
        var stdout = StringBuilderCache.ReturnAndFree(sb).Trim();
        var stderr = StringBuilderCacheAlt.ReturnAndFree(sbError);

        var promptJson = stdout.StartsWith('{')
            ? stdout
            : throw new Exception($"Failed to convert workflow to API Prompt:\n{stderr}\n{stdout}");
        var prompt = promptJson.FromJson<Dictionary<string, ApiNode>>();
        
        var apiPrompt = new ApiPrompt
        {
            ClientId = clientId,
            Prompt = prompt,
            ExtraData = new()
            {
                ["extra_pnginfo"] = new Dictionary<string, object?>
                {
                    ["workflow"] = workflow
                },
                ["client_id"] = clientId,
            }
        };
        
        return new ApiPromptResult(apiPrompt, workflow);
    }
}