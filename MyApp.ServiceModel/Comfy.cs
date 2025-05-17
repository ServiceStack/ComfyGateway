using ServiceStack;

namespace MyApp.ServiceModel;

[ValidateApiKey]
[Tag(Tags.Agent)]
public class RegisterComfyAgent : IPost, IReturn<RegisterComfyAgentResponse>
{
    [ValidateNotEmpty, ValidateMinimumLength(32), ValidateMaximumLength(36)]
    public string DeviceId { get; set; }
}
public class RegisterComfyAgentResponse
{
    public int Id { get; set; }
    public string ApiKey { get; set; }
    public string DeviceId { get; set; }
    public List<string> Nodes { get; set; }
    public List<string> Checkpoints { get; set; }
    public List<string> Unets { get; set; }
    public List<string> Vaes { get; set; }
    public List<string> Loras { get; set; }
    public List<string> Clips { get; set; }
    public List<string> ClipVisions { get; set; }
    public List<string> Upscalers { get; set; }
    public List<string> Controlnets { get; set; }
    public List<string> Embeddings { get; set; }
    public List<string> Stylers { get; set; }
    public List<string> Gligens { get; set; }
    public List<string> PhotoMakers { get; set; }
    public ResponseStatus? ResponseStatus { get; set; }
}

[ValidateApiKey]
[Tag(Tags.Agent)]
[Route("/comfy/tasks")]
public class GetComfyTasks : IGet, IReturn<ComfyTasksResponse>
{
    [ValidateNotEmpty, ValidateMinimumLength(32), ValidateMaximumLength(36)]
    public string DeviceId { get; set; }
}

public class ComfyTasksResponse
{
    public List<ComfyTask> Results { get; set; } = [];
    public ResponseStatus? ResponseStatus { get; set; }
}

public class AgentInfo
{
    public int Id { get; set; }
    public string DeviceId { get; set; }
    public bool Enabled { get; set; }
    public DateTime? OfflineDate { get; set; }
    public DateTime ModifiedDate { get; set; }
}

[Route("/appdata")]
public class GetAppData : IGet, IReturn<GetAppDataResponse>
{
}
public class GetAppDataResponse
{
    public List<AgentInfo> Agents { get; set; }
    public ResponseStatus? ResponseStatus { get; set; }
}

public class ComfyTask
{
    public long Id { get; set; }
    public string Name { get; set; }
}

[Tag(Tags.Comfy)]
[Route("/comfy/workflows")]
public class GetComfyWorkflows : IGet, IReturn<string[]> {}

[Tag(Tags.Comfy)]
[Route("/comfy/workflows/info")]
public class GetComfyWorkflowInfo : IGet, IReturn<GetComfyWorkflowInfoResponse>
{
    [ValidateNotEmpty]
    public string Workflow { get; set; }
}
public class GetComfyWorkflowInfoResponse
{
    public ComfyWorkflowInfo Result { get; set; }
    public ResponseStatus? ResponseStatus { get; set; }
}

[Tag(Tags.Comfy)]
[Route("/comfy/workflows/prompt")]
public class GetComfyApiPrompt : IGet, IReturn<string>
{
    [ValidateNotEmpty]
    public string Workflow { get; set; }
    public Dictionary<string, object>? Args { get; set; }
}

[Tag(Tags.Comfy)]
[Route("/comfy/workflows/queue")]
public class QueueComfyWorkflow : IPost, IReturn<QueueComfyWorkflowResponse>
{
    [ValidateNotEmpty]
    public string Workflow { get; set; }
    public Dictionary<string, object>? Args { get; set; }
}
public class QueueComfyWorkflowResponse
{
    public long MediaProviderId { get; set; }
    public string RefId { get; set; }
    public string PromptId { get; set; }
    public long JobId { get; set; }
    public ResponseStatus? ResponseStatus { get; set; }
}

/// <summary>
/// Represents a request to retrieve the results of an executed Comfy workflow.
/// This operation fetches the details of a specific workflow execution using its reference identifier.
/// It also supports an optional polling mechanism to wait for results.
/// </summary>
[Tag(Tags.Comfy)]
public class GetExecutedComfyWorkflowResults : IGet, IReturn<GetExecutedComfyWorkflowResultsResponse>
{
    public string RefId { get; set; }
    public bool? Poll { get; set; }
}
public class GetExecutedComfyWorkflowResultsResponse
{
    public ComfyResult Result { get; set; }
    public ResponseStatus? ResponseStatus { get; set; }
}

/// <summary>
/// Represents a request to fetch the results of the execution for one or more Comfy workflows.
/// This operation retrieves the outcome of the workflows identified by their reference IDs.
/// It also supports an optional polling mechanism to wait for results.
/// </summary>
[Tag(Tags.Comfy)]
public class GetExecutedComfyWorkflowsResults: IGet, IReturn<GetExecutedComfyWorkflowsResultsResponse>
{
    [Input(Type = "tag"), FieldCss(Field = "col-span-12")]
    public List<string> RefIds { get; set; }
    public bool? Poll { get; set; }
}
public class GetExecutedComfyWorkflowsResultsResponse
{
    public Dictionary<string,ComfyResult>? Results { get; set; }
    public Dictionary<string,ResponseStatus>? Errors { get; set; }
    public ResponseStatus? ResponseStatus { get; set; }
}


