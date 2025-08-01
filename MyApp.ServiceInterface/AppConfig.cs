namespace MyApp;

public class AppConfig
{
    public static AppConfig Instance { get; } = new();
    public string AppName { get; set; } = "gateway";
    public string AppIcon { get; set; } = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 256 256'%3E%3Cpath fill='%23ffffff' d='M212 200a36 36 0 1 1-69.85-12.25l-53-34.05a36 36 0 1 1 0-51.4l53-34a36.09 36.09 0 1 1 8.67 13.45l-53 34.05a36 36 0 0 1 0 24.5l53 34.05A36 36 0 0 1 212 200'/%3E%3C/svg%3E";
    public string FeaturedTitle { get; set; } = "Welcome to Comfy";
    public string FeaturedSubTitle { get; set; } = "Explore AI generated creations";
    public string LocalBaseUrl { get; set; } = "https://localhost:5001";
    public string PublicBaseUrl { get; set; } = "https://my-app.org";
    public string AppDataPath { get; set; } = "App_Data";
    public string ArtifactsPath { get; set; } = "App_Data/artifacts";
    public string FilesPath { get; set; } = "App_Data/files";
    public string AssetsBaseUrl { get; set; } = "https://localhost:5001";
    public string VisualLanguageModel { get; set; } = "qwen2.5vl:7b";
    public string ChatLanguageModel { get; set; }
    public string? GitPagesBaseUrl { get; set; }

    public string DefaultUserName { get; set; } = "comfy";
    public string SystemUserId { get; set; } = "3DA81EB3-12FA-4012-986D-3D6B08765649";
    public string DefaultUserId { get; set; } = "5B3DF8CA-6AB3-4BEE-AAFC-8FB0C8DF349D";
    public string[] FeaturedUserIds { get; set; } = [];
    public string DefaultConnection { get; set; }
    public string TaskConnection { get; set; }

    public string? GoogleClientId { get; set; }
    public string? GoogleClientSecret { get; set; }
    public string? BunExePath { get; set; }
    
    public VueAppConfig ToVueAppConfig() => new() {
        AppName = AppName,
        AppIcon = AppIcon,
        FeaturedTitle = FeaturedTitle,
        FeaturedSubTitle = FeaturedSubTitle,
        PublicBaseUrl = PublicBaseUrl,
        SystemUserId = SystemUserId,
        FeaturedUserIds = FeaturedUserIds,
    };
}

public class VueAppConfig
{
    public string AppName { get; set; }
    public string AppIcon { get; set; }
    public string FeaturedTitle { get; set; }
    public string FeaturedSubTitle { get; set; }
    public string PublicBaseUrl { get; set; }
    public string SystemUserId { get; set; }
    public string[] FeaturedUserIds { get; set; } = [];
}