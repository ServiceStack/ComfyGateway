using System.Runtime.Serialization;
using ServiceStack;
using ServiceStack.DataAnnotations;

namespace MyApp.ServiceModel;

public class Asset
{
    [AutoIncrement]
    public int Id { get; set; }
    public string Name { get; set; }
    public string? Type { get; set; }
    public string? Base { get; set; }
    [DataMember(Name = "save_path")]
    public string SavePath { get; set; }
    [DataMember(Name = "filename")]
    public string FileName { get; set; }
    public string? Description { get; set; }
    public string? Reference { get; set; }
    public string Url { get; set; }
    public string? Token { get; set; }
    public string Size { get; set; }   // e.g. "4.71MB"
    public long Length { get; set; }   // Length in Bytes
    public string? Hash { get; set; }  // SHA256
    public DateTime? LastChecked { get; set; }
    public DateTime? ModifiedDate { get; set; }
}


[ValidateApiKey]
[Tag(Tags.Agent)]
public class GetComfyAgentEvents : IGet, IReturn<GetComfyAgentEventsResponse>
{
    [ValidateNotEmpty, ValidateExactLength(32)]
    public string DeviceId { get; set; }
}
public class GetComfyAgentEventsResponse
{
    public List<AgentEvent> Results { get; set; } = [];
    public ResponseStatus? ResponseStatus { get; set; }
}
public class AgentEvent
{
    public string Name { get; set; }
    public Dictionary<string, string?>? Args { get; set; }
}

[ValidateApiKey]
[Tag(Tags.Agent)]
public class UpdateComfyAgent : IPost, IReturn<EmptyResponse>
{
    [ValidateNotEmpty, ValidateExactLength(32)]
    public string DeviceId { get; set; }
    public int QueueCount { get; set; }
    public List<GpuInfo>? Gpus { get; set; }
    public List<string>? RunningGenerationIds { get; set; }
    public List<string>? QueuedGenerationIds { get; set; }
}

[ValidateApiKey]
[Tag(Tags.Agent)]
public class UpdateComfyAgentStatus : IPost, IReturn<EmptyResponse>
{
    [ValidateNotEmpty, ValidateExactLength(32)]
    public string DeviceId { get; set; }
    public string? Downloading { get; set; }
    public string? Downloaded { get; set; }
    public string? DownloadFailed { get; set; }
    public string? Status { get; set; }
    public string? Logs { get; set; }
    public ResponseStatus? Error { get; set; }
}

[ValidateApiKey]
[Tag(Tags.Agent)]
public class RegisterComfyAgent : IPost, IReturn<RegisterComfyAgentResponse>
{
    [ValidateNotEmpty, ValidateExactLength(32)]
    public string DeviceId { get; set; }
    public int Version { get; set; }
    public string ComfyVersion { get; set; }
    public List<string> Workflows { get; set; }
    public int QueueCount { get; set; }
    public List<GpuInfo>? Gpus { get; set; }
    public List<string>? LanguageModels { get; set; }
}

public class RegisterComfyAgentResponse
{
    public int Id { get; set; }
    public string ApiKey { get; set; }
    public string DeviceId { get; set; }
    public List<string> Nodes { get; set; }
    public List<string> Categories { get; set; }
    public List<string>? RequirePip { get; set; }
    public List<string>? RequireNodes { get; set; }
    public List<string>? RequireModels { get; set; }
    public ComfyAgentSettings Settings { get; set; }

    public ResponseStatus? ResponseStatus { get; set; }
}

public class GpuInfo
{
    public int Index { get; set; }
    public string Name { get; set; }
    public int Total { get; set; }
    public int Free { get; set; }
    public int Used { get; set; }
}

public class PromptInfo
{
    public string ClientId { get; set; }
    public string? PromptId { get; set; }
    public string ApiPromptUrl { get; set; }
}

[ValidateApiKey]
[Tag(Tags.Agent)]
public class UnRegisterComfyAgent : IPost, IReturn<EmptyResponse>
{
    [ValidateNotEmpty, ValidateExactLength(32)]
    public string DeviceId { get; set; }
}

[ValidateApiKey]
[Tag(Tags.Agent)]
[Route("/comfy/tasks")]
public class GetComfyTasks : IGet, IReturn<ComfyTasksResponse>
{
    [ValidateNotEmpty, ValidateExactLength(32)]
    public string DeviceId { get; set; }
}

public class ComfyTasksResponse
{
    public List<ComfyTask> Results { get; set; } = [];
    public ResponseStatus? ResponseStatus { get; set; }
}

[ValidateApiKey]
[Tag(Tags.Agent)]
public class UpdateWorkflowGeneration : IPost, IReturn<EmptyResponse>
{
    [ValidateNotEmpty]
    public string Id { get; set; } // ClientId

    [ValidateNotEmpty]
    public string DeviceId { get; set; }
    public string? PromptId { get; set; }
    public string? Status { get; set; }
    public string? Outputs { get; set; }
    public int? QueueCount { get; set; }
    public ResponseStatus? Error { get; set; }
}

[ValidateApiKey]
[Tag(Tags.Agent)]
public class CaptionArtifact : IPost, IReturn<EmptyResponse>
{
    [ValidateNotEmpty, ValidateExactLength(32)]
    public string DeviceId { get; set; }
    [ValidateNotEmpty]
    public string ArtifactUrl { get; set; }
    public string? Caption { get; set; }
    public string? Description { get; set; }
}

[ValidateApiKey]
[Tag(Tags.Agent)]
public class CompleteOllamaGenerateTask : OllamaGenerateResponse, IPost, IReturn<EmptyResponse>
{
    [ValidateGreaterThan(0)]
    public long TaskId { get; set; }
}

[ValidateApiKey]
[Tag(Tags.Agent)]
public class GetOllamaGenerateTask : IGet, IReturn<OllamaGenerate>
{
    [ValidateGreaterThan(0)]
    public long TaskId { get; set; }
}

[ValidateApiKey]
[Tag(Tags.Agent)]
public class GetOpenAiChatTask : IGet, IReturn<OpenAiChat>
{
    [ValidateGreaterThan(0)]
    public long TaskId { get; set; }
}

[ValidateApiKey]
[Tag(Tags.Agent)]
public class CompleteOpenAiChatTask : OpenAiChatResponse, IPost, IReturn<EmptyResponse>
{
    [ValidateGreaterThan(0)]
    public long TaskId { get; set; }
}
