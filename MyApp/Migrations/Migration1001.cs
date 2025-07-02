using System.Runtime.Serialization;
using ServiceStack.DataAnnotations;
using ServiceStack.OrmLite;

namespace MyApp.Migrations;

public class Migration1001 : MigrationBase
{
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

    public class GpuInfo {}
    public class ComfyAgentSettings {}
    
    public override void Up()
    {
        Db.CreateTable<ComfyAgent>();
        Db.CreateTable<Asset>();
    }

    public override void Down()
    {
        Db.DropTable<Asset>();
        Db.DropTable<ComfyAgent>();
    }
}
