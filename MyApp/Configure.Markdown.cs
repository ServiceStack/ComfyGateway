using ServiceStack.IO;

[assembly: HostingStartup(typeof(MyApp.ConfigureMarkdown))]

namespace MyApp;

public class ConfigureMarkdown : IHostingStartup
{
    public void Configure(IWebHostBuilder builder) => builder
        .ConfigureServices(services => {
            services.AddSingleton<MarkdownIncludes>();
            services.AddSingleton<MarkdownPages>();
            services.AddSingleton<MarkdownBlog>();
            services.AddSingleton<MarkdownMeta>();
        })
        .ConfigureAppHost(afterPluginsLoaded: appHost => {
            MarkdigConfig.Set(new MarkdigConfig
            {
                ConfigurePipeline = pipeline =>
                {
                    // Extend Markdig Pipeline
                },
                ConfigureContainers = config =>
                {
                    config.AddBuiltInContainers();
                    // Add Custom Block or Inline containers
                }
            });

            var includes = appHost.Resolve<MarkdownIncludes>();
            var pages = appHost.Resolve<MarkdownPages>();
            var blogPosts = appHost.Resolve<MarkdownBlog>();
            var meta = appHost.Resolve<MarkdownMeta>();

            meta.Features = [pages, blogPosts];
            
            includes.LoadFrom("_includes");
            pages.LoadFrom("_pages");
            blogPosts.LoadFrom("_posts");
        });
}

// Add additional frontmatter info to include
public class MarkdownFileInfo : MarkdownFileBase
{
}
