using ServiceStack;

namespace MyApp.ServiceModel;

[ValidateIsAdmin]
public class QueryUsers : QueryDb<User>
{
    public string? Id { get; set; }
}

[Route("/appdata")]
[Tag(Tags.Admin)]
[ValidateIsAdmin]
public class GetAppData : IGet, IReturn<GetAppDataResponse> {}
public class GetAppDataResponse
{
    public int AssetCount { get; set; }
    public int WorkflowCount { get; set; }
    public Dictionary<string, int> AgentEventCounts { get; set; }
    public List<AgentInfo> Agents { get; set; }
    public List<AiTaskInfo> QueuedAiTasks { get; set; }
    public ResponseStatus? ResponseStatus { get; set; }
}

[Tag(Tags.Admin)]
[ValidateIsAdmin]
public class HardDeleteGenerations : IPost, IReturn<HardDeleteGenerationsResponse>
{
    public int Limit { get; set; }
    public bool Delete { get; set; }
}
public class HardDeleteGenerationsResponse
{
    public string Effect { get; set; }
    public List<GenerationRef> Results { get; set; } = [];
    public ResponseStatus? ResponseStatus { get; set; }
}

[Tag(Tags.Admin)]
[ValidateIsAdmin]
public class HardDeleteArtifact : IPost, IReturn<StringsResponse>
{
    public int ArtifactId { get; set; }
}

[Tag(Tags.Admin)]
[ValidateIsAdmin]
public class DeleteMissingArtifacts : IPost, IReturn<StringsResponse>
{
    public bool Delete { get; set; }
}

[Tag(Tags.Admin)]
[ValidateIsAdmin]
public class DeleteDuplicateArtifacts : IPost, IReturn<DeleteDuplicateArtifactsResponse>
{
    public bool Delete { get; set; }
}
public class DeleteDuplicateArtifactsResponse
{
    public Dictionary<string, int> UrlCounts { get; set; }
    public List<Artifact> DeletedArtifacts { get; set; } = [];
    public ResponseStatus? ResponseStatus { get; set; }
}

[Tag(Tags.Admin)]
[ValidateIsAdmin]
public class PopulateMissingArtifacts : IPost, IReturn<StringsResponse>
{
    public bool Populate { get; set; }
}

[Tag(Tags.Admin)]
[ValidateIsAdmin]
public class RegenerateGenerationResults : IPost, IReturn<StringResponse>
{
    public bool Regenerate { get; set; }
}

public class GenerationRef
{
    public string Id { get; set; }
    public string? PositivePrompt { get; set; }
    public List<string> ArtifactUrls { get; set; } = [];
    public List<string> ArtifactPaths { get; set; } = [];
}

[Tag(Tags.Admin)]
[ValidateIsAdmin]
public class QueryWorkflowGenerations : QueryDb<WorkflowGeneration>, IReturn<StringResponse>
{
    public string? Id { get; set; }
}

[Tag(Tags.Admin)]
[ValidateIsAdmin]
public class HardDeleteWorkflowGeneration : IDeleteDb<WorkflowGeneration>, IReturn<StringResponse>
{
    [ValidateNotEmpty]
    public string Id { get; set; }
}

[Tag(Tags.Admin)]
[ValidateIsAdmin]
public class RequeueFailedThreadGenerations : IPost, IReturn<StringResponse>
{
    [ValidateGreaterThan(0)]
    public int ThreadId { get; set; }
}

[Tag(Tags.Admin)]
[ValidateIsAdmin]
public class Clean : IPost, IReturn<CleanResponse>
{
    public bool Force { get; set; }
}
public class CleanResponse
{
    public Dictionary<string, int> Summary { get; set; } = new();
    public List<string> EmptyGenerations { get; set; } = [];
    public List<string> MissingGenerationFiles { get; set; } = [];
    public List<string> MissingDbArtifacts { get; set; } = [];
    // Url => ArtifactId[]
    public Dictionary<string, int[]> MultipleDbArtifacts { get; set; } = new();
    public List<string> Errors { get; set; } = [];
    public List<string> Actions { get; set; } = [];
    public ResponseStatus? ResponseStatus { get; set; }
}

[Tag(Tags.Admin)]
[ValidateIsAdmin]
public class CreateMissingArtifactTags : IPost, IReturn<CreateMissingArtifactTagsResponse>
{
}
public class CreateMissingArtifactTagsResponse
{
    public int TagsCreated { get; set; }
    public int ArtifactTagsCreated { get; set; }
    public ResponseStatus? ResponseStatus { get; set; }
}

[Tag(Tags.Admin)]
[ValidateIsAdmin]
public class CreateMissingArtifactCategories : IPost, IReturn<CreateMissingArtifactCategoriesResponse>
{
}
public class CreateMissingArtifactCategoriesResponse
{
    public int CategoriesCreated { get; set; }
    public int ArtifactCategoriesCreated { get; set; }
    public ResponseStatus? ResponseStatus { get; set; }
}

[Tag(Tags.Admin)]
[ValidateIsAdmin]
public class RecreateArtifactCategories : IPost, IReturn<StringResponse>
{
}

[Tag(Tags.Admin)]
[ValidateIsAdmin]
public class RecreateArtifactTags : IPost, IReturn<StringResponse>
{
}


[Tag(Tags.Admin)]
[ValidateIsAdmin]
public class CreateMissingAvatars : IPost, IReturn<StringsResponse> {}

[Tag(Tags.Admin)]
[ValidateIsAdmin]
public class SendCaptionArtifactEvent : IPost, IReturn<StringsResponse>
{
    [Input(Type = "tag"), FieldCss(Field = "col-span-12")]
    public List<int>? ArtifactIds { get; set; }
    public string? Model { get; set; }
    public int? Take { get; set; }
}

[Tag(Tags.Admin)]
[ValidateIsAdmin]
public class GenerateCaptionArtifact : IPost, IReturn<StringsResponse>
{
    [Input(Type = "tag"), FieldCss(Field = "col-span-12")]
    public List<int>? ArtifactIds { get; set; }
    public string? Model { get; set; }
    public int? Take { get; set; }
}

[Tag(Tags.Admin)]
[ValidateIsAdmin]
public class ReloadAiTasks : IPost, IReturn<StringResponse>
{
}

[Tag(Tags.Admin)]
[ValidateIsAdmin]
public class MigrateToPostgres : IGet, IReturn<StringResponse>
{
}

[Tag(Tags.Admin)]
[ValidateIsAdmin]
public class InstallPipPackage : IPost, IReturn<StringResponse>
{
    [ValidateNotEmpty, ValidateExactLength(32)]
    public string DeviceId { get; set; }
    [ValidateNotEmpty]
    public string Package { get; set; }
}

[Tag(Tags.Admin)]
[ValidateIsAdmin]
public class InstallCustomNode : IPost, IReturn<StringResponse>
{
    [ValidateNotEmpty, ValidateExactLength(32)]
    public string DeviceId { get; set; }
    [ValidateNotEmpty]
    public string RepoUrl { get; set; }
}

[Tag(Tags.Admin)]
[ValidateIsAdmin]
public class InstallModel : IPost, IReturn<StringResponse>
{
    [ValidateNotEmpty, ValidateExactLength(32)]
    public string DeviceId { get; set; }
    
    [ValidateNotEmpty]
    public string SaveTo { get; set; }

    [ValidateNotEmpty]
    public string Url { get; set; }

    public string? Token { get; set; }
}


[Tag(Tags.Admin)]
[ValidateIsAdmin]
public class RebootAgent : IPost, IReturn<StringResponse>
{
    [ValidateNotEmpty, ValidateExactLength(32)]
    public string DeviceId { get; set; }
}

[Tag(Tags.Admin)]
[ValidateIsAdmin]
public class GetDeviceStatus : IGet, IReturn<GetDeviceStatusResponse>
{
    [ValidateNotEmpty, ValidateExactLength(32)]
    public string DeviceId { get; set; }
}
public class GetDeviceStatusResponse
{
    public string DeviceId { get; set; }
    public List<string>? RequirePip { get; set; }
    public List<string>? RequireNodes { get; set; }
    public List<string>? RequireModels { get; set; }

    public string? Status { get; set; }
    public string? Logs { get; set; }
    public ResponseStatus? Error { get; set; }

    public ResponseStatus? ResponseStatus { get; set; }
}

[Tag(Tags.Admin)]
[ValidateIsAdmin]
public class AiChat : IPost, IReturn<StringResponse>
{
    public string? Model { get; set; }

    [ValidateNotEmpty]
    [Input(Type = "textarea"), FieldCss(Field = "col-span-12 text-center")]
    public string Prompt { get; set; }

    [Input(Type = "textarea"), FieldCss(Field = "col-span-12 text-center")]
    public string? SystemPrompt { get; set; }
}

[Tag(Tags.Admin)]
[ValidateIsAdmin]
public class GetAiChat : IGet, IReturn<GetAiChatResponse>
{
    public long? TaskId { get; set; }
    public bool? IncludeDetails { get; set; }
}
public class GetAiChatResponse
{
    public string Result { get; set; }
    public OpenAiChatResponse? Response { get; set; }
    public ResponseStatus? ResponseStatus { get; set; }
}