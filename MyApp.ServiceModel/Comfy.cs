using ServiceStack;

namespace MyApp.ServiceModel;

public class AgentInfo
{
    public int Id { get; set; }
    public string ShortId { get; set; }
    public List<GpuInfo>? Gpus { get; set; }
    public List<string> Workflows { get; set; }
    public List<string> Nodes { get; set; }
    public List<string> Checkpoints { get; set; }
    public List<string> Unets { get; set; }
    public List<string> Vaes { get; set; }
    public List<string> Loras { get; set; }
    public List<string> Clips { get; set; }
    public List<string> ClipVisions { get; set; }
    public List<string> Upscalers { get; set; }
    public List<string> ControlNets { get; set; }
    public List<string> Embeddings { get; set; }
    public List<string> Stylers { get; set; }
    public List<string> Gligens { get; set; }
    public List<string> PhotoMakers { get; set; }
    public List<string>? LanguageModels { get; set; }
    public bool Enabled { get; set; }
    public DateTime? OfflineDate { get; set; }
    public DateTime CreatedDate { get; set; }
    public DateTime ModifiedDate { get; set; }
    public DateTime LastUpdate { get; set; }
    public int QueueCount { get; set; }
}

public class OwnerAgentInfo : AgentInfo
{
    public string DeviceId { get; set; }
    public string? LastIp { get; set; }
}

public class ComfyTask
{
    public long Id { get; set; }
    public string Name { get; set; }
}

[Tag(Tags.Comfy)]
public class QueryWorkflows : QueryDb<Workflow>
{
    public int? AfterId { get; set; }
    public DateTime? AfterModifiedDate { get; set; }
}

[Tag(Tags.Comfy)]
public class QueryWorkflowVersions : QueryDb<WorkflowVersion>
{
    public int? AfterId { get; set; }
    public DateTime? AfterModifiedDate { get; set; }
}

[Tag(Tags.Comfy)]
public class GetWorkflowPaths : IGet, IReturn<string[]> {}

[Tag(Tags.Comfy)]
public class GetWorkflowVersion : IGet, IReturn<GetWorkflowVersionResponse>
{
    public int? VersionId { get; set; }
    public int? WorkflowId { get; set; }
}
public class GetWorkflowVersionResponse
{
    public WorkflowVersion Result { get; set; }
    public ResponseStatus? ResponseStatus { get; set; }
}

[Tag(Tags.Comfy)]
public class GetWorkflowInfo : IGet, IReturn<GetWorkflowInfoResponse>
{
    public int? VersionId { get; set; }
    public int? WorkflowId { get; set; }
}
public class GetWorkflowInfoResponse
{
    public WorkflowInfo Result { get; set; }
    public ResponseStatus? ResponseStatus { get; set; }
}

[Tag(Tags.Comfy)]
public class GetWorkflowApiPrompt : IGet, IReturn<string>
{
    [ValidateNotEmpty]
    public string Workflow { get; set; }
    public Dictionary<string, object>? Args { get; set; }
}

[Tag(Tags.Comfy)]
[ValidateIsAuthenticated]
public class RequeueGeneration : IPost, IReturn<RequeueGenerationResponse>
{
    [ValidateNotEmpty]
    public string Id { get; set; }
}
public class RequeueGenerationResponse
{
    public string Id { get; set; }
    public ResponseStatus? ResponseStatus { get; set; }
}

[Tag(Tags.Comfy)]
[ValidateIsAuthenticated]
public class QueueWorkflow : IPost, IReturn<QueueWorkflowResponse>
{
    [ValidateGreaterThan(0)]
    public int WorkflowId { get; set; }
    public int? VersionId { get; set; }
    public int? ThreadId { get; set; }
    public string? Description { get; set; }
    public Dictionary<string, object?>? Args { get; set; }
}
public class QueueWorkflowResponse
{
    public string Id { get; set; }
    public ResponseStatus? ResponseStatus { get; set; }
}

[Tag(Tags.Comfy)]
[ValidateIsAuthenticated]
[AutoApply(Behavior.AuditQuery)]
[AutoFilter(QueryTerm.Ensure, nameof(WorkflowGeneration.CreatedBy), Eval = "userAuthId()")]
public class MyWorkflowGenerations : QueryDb<WorkflowGeneration>
{
    public List<string>? Ids { get; set; }
    public int? ThreadId { get; set; }
    public int? AfterId { get; set; }
    public DateTime? AfterModifiedDate { get; set; }
}

[Tag(Tags.Comfy)]
public class DevicePool : IGet, IReturn<QueryResponse<AgentInfo>> 
{
}

[Tag(Tags.Comfy)]
[ValidateIsAuthenticated]
public class MyDevices : IGet, IReturn<QueryResponse<OwnerAgentInfo>> 
{
    public DateTime? AfterModifiedDate { get; set; }
}

public class TestGenerations : IGet, IReturn<List<WorkflowGeneration>>
{
    public string DeviceId { get; set; }
}

[Tag(Tags.Comfy)]
[ValidateIsAuthenticated]
[AutoApply(Behavior.AuditSoftDelete)]
[AutoFilter(QueryTerm.Ensure, nameof(WorkflowGeneration.CreatedBy), Eval = "userAuthId()")]
public class DeleteMyWorkflowGeneration : IDeleteDb<WorkflowGeneration>, IReturn<EmptyResponse>
{
    public string Id { get; set; }
}

[Tag(Tags.Comfy)]
[ValidateIsAuthenticated]
public class DeleteWorkflowGenerationArtifact : IDelete, IReturn<WorkflowGeneration>
{
    [ValidateNotEmpty]
    public string GenerationId { get; set; }
    [ValidateNotEmpty]
    public string AssetUrl { get; set; }
}

[Tag(Tags.Comfy)]
[ValidateIsAuthenticated]
public class PinWorkflowGenerationArtifact : IPost, IReturn<EmptyResponse>
{
    [ValidateNotEmpty]
    public string GenerationId { get; set; }
    [ValidateNotEmpty]
    public string AssetUrl { get; set; }
}

[Tag(Tags.Comfy)]
[ValidateIsAuthenticated]
public class PublishWorkflowGeneration : IPost, IReturn<EmptyResponse>
{
    [ValidateNotEmpty]
    public string Id { get; set; }
}

[Tag(Tags.Comfy)]
[ValidateIsAuthenticated]
public class WaitForMyWorkflowGenerations : IGet, IReturn<QueryResponse<WorkflowGeneration>>
{
    [Input(Type = "tag"), FieldCss(Field = "col-span-12")]
    public List<string> Ids { get; set; } // WorkflowGeneration.Id
    public int? ThreadId { get; set; }
    public DateTime? AfterModifiedDate { get; set; }
}

public class GetGenerationApiPrompt : IGet, IReturn<ApiPrompt>
{
    public string Id { get; set; }
}

/// <summary>
/// Represents a request to retrieve the results of an executed Comfy workflow.
/// This operation fetches the details of a specific workflow execution using its reference identifier.
/// It also supports an optional polling mechanism to wait for results.
/// </summary>
[Tag(Tags.Comfy)]
[ValidateIsAuthenticated]
public class GetExecutedWorkflowResults : IGet, IReturn<GetExecutedWorkflowResultsResponse>
{
    public string Id { get; set; }
    public bool? Poll { get; set; }
}
public class GetExecutedWorkflowResultsResponse
{
    public WorkflowResult Result { get; set; }
    public ResponseStatus? ResponseStatus { get; set; }
}

/// <summary>
/// Represents a request to fetch the results of the execution for one or more Comfy workflows.
/// This operation retrieves the outcome of the workflows identified by their reference IDs.
/// It also supports an optional polling mechanism to wait for results.
/// </summary>
[Tag(Tags.Comfy)]
[ValidateIsAuthenticated]
public class GetExecutedWorkflowsResults : IGet, IReturn<GetExecutedWorkflowsResultsResponse>
{
    [Input(Type = "tag"), FieldCss(Field = "col-span-12")]
    public List<string> Ids { get; set; } // WorkflowGeneration.Id
    public bool? Poll { get; set; }
}
public class GetExecutedWorkflowsResultsResponse
{
    public Dictionary<string,WorkflowResult>? Results { get; set; }
    public Dictionary<string,ResponseStatus>? Errors { get; set; }
    public ResponseStatus? ResponseStatus { get; set; }
}

[Tag(Tags.Comfy)]
[ValidateIsAuthenticated]
public class UpdateGenerationAsset : IPost, IReturn<EmptyResponse>
{
    [ValidateNotEmpty]
    public string GenerationId { get; set; }
    [ValidateNotEmpty]
    public string AssetUrl { get; set; }
    public Rating? Rating { get; set; }
}

[Tag(Tags.Comfy)]
public class GetWorkflowGeneration : IGet, IReturn<GetWorkflowGenerationResponse>
{
    [ValidateNotEmpty]
    public string Id { get; set; }
}
public class GetWorkflowGenerationResponse
{
    public WorkflowGeneration Result { get; set; }
    public List<Artifact> Artifacts { get; set; }
    public ResponseStatus? ResponseStatus { get; set; }
}

[Tag(Tags.Comfy)]
[ValidateIsAuthenticated]
public class MoveGeneration : IReturn<EmptyResponse>
{
    public string GenerationId { get; set; }
    public int ThreadId { get; set; }
}