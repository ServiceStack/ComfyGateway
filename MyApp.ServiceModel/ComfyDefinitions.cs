using System.Text.Json.Serialization;
using ServiceStack;
using ServiceStack.DataAnnotations;

namespace MyApp.ServiceModel;

/*
  - http://localhost:7860/api/object_info
  - https://github.com/comfyanonymous/ComfyUI/blob/master/folder_paths.py
  - UNETLoader/input/required/unet_name                   = unet models
  - VAELoader/input/required/vae_name                     = vae models
  - CLIPLoader/input/required/clip_name                   = clip models
  - CLIPVisionLoader/input/required/clip_name             = clip vision models
  - LoraLoader/input/required/lora_name                   = lora models
  - UpscaleModelLoader/input/required/model_name          = upscale models
  - ControlNetLoader/input/required/control_net_name      = control nets
  - StyleModelLoader/input/required/style_model_name      = style moders
  - PhotoMakerLoader/input/required/photomaker_model_name = PhotoMakers
  - GLIGENLoader/input/required/gligen_name               = GLIGENs
  - AssetDownloader/input/required/save_to                = model folders + sub folder
 */

[Icon(Svg = Icons.MediaProvider)]
public class ComfyAgent
{
    [AutoIncrement] public int Id { get; set; }
    [Index]
    public string DeviceId { get; set; }
    public int Version { get; set; }
    public string? ComfyVersion { get; set; }
    [Index]
    public string UserId { get; set; }
    public string? UserName { get; set; }
    public string ApiKey { get; set; }
    public List<GpuInfo>? Gpus { get; set; }
    public List<string> Workflows { get; set; }
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
    public bool Enabled { get; set; }
    public DateTime? OfflineDate { get; set; }
    public DateTime CreatedDate { get; set; }
    public DateTime ModifiedDate { get; set; }
    public string? LastIp { get; set; }
    
    public int Credits { get; set; }
    public int WorkflowsExecuted { get; set; }
    public int ImagesGenerated { get; set; }
    public int AudiosGenerated { get; set; }
    public int VideosGenerated { get; set; }
    public int TextsGenerated { get; set; }
    
    public int QueueCount { get; set; }
    public List<string>? LanguageModels { get; set; }
    
    [PgSqlJsonB]
    public List<string>? RequirePip { get; set; }
    [PgSqlJsonB]
    public List<string>? RequireNodes { get; set; }
    [PgSqlJsonB]
    public List<string>? RequireModels { get; set; }
    [PgSqlJsonB]
    public ComfyAgentSettings Settings { get; set; }

    public string? Downloading { get; set; }
    public string? Downloaded { get; set; }
    public string? DownloadFailed { get; set; }
    public string? Status { get; set; }
    public string? Logs { get; set; }
    public ResponseStatus? Error { get; set; }
    public DateTime? DevicePool { get; set; }

    [Ignore]
    public string ShortId => (DeviceId?[..4] ?? "").ToUpper();

    long updates;
    [Ignore] public long Updates => Interlocked.Read(ref updates);
    public void SetLastUpdate(DateTime? date=null)
    {
        Interlocked.Increment(ref updates);
        ModifiedDate = LastUpdate = date ?? DateTime.UtcNow;
    }

    [Ignore]
    public DateTime LastUpdate { get; set; }

    [Ignore]
    public Dictionary<string, NodeInfo> NodeDefs { get; set; }
    
    [Ignore]
    public List<string> RunningGenerationIds { get; set; } = [];
    
    [Ignore]
    public List<string> QueuedGenerationIds { get; set; } = [];

    [Ignore] 
    public HashSet<string> QueuedIds { get; set; } = [];
}

public class ComfyAgentSettings
{
    public bool? PreserveOutputs { get; set; }
}

public class NodeInfo
{
    // required/optional/hidden -> inputName -> definition
    [JsonPropertyName("input")] public Dictionary<string, Dictionary<string, NodeInputDefinition>>? Input { get; set; }

    [JsonPropertyName("input_order")] public NodeInputOrder? InputOrder { get; set; }

    [JsonPropertyName("name")] public string Name { get; set; } = ""; // Class type
    // Other properties like output, display_name, category are not strictly needed for prompt conversion

    public NodeInputDefinition? GetInput(string name)
    {
        if (Input == null)
            return null;
        foreach (var entry in Input)
        {
            if (entry.Value.TryGetValue(name, out var inputDef))
            {
                return inputDef;
            }
        }
        return null; 
    }
}

public class NodeInputOrder
{
    [JsonPropertyName("required")] public List<string>? Required { get; set; }

    [JsonPropertyName("optional")] public List<string>? Optional { get; set; }

    [JsonPropertyName("hidden")] public List<string>? Hidden { get; set; }

    // Combine all input names in order
    public List<string> GetAllInputNamesInOrder()
    {
        var names = new List<string>();
        if (Required != null) names.AddRange(Required);
        if (Optional != null) names.AddRange(Optional);
        if (Hidden != null) names.AddRange(Hidden);
        return names;
    }
}

public class NodeInputDefinition
{
    // In object_info.json, input definitions are arrays with two elements:
    // ["MODEL", {"tooltip": "..."}] or [["option1", "option2"], {"default": "option1"}]
    public ComfyInputType Type { get; set; }
    public Dictionary<string, object>? Options { get; set; }
    public string[]? EnumValues { get; set; }
    public Dictionary<string, object>? ComboValues { get; set; }
    // Special case for seed where it captures 2 widget_values, but is not included in the API prompt
    public bool? ControlAfterGenerate { get; set; }
}
