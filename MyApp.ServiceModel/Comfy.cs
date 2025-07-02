using System.Text.Json.Serialization;
using ServiceStack;
using ServiceStack.DataAnnotations;

namespace MyApp.ServiceModel;

public class AgentInfo
{
    public int Id { get; set; }
    public string ShortId { get; set; }
    public List<GpuInfo>? Gpus { get; set; }
    public List<string> Nodes { get; set; }
    public List<string> Checkpoints { get; set; }     // folders: checkpoints
    public List<string> Clip { get; set; }            // folders: clip, text_encoders
    public List<string> ClipVision { get; set; }      // folders: clip_vision
    public List<string> Configs { get; set; }         // folders: configs
    public List<string> Controlnet { get; set; }      // folders: controlnet
    public List<string> Diffusers { get; set; }       // folders: diffusers
    public List<string> DiffusionModels { get; set; } // folders: diffusion_models, unet
    public List<string> Embeddings { get; set; }      // folders: embeddings
    public List<string> Gligen { get; set; }          // folders: gligen
    public List<string> Hypernetworks { get; set; }   // folders: hypernetworks
    public List<string> Loras { get; set; }           // folders: loras
    public List<string> Photomaker { get; set; }      // folders: photomaker
    public List<string> StyleModels { get; set; }     // folders: style_models
    public List<string> UpscaleModels { get; set; }   // folders: upscale_models
    public List<string> Vae { get; set; }             // folders: vae
    public List<string> VaeApprox { get; set; }       // folders: vae_approx
    public List<string>? LanguageModels { get; set; }
    public bool Enabled { get; set; }
    public DateTime? OfflineDate { get; set; }
    public DateTime CreatedDate { get; set; }
    public DateTime ModifiedDate { get; set; }
    public DateTime LastUpdate { get; set; }
    public int QueueCount { get; set; }
    public DateTime? DevicePool { get; set; }
}

public class OwnerAgentInfo : AgentInfo
{
    public string DeviceId { get; set; }
    public string UserId { get; set; }
    public string? UserName { get; set; }
    public string? LastIp { get; set; }
    public string? Downloading { get; set; }
    public string? Downloaded { get; set; }
    public string? DownloadFailed { get; set; }
    public string? Status { get; set; }
}

public class ComfyTask
{
    public long Id { get; set; }
    public string Name { get; set; }
}

[Tag(Tags.Comfy)]

[AutoApply(Behavior.AuditQuery)]
public class QueryWorkflows : QueryDb<Workflow>
{
    public int? AfterId { get; set; }
    public DateTime? AfterModifiedDate { get; set; }
}

[Tag(Tags.Comfy)]
[AutoApply(Behavior.AuditQuery)]
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
public class DownloadWorkflowVersion : IGet, IReturn<byte[]>
{
    [ValidateGreaterThan(0)]
    public int Id { get; set; }
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
[AutoPopulate(nameof(WorkflowVersionReaction.UserId), Eval = "userAuthId()")]
public class CreateWorkflowVersionReaction : ICreateDb<WorkflowVersionReaction>, IReturn<WorkflowVersionReaction>
{
    public int VersionId { get; set; }
    public Reaction Reaction { get; set; }
}

[Tag(Tags.Comfy)]
[ValidateIsAuthenticated]
[AutoPopulate(nameof(WorkflowVersionReaction.UserId), Eval = "userAuthId()")]
public class DeleteWorkflowVersionReaction : IDeleteDb<WorkflowVersionReaction>, IReturn<IdResponse>
{
    public int VersionId { get; set; }
    public Reaction Reaction { get; set; }
}

[Tag(Tags.Comfy)]
[ValidateIsAuthenticated]
[AutoFilter(QueryTerm.Ensure, nameof(WorkflowVersionReaction.UserId), Eval = "userAuthId()")]
public class MyWorkflowVersionReactions : QueryDb<WorkflowVersionReaction,WorkflowVersionReactionInfo>
{
    public int? AfterId { get; set; }
}
public class WorkflowVersionReactionInfo
{
    public int Id { get; set; }
    [JsonPropertyName("v")]
    public int VersionId { get; set; }
    [JsonPropertyName("r")]
    public Reaction Reaction { get; set; }
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
    public DateTime? AfterModifiedDate { get; set; }
}

[Tag(Tags.Comfy)]
[ValidateIsAuthenticated]
public class MyDevices : IGet, IReturn<QueryResponse<OwnerAgentInfo>> 
{
    public DateTime? AfterModifiedDate { get; set; }
}


[Tag(Tags.Comfy)]
[ValidateIsAuthenticated]
public class RemoveDevice : IPost, IReturn<EmptyResponse> 
{
    [ValidateGreaterThan(0)]
    public int Id { get; set; }
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

[Tag(Tags.Comfy)]
public class ParseWorkflow : IPost, IReturn<ParsedWorkflow>
{
    public string? Name { get; set; }
    public string? Json { get; set; }
    
    [Input(Type = "file")]
    public string? File { get; set; }
}

[Tag(Tags.Comfy)]
[ValidateIsAuthenticated]
public class UploadNewWorkflow : IPost, IReturn<UploadNewWorkflowResponse>
{
    public string? WorkflowName { get; set; }
    
    [ValidateNotEmpty]
    public BaseModel? BaseModel { get; set; }

    [Input(Type = "file")]
    public string? Workflow { get; set; }
}
public class UploadNewWorkflowResponse
{
    public int VersionId { get; set; }
    public List<string> Nodes { get; set; }
    public List<string> Assets { get; set; }
    public WorkflowInfo Info { get; set; }
    public ResponseStatus? ResponseStatus { get; set; }
}
