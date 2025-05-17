using System.Collections.Concurrent;
using System.Data;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using ServiceStack;
using ServiceStack.OrmLite;

namespace MyApp.ServiceInterface;

public class AppData(ILogger<AppData> log, IHostEnvironment env)
{
    public static AppData Instance { get; set; }
    public string ContentRootPath => env.ContentRootPath;
    public string WebRootPath => env.ContentRootPath.CombineWith("wwwroot");

    public ConcurrentDictionary<int, ComfyAgent> ComfyAgents { get; set; } = new();
    public List<Asset> Assets { get; set; } = [];

    public string? ReadTextFile(string path)
    {
        var fullPath  = Path.Combine(env.ContentRootPath, path);
        return File.Exists(fullPath)
            ? File.ReadAllText(fullPath)
            : null;
    }

    public void WriteTextFile(string path, string contents)
    { 
        var fullPath  = Path.Combine(env.ContentRootPath, path);
        Path.GetDirectoryName(fullPath).AssertDir();
        File.WriteAllText(fullPath, contents);
    }

    public async Task WriteAppDataTextFileAsync(string path, string contents)
    {
        var fullPath  = Path.Combine(env.ContentRootPath, "App_Data", path);
        Path.GetDirectoryName(fullPath).AssertDir();
        await File.WriteAllTextAsync(fullPath, contents);
    }
    
    public void RegisterComfyAgent(ComfyAgent agent)
    {
        ComfyAgents[agent.Id] = agent;
    }

    public void Reload(IDbConnection db)
    {
        var assets = db.Select<Asset>();
        var assetUrls = new Dictionary<string, Asset>();
        var assetPaths = new Dictionary<string, Asset>();
        var count = 0;
        foreach (var asset in assets)
        {
            assetUrls[asset.Url] = asset;
            assetPaths[asset.SavePath.CombineWith(asset.FileName)] = asset;
        }

        void AddModel(Asset model)
        {
            if (string.IsNullOrEmpty(model.FileName))
            {
                log.LogWarning("Asset has no Filename: {Url}", model.Url);
                return;
            }
            if (string.IsNullOrEmpty(model.Url))
            {
                log.LogWarning("Asset has no URL: {Filename}", model.FileName);
                return;
            }
            if (string.IsNullOrEmpty(model.SavePath))
            {
                log.LogWarning("Asset has no SavePath: {Url}", model.Url);
                return;
            }
            
            if (assetUrls.TryGetValue(model.Url, out _))
                return;
            if (assetPaths.TryGetValue(model.SavePath.CombineWith(model.FileName), out _))
                return;

            if (model.Type == "")
                model.Type = null;
            if (model.Base == "")
                model.Base = null;
            if (model.Description == "")
                model.Description = null;
            if (model.Reference == "")
                model.Reference = null;
            if (model.Size == "")
                model.Size = null;
            if (model.Hash == "")
                model.Hash = null;
            
            if (string.IsNullOrEmpty(model.Type))
            {
                model.Type = model.SavePath.LeftPart('/');
            }
            if (string.IsNullOrEmpty(model.Name))
            {
                model.Name = StringFormatters.FormatName(model.FileName).LastLeftPart('.');
            }
            if (model.Length == 0 && !string.IsNullOrEmpty(model.Size))
            {
                if (model.Size.EndsWith('K') || model.Size.EndsWith('M') || 
                    model.Size.EndsWith('G') || model.Size.EndsWith('T'))
                    model.Size += "B";
                model.Length = StringFormatters.HumanSizeToBytes(model.Size);
            }

            model.Id = (int) db.Insert(model, selectIdentity: true);
            count++;
            assets.Add(model);
            assetUrls[model.Url] = model;
            assetPaths[model.SavePath.CombineWith(model.FileName)] = model;
        }
        
        var comfyManagerAssets = ReadTextFile("wwwroot/data/assets.json").FromJson<List<Asset>>();
        if (comfyManagerAssets != null)
        {
            foreach (var model in comfyManagerAssets)
            {
                AddModel(model);
            }
        }
        var assetDownloaderAssets = ReadTextFile("App_Data/overrides/assets.json").FromJson<List<Asset>>();
        if (assetDownloaderAssets != null)
        {
            foreach (var model in assetDownloaderAssets)
            {
                AddModel(model);
            }
        }

        log.LogInformation("Loaded {Count} New Assets, Total {Total} Assets", count, assets.Count);
        Assets = assets;
    }
}

