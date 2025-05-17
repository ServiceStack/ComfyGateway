namespace MyApp;

public class AppConfig
{
    public static AppConfig Instance { get; } = new();
    public string ArtifactsPath { get; set; }
    public string LocalBaseUrl { get; set; }
    public string PublicBaseUrl { get; set; }
    public string? GitPagesBaseUrl { get; set; }
}