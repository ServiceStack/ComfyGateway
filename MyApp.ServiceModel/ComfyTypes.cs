namespace MyApp.ServiceModel;

public class ComfyFileRef
{
    public string Path { get; set; }
    public int Size { get; set; }
    public double Modified { get; set; }
}

public enum ComfyWorkflowType
{
    TextToImage,
    ImageToImage,
    ImageToText,
    TextToAudio,
    TextToVideo,
    TextTo3D,
    AudioToText,
    VideoToText,
    ImageToVideo,
}

public enum ComfyPrimarySource
{
    Text,
    Image,
    Video,
    Audio,
}

//jq -r 'to_entries[] | .value.input.required // {} | to_entries[] | .value[0] | if type == "array" then "ENUM" else . end' files/object_info.json | sort | uniq
public enum ComfyInputType
{
    Unknown,
    Audio,
    Boolean,
    Clip,
    ClipVision,
    ClipVisionOutput,
    Combo,
    Conditioning,
    ControlNet,
    Enum,
    FasterWhisperModel,
    Filepath,
    Fl2Model,
    Float,
    Floats,
    Gligen,
    Guider,
    Hooks,
    Image,
    Int,
    Latent,
    LatentOperation,
    Load3D,
    Load3DAnimation,
    Mask,
    Mesh,
    Model,
    Noise,
    Photomaker,
    Sampler,
    Sigmas,
    String,
    StyleModel,
    Subtitle,
    TranscriptionPipeline,
    Transcriptions,
    UpscaleModel,
    VAE,
    VHSAudio,
    Voxel,
    WavBytes,
    WavBytesBatch,
    Webcam,
}

public class ComfyInput
{
    public string ClassType { get; set; }
    public int NodeId { get; set; }
    public int ValueIndex { get; set; }
    public string Name { get; set; }
    public string Label { get; set; }
    public ComfyInputType Type { get; set; }
    public string? Tooltip { get; set; }
    public object? Default { get; set; }
    public decimal? Min { get; set; }
    public decimal? Max { get; set; }
    public decimal? Step { get; set; }
    public decimal? Round { get; set; }
    public bool? Multiline { get; set; }
    public bool? DynamicPrompts { get; set; }
    public bool? ControlAfterGenerate { get; set; }
    public string[]? EnumValues { get; set; }
    public Dictionary<string, object>? ComboValues { get; set; }
}

public class ComfyArg
{
    public ComfyInput Input { get; set; }
    public object? Value { get; set; }
}

public class ComfyWorkflowInfo
{
    public string Name { get; set; }
    public string Path { get; set; }
    public ComfyWorkflowType Type { get; set; }
    public ComfyPrimarySource Input { get; set; }
    public ComfyPrimarySource Output { get; set; }
    public List<ComfyInput> Inputs { get; set; } = [];
}

public class ComfyResult
{
    public string PromptId { get; set; }
    public string? ClientId { get; set; }
    public TimeSpan? Duration { get; set; }
    public List<ComfyTextOutput>? Texts { get; set; }
    public List<ComfyAssetOutput>? Assets { get; set; }
}
public class ComfyTextOutput
{
    public string NodeId { get; set; }
    public string? Text { get; set; }
}
public class ComfyAssetOutput
{
    public string NodeId { get; set; }
    public string Url { get; set; }
    public AssetType Type { get; set; }
    public string FileName { get; set; }
    public int? Width { get; set; }
    public int? Height { get; set; }
}

public enum AssetType
{
    Image,
    Video,
    Audio,
    Text,
    Binary,
}
