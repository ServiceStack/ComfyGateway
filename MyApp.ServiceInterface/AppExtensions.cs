using ServiceStack;

namespace MyApp.ServiceInterface;

public static class AppExtensions
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
}
