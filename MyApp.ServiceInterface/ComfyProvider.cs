using System.Runtime.Serialization;
using MyApp.ServiceModel;
using ServiceStack;
using ServiceStack.DataAnnotations;

namespace MyApp.ServiceInterface;

/*
- http://localhost:7860/api/object_info
  - UNETLoader/input/required/unet_name              = unet models
  - VAELoader/input/required/vae_name                = vae models
  - CLIPLoader/input/required/clip_name              = clip models
  - CLIPVisionLoader/input/required/clip_name        = clip vision models
  - LoraLoader/input/required/lora_name              = lora models
  - UpscaleModelLoader/input/required/model_name     = upscale models
  - ControlNetLoader/input/required/control_net_name = control nets
  - StyleModelLoader/input/required/style_model_name = style moders
  - PhotoMakerLoader/input/required/photomaker_model_name = PhotoMakers
  - GLIGENLoader/input/required/gligen_name          = GLIGENs
  - AssetDownloader/input/required/save_to           = model folders + sub folder
 */

[Icon(Svg = Icons.MediaProvider)]
public class ComfyAgent
{
    [AutoIncrement] public int Id { get; set; }
    [Index]
    public string DeviceId { get; set; }
    [Index]
    public string UserId { get; set; }
    public string? UserName { get; set; }
    public string ApiKey { get; set; }
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
    public bool Enabled { get; set; }
    public DateTime? OfflineDate { get; set; }
    public DateTime CreatedDate { get; set; }
    public DateTime ModifiedDate { get; set; }
    
    public int Credits { get; set; }
    public int WorkflowsExecuted { get; set; }
    public int ImagesGenerated { get; set; }
    public int AudiosGenerated { get; set; }
    public int VideosGenerated { get; set; }
    public int TextsGenerated { get; set; }
    
    [Ignore]
    public Dictionary<string, NodeInfo> NodeDefs { get; set; }
    
    [Ignore]
    public ComfyWorkflowInfo WorkflowInfo { get; set; }
}

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
