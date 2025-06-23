using System.Data;
using System.Net;
using System.Security.Claims;
using System.Text.RegularExpressions;
using MyApp.ServiceModel;
using ServiceStack;
using ServiceStack.OrmLite;
using ServiceStack.Text;
using ServiceStack.Web;

namespace MyApp.ServiceInterface;

public static partial class AppExtensions
{
    /// <summary>
    /// Validates that a relative path is safe and doesn't traverse outside the intended directory.
    /// </summary>
    /// <param name="basePath">The base directory path.</param>
    /// <param name="relativePath">The relative path to validate.</param>
    /// <returns>True if the path is safe, false otherwise.</returns>
    public static bool IsPathSafe(this string relativePath, string basePath)
    {
        try
        {
            // Normalize paths to handle different directory separators
            basePath = Path.GetFullPath(basePath);
            
            // Combine the base path with the relative path
            string fullPath = Path.GetFullPath(Path.Combine(basePath, relativePath));
            
            // Check if the resulting path starts with the base path
            return fullPath.StartsWith(basePath, StringComparison.OrdinalIgnoreCase);
        }
        catch (Exception ex) when (ex is ArgumentException or NotSupportedException or PathTooLongException)
        {
            // Path contains invalid characters or is in an invalid format
            return false;
        }
    }

    public static string GetObjectInfoPath(this string deviceId) => 
        deviceId.GetDevicePath().CombineWith("object_info.json");

    public static string GetDevicePath(this string deviceId) => 
        $"devices/{deviceId[..2]}/{deviceId}";
    
    public static Dictionary<string,object?> ParseAsObjectDictionary(this string json) => 
        (Dictionary<string,object?>)JSON.parse(json);
    public static int? GetUserId(this IRequest? req)
    {
        var user = req.GetClaimsPrincipal();
        return user.IsAuthenticated()
            ? user.GetUserId().ToInt()
            : null;
    }

    public static string GetRequiredUserId(this IRequest? req) => 
        req.GetClaimsPrincipal().GetUserId() ?? throw new ArgumentNullException("UserId");

    public static string AssertApiKeyUserId(this IRequest? req)
    {
        if (req.GetClaimsPrincipal().IsAdmin())
            return AppConfig.Instance.DefaultUserId;
        var apiKey = req.GetApiKey() as ApiKeysFeature.ApiKey
            ?? throw new HttpError(HttpStatusCode.Unauthorized, "Unauthorized");
        if (apiKey.UserId == null)
        {
            if (apiKey.HasScope(ServiceStack.Configuration.RoleNames.Admin))
                return AppConfig.Instance.DefaultUserId;
            throw new HttpError(HttpStatusCode.Unauthorized, "Unauthorized");
        }
        return apiKey.UserId;
    }

    public static string? GetNickName(this ClaimsPrincipal? principal) =>
        principal?.FindFirst(JwtClaimTypes.NickName)?.Value ?? principal.GetDisplayName();

    public static AssetType ToAssetType(this string ext) => ext switch
    {
        "jpg" or "jpeg" or "png" or "webp" or "gif" or "bmp" or "tiff" => AssetType.Image,
        "mp4" or "mov" or "webm" or "mkv" or "avi" or "wmv" or "ogg" => AssetType.Video,
        "mp3" or "aac" or "flac" or "wav" or "wma" => AssetType.Audio,
        "txt" or "md" or "json" => AssetType.Text,
        _ => AssetType.Binary,
    };
    
    public static Rating? ToAssetRating(this string? rating) => rating?.ToUpper() switch
    {
        "G" or "PG" => Rating.PG,
        "M" or "PG-13" or "PG13"=> Rating.PG13,
        "R" => Rating.R,
        "X" => Rating.X,
        "XXX" => Rating.XXX,
        _ => null,
    };
        
    public static Rating ToAssetRating(this IAssetMetadata asset, Rating? minRating)
    {
        if (minRating == Rating.XXX)
            return Rating.XXX;
        
        var ratings = new HashSet<Rating>
        {
            minRating ?? asset.Ratings?.PredictedRating.ToAssetRating() ?? Rating.PG
        };
        if (asset.Tags?.Count > 0)
        {
            foreach (var tag in asset.Tags)
            {
                foreach (var (rating, ratingWords) in AppData.Instance.TagRatings)
                {
                    if (ratingWords.Contains(tag.Key))
                    {
                        ratings.Add(rating);
                    }
                }
            }
        }
        if (asset.Objects?.Count > 0)
        {
            foreach (var obj in asset.Objects)
            {
                foreach (var (rating, ratingWords) in AppData.Instance.TagRatings)
                {
                    if (ratingWords.Contains(obj.Class))
                    {
                        ratings.Add(rating);
                    }
                }
            }
        }
        
        return ratings.GetMaxRating();
    }

    public static Rating GetMaxRating(this HashSet<Rating> ratings)
    {
        if (ratings.Contains(Rating.XXX))
            return Rating.XXX;
        if (ratings.Contains(Rating.X))
            return Rating.X;
        if (ratings.Contains(Rating.R))
            return Rating.R;
        if (ratings.Contains(Rating.M))
            return Rating.M;
        if (ratings.Contains(Rating.PG13))
            return Rating.PG13;
        return Rating.PG;
    }

    public static WorkflowGeneration AssertGeneration(this IDbConnection db, string generationId)
    {
        var gen = db.SingleById<WorkflowGeneration>(generationId);
        if (gen == null)
            throw HttpError.NotFound("Generation not found");
        return gen;
    }

    public static Artifact AssertArtifact(this IDbConnection db, int artifactId)
    {
        var artifact = db.SingleById<Artifact>(artifactId);
        if (artifact == null)
            throw HttpError.NotFound("Artifact not found");
        return artifact;
    }
    
    public static string AssertValidUser(this IRequest? req, string createdBy)
    {
        var userId = req.GetRequiredUserId();
        if (createdBy != userId && !req.GetClaimsPrincipal().IsAdmin())
            throw HttpError.Forbidden("Access denied");
        return userId;
    }

    public static readonly Rating[] DefaultRatings = [Rating.PG, Rating.PG13];
    public static Rating[] GetRatings(this Rating[]? ratings)
    {
        if (ratings == null || ratings.Length == 0)
            return DefaultRatings;
        return ratings;
    }

    public static ArtifactMetadata ToArtifactMetadata(this Artifact artifact) => new ArtifactMetadata
    {
        FileName = artifact.Url.LastRightPart('/'),
        Created = DateTime.UtcNow.ToUnixTimeMs(),
        Ratings = artifact.Ratings,
        Categories = artifact.Categories,
        Tags = artifact.Tags,
        Objects = artifact.Objects,
        Phash = artifact.Phash,
        Color = artifact.Color,
        Caption = artifact.Caption,
        Description = artifact.Description,
    };

}
