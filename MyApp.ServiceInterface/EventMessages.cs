using MyApp.ServiceModel;

namespace MyApp.ServiceInterface;

public static class EventMessages
{
    public const string Register = nameof(Register);
    public const string CaptionImage = nameof(CaptionImage);
    public const string ExecWorkflow = nameof(ExecWorkflow);
    public const string InstallPipPackage = nameof(InstallPipPackage);
    public const string InstallCustomNode = nameof(InstallCustomNode);
    public const string DownloadModel = nameof(DownloadModel);
    public const string Reboot = nameof(Reboot);
    public const string ExecOllama = nameof(ExecOllama);
    
    public static AgentEvent ToExecWorkflow(this WorkflowGeneration generation)
    {
        return new AgentEvent
        {
            Name = ExecWorkflow,
            Args = new() {
                ["url"] = Routes.GetGenerationApiPrompt(generation.Id),
            }
        };
    }
}
