using ServiceStack;

namespace MyApp.ServiceModel;

[Tag(Tags.Devices)]
public class QueryAssets : QueryDb<Asset>
{
    [Input(Type = "tag"), FieldCss(Field = "col-span-12")]
    public List<string> FileNames { get; set; }
    public string? Name { get; set; }
    public string? Type { get; set; }
    public string? Url { get; set; }
}

[Tag(Tags.Devices)]
public class FindAssets : IGet, IReturn<FindAssetsResponse> 
{
    [Input(Type = "tag"), FieldCss(Field = "col-span-12")]
    public List<string> Assets { get; set; }
}
public class FindAssetsResponse
{
    public Dictionary<string, string> Results { get; set; } = new();
    public ResponseStatus? ResponseStatus { get; set; }
}


[Tag(Tags.Devices)]
public class FindCustomNodes : IGet, IReturn<FindCustomNodesResponse> 
{
    [Input(Type = "tag"), FieldCss(Field = "col-span-12")]
    public List<string> Types { get; set; }
}
public class FindCustomNodesResponse
{
    public Dictionary<string, string> Results { get; set; } = new();
    public ResponseStatus? ResponseStatus { get; set; }
}

[Tag(Tags.Devices)]
[ValidateIsAuthenticated]
public class InstallPipPackage : IPost, IReturn<StringResponse>
{
    [ValidateNotEmpty, ValidateExactLength(32)]
    public string DeviceId { get; set; }
    [ValidateNotEmpty]
    public string Package { get; set; }
    public bool? Require { get; set; }
}

[Tag(Tags.Devices)]
[ValidateIsAuthenticated]
public class InstallCustomNode : IPost, IReturn<StringResponse>
{
    [ValidateNotEmpty, ValidateExactLength(32)]
    public string DeviceId { get; set; }
    [ValidateNotEmpty]
    public string Url { get; set; }
    public bool? Require { get; set; }
}

[Tag(Tags.Devices)]
[ValidateIsAuthenticated]
public class InstallModel : IPost, IReturn<StringResponse>
{
    [ValidateNotEmpty, ValidateExactLength(32)]
    public string DeviceId { get; set; }
    
    [ValidateNotEmpty]
    public string SaveTo { get; set; }

    [ValidateNotEmpty]
    public string Url { get; set; }

    public string? Token { get; set; }
    public bool? Require { get; set; }
}


[Tag(Tags.Devices)]
[ValidateIsAuthenticated]
public class RebootAgent : IPost, IReturn<StringResponse>
{
    [ValidateNotEmpty, ValidateExactLength(32)]
    public string DeviceId { get; set; }
}

[Tag(Tags.Devices)]
[ValidateIsAuthenticated]
public class GetDeviceStatus : IGet, IReturn<GetDeviceStatusResponse>
{
    [ValidateNotEmpty, ValidateExactLength(32)]
    public string DeviceId { get; set; }
    public bool? Poll { get; set; }
    public string? StatusChanged { get; set; }
}
public class GetDeviceStatusResponse
{
    public string DeviceId { get; set; }
    public DateTime ModifiedDate { get; set; }
    public List<string>? RequirePip { get; set; }
    public List<string>? RequireNodes { get; set; }
    public List<string>? RequireModels { get; set; }
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

    public string? Downloading { get; set; }
    public string? Downloaded { get; set; }
    public string? DownloadFailed { get; set; }
    public string? Status { get; set; }
    public string? Logs { get; set; }
    public ResponseStatus? Error { get; set; }

    public ResponseStatus? ResponseStatus { get; set; }
}
