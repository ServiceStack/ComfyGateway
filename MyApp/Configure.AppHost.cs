using Microsoft.AspNetCore.Mvc.Rendering;
using MyApp.ServiceInterface;
using ServiceStack.Configuration;
using ServiceStack.Data;
using ServiceStack.IO;
using ServiceStack.NativeTypes.Python;
using ServiceStack.Text;

[assembly: HostingStartup(typeof(MyApp.AppHost))]

namespace MyApp;

public class AppHost() : AppHostBase("MyApp"), IHostingStartup
{
    public void Configure(IWebHostBuilder builder) => builder
        .ConfigureServices((context,services) => {
            // Configure ASP.NET Core IOC Dependencies
            context.Configuration.GetSection(nameof(AppConfig)).Bind(AppConfig.Instance);
            var appConfig = AppConfig.Instance;
            services.AddSingleton(appConfig);

            var artifactsPath = Environment.GetEnvironmentVariable("ARTIFACTS_PATH");
            if (artifactsPath != null)
                appConfig.ArtifactsPath = artifactsPath;

            services.AddSingleton<AppData>();
            services.AddSingleton(ComfyMetadata.Instance);
            services.AddSingleton<ComfyGateway>();
            
            // Optional: Enable Managed File Uploads: https://docs.servicestack.net/locode/files-overview
            var fileFs = new FileSystemVirtualFiles(context.HostingEnvironment.ContentRootPath);
            services.AddPlugin(new FilesUploadFeature(
                // User writable, public readable
                new UploadLocation("pub", 
                    fileFs,
                    readAccessRole: RoleNames.AllowAnon,
                    maxFileBytes: 10 * 1024 * 1024,
                    resolvePath:ctx => $"pub/{DateTime.UtcNow.ToUnixTime()}/{ctx.FileName}"),
                // User writable, User readable
                new UploadLocation("secure", 
                    fileFs,
                    maxFileBytes: 10 * 1024 * 1024,
                    resolvePath:ctx => $"/users/{ctx.UserAuthId}/{ctx.FileName}")
            ));

            PythonGenerator.TypeAliases[nameof(Object)] = "Any";
        })
        .ConfigureAppHost(afterConfigure: appHost =>
        {
            var services = appHost.GetApplicationServices();
            AppData.Instance = services.GetRequiredService<AppData>();
            using var db = services.GetRequiredService<IDbConnectionFactory>().OpenDbConnection();
            AppData.Instance.Reload(db);
        });

    public override void Configure()
    {
        AppConfig.Instance.GitPagesBaseUrl ??= ResolveGitBlobBaseUrl(ContentRootDirectory);
    }
    
    private string? ResolveGitBlobBaseUrl(IVirtualDirectory contentDir)
    {
        var srcDir = new DirectoryInfo(contentDir.RealPath);
        var gitConfig = new FileInfo(Path.Combine(srcDir.Parent!.FullName, ".git", "config"));
        if (gitConfig.Exists)
        {
            var txt = gitConfig.ReadAllText();
            var pos = txt.IndexOf("url = ", StringComparison.Ordinal);
            if (pos >= 0)
            {
                var url = txt[(pos + "url = ".Length)..].LeftPart(".git").LeftPart('\n').Trim();
                var gitBaseUrl = url.CombineWith($"blob/main/{srcDir.Name}");
                return gitBaseUrl;
            }
        }
        return null;
    }
}

public static class HtmlHelpers
{
    public static string ToAbsoluteContentUrl(string? relativePath) => HostContext.DebugMode 
        ? AppConfig.Instance.LocalBaseUrl.CombineWith(relativePath)
        : AppConfig.Instance.PublicBaseUrl.CombineWith(relativePath);
    public static string ToAbsoluteApiUrl(string? relativePath) => HostContext.DebugMode 
        ? AppConfig.Instance.LocalBaseUrl.CombineWith(relativePath)
        : AppConfig.Instance.PublicBaseUrl.CombineWith(relativePath);

    public static string ContentUrl(this IHtmlHelper html, string? relativePath) => ToAbsoluteContentUrl(relativePath); 
    public static string ApiUrl(this IHtmlHelper html, string? relativePath) => ToAbsoluteApiUrl(relativePath);
}
