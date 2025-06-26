using System.Collections.Concurrent;
using System.Data;
using Microsoft.Extensions.Logging;
using MyApp.ServiceInterface.Commands;
using MyApp.ServiceModel;
using ServiceStack;
using ServiceStack.Data;
using ServiceStack.OrmLite;

namespace MyApp.ServiceInterface;

public class AgentEventsManager(ILogger<AgentEventsManager> log, IDbConnectionFactory dbFactory, AppData appData)
{
    // clientId => deviceId
    private ConcurrentDictionary<string, string> pendingGenerations = new(); 
    
    private readonly ConcurrentDictionary<string, BlockingCollection<AgentEvent>> agentTaskQueues = new();

    public List<ComfyAgent> GetComfyAgents(ComfyAgentQuery options = default)
    {
        if (options.DeviceId != null)
        {
            appData.ComfyAgents.TryGetValue(options.DeviceId, out var agent);
            return agent != null ? [agent] : [];
        }

        var candidates = new List<ComfyAgent>();
        if (options.UserId != null)
        {
            candidates.AddRange(appData.ComfyAgents.Values.Where(x => x.UserId == options.UserId));
        }

        if (candidates.Count == 0)
        {
            log.LogWarning("No ComfyAgents found for user {UserId}, total {Total} agents online", 
                options.UserId, appData.ComfyAgents.Count);
            candidates = appData.ComfyAgents.Values.ToList();
        }
        
        var ret = candidates
            .OrderBy(x => x.QueueCount)
            .ThenByDescending(x => x.LastUpdate)
            .ToList();

        if (options.LanguageModel != null)
        {
            var agentEventCounts = GetAgentEventsCount();
            return ret.Where(x => x.LanguageModels?.Contains(options.LanguageModel) == true)
                .OrderBy(x => agentEventCounts.GetValueOrDefault(x.DeviceId, 0))
                .ToList();
            
        }
        
        return ret;
    }
    
    IEnumerable<string> KeysWithoutLock()
    {
        foreach (var item in agentTaskQueues)
        {
            yield return item.Key;
        }
    }
    public List<string> GetConnectedDeviceIds() => KeysWithoutLock().ToList();

    public long GenerationRequest = 0;
    public void SignalGenerationRequest() => Interlocked.Increment(ref GenerationRequest);

    public long GenerationUpdates = 0;
    public void SignalGenerationUpdated() => Interlocked.Increment(ref GenerationUpdates);

    public async Task<bool> WaitForUpdatedGenerationAsync(int timeoutMs)
    {
        var startedAt = DateTime.UtcNow;
        var originalGenerations = Interlocked.Read(ref GenerationUpdates);
        do
        {
            if (Interlocked.Read(ref GenerationUpdates) != originalGenerations)
                return true;
            await Task.Delay(100);
        } while ((DateTime.UtcNow - startedAt).TotalMilliseconds < timeoutMs);
        return false;
    }

    public void Enqueue(string deviceId, AgentEvent msg)
    {
        if (string.IsNullOrEmpty(deviceId))
            throw new ArgumentNullException(nameof(deviceId));
        if (msg == null)
            throw new ArgumentNullException(nameof(msg));

        if (agentTaskQueues.TryGetValue(deviceId, out var queue))
        {
            queue.Add(msg);
        }
        else
        {
            throw HttpError.NotFound("Device is offline");
        }
    }

    public Dictionary<string, int> GetAgentEventsCount()
    {
        var to = new Dictionary<string, int>();
        foreach (var entry in agentTaskQueues)
        {
            to[entry.Key] = entry.Value.Count;
        }
        return to;
    }

    public List<AgentEvent> GetAllAgentEvents()
    {
        return agentTaskQueues
            .SelectMany(entry => entry.Value)
            .ToList();
    }
    
    public BlockingCollection<AgentEvent> GetAgentEvents(string deviceId)
    {
        if (string.IsNullOrEmpty(deviceId))
            throw new ArgumentNullException(nameof(deviceId));

        if (!agentTaskQueues.TryGetValue(deviceId, out var queue))
        {
            queue = new BlockingCollection<AgentEvent>();
            agentTaskQueues.TryAdd(deviceId, queue);
        }
 
        return queue;
    }
    
    public async Task<List<AgentEvent>> WaitForAgentEventsAsync(IDbConnection db, ComfyAgent agent, string userId, int timeoutMs, CancellationToken token=default)
    {
        var ret = new List<AgentEvent>();
        var startedAt = DateTime.UtcNow;
        var agentEvents = GetAgentEvents(agent.DeviceId);
        var originalGenerations = Interlocked.Read(ref GenerationRequest);
        do
        {
            // Check if a new generation was created for this device since we last checked
            if (Interlocked.Read(ref GenerationRequest) != originalGenerations)
            {
                var nextGenerations = appData.GetNextGenerations(db, agent, userId, take: 1);
                if (nextGenerations.Count > 0)
                {
                    log.LogInformation("WaitForAgentEventsAsync: {DeviceId} - {Count} new generations", agent.DeviceId, nextGenerations.Count);
                    return nextGenerations.Map(x => x.ToExecWorkflow());
                }
                originalGenerations = Interlocked.Read(ref GenerationRequest);
            }
            
            // Check if there are any pending events for this agent
            if (agentEvents.TryTake(out var msg))
            {
                ret.Add(msg);
                return ret;
            }
            await Task.Delay(100, token);
            if (token.IsCancellationRequested)
                break;
        } while ((DateTime.UtcNow - startedAt).TotalMilliseconds < timeoutMs);
        return ret;
    }
    
    public ConcurrentDictionary<long, IAiTask> AiTasks = new();

    public OllamaGenerateTask AddCaptionArtifactTask(IDbConnection dbTasks, Artifact artifact, string userId, string? model=null)
    {
        model ??= appData.Config.VisualLanguageModel;
        var artifactPath = appData.GetArtifactPath(artifact.Url.LastRightPart('/'));
        var task = AddOllamaGenerateTask(dbTasks, new OllamaGenerateTask {
            Model = model,
            Task = ServiceModel.AiTasks.CaptionImage,
            TaskId = $"{artifact.Id}",
            Request = new() {
                Model = model,
                Prompt = "A caption of this image: ",
                Images = [artifactPath], // Needs to be converted to base64 before execution
                Stream = false,
            },
            Callback = nameof(CaptionImageCommand),
        }.WithAudit(userId, DateTime.UtcNow));
        return task;
    }

    public OllamaGenerateTask AddDescribeArtifactTask(IDbConnection dbTasks, Artifact artifact, string userId, string? model=null)
    {
        model ??= appData.Config.VisualLanguageModel;
        var artifactPath = appData.GetArtifactPath(artifact.Url.LastRightPart('/'));
        var task = AddOllamaGenerateTask(dbTasks, new OllamaGenerateTask {
            Model = model,
            Task = ServiceModel.AiTasks.DescribeImage,
            TaskId = $"{artifact.Id}",
            Request = new() {
                Model = model,
                Prompt = "A detailed description of this image: ",
                Images = [artifactPath], // Needs to be converted to base64 before execution
                Stream = false,
            },
            Callback = nameof(DescribeImageCommand),
        }.WithAudit(userId, DateTime.UtcNow));
        return task;
    }

    public OllamaGenerateTask AddOllamaGenerateTask(IDbConnection db, OllamaGenerateTask task)
    {
        task.Id = PreciseTimestamp.UniqueUtcNowTicks;
        task.RefId ??= Guid.NewGuid().ToString("N");
        task.ReplyTo = $"/api/{nameof(CompleteOllamaGenerateTask)}".AddQueryParam("taskId", task.Id);
        db.Insert(task);
        AiTasks[task.Id] = task;
        return task;
    }

    public OpenAiChatTask AddOpenAiPromptTask(IDbConnection dbTasks, string userId, string prompt, string? systemPrompt=null, string? model=null)
    {
        model ??= appData.Config.ChatLanguageModel;
        List<OpenAiMessage> messages = [];
        if (!string.IsNullOrEmpty(systemPrompt))
            messages.Add(new() { Role = "system", Content = systemPrompt });
        messages.Add(new() { Role = "user", Content = prompt });
        var task = AddOpenAiChatTask(dbTasks, new OpenAiChatTask {
            Model = model,
            Task = ServiceModel.AiTasks.OpenAiChat,
            Request = new() {
                Model = model,
                Messages = messages,
                Stream = false,
            },
        }.WithAudit(userId, DateTime.UtcNow));
        return task;
    }

    public OpenAiChatTask AddOpenAiChatTask(IDbConnection db, OpenAiChatTask task)
    {
        task.Id = PreciseTimestamp.UniqueUtcNowTicks;
        task.RefId ??= Guid.NewGuid().ToString("N");
        task.ReplyTo = $"/api/{nameof(CompleteOpenAiChatTask)}".AddQueryParam("taskId", task.Id);
        db.Insert(task);
        AiTasks[task.Id] = task;
        return task;
    }

    public List<AgentEvent> GetNextAiTasks(IDbConnection db, ComfyAgent agent, string userId, int take)
    {
        var ret = new List<AgentEvent>();

        if (agent.LanguageModels?.Count > 0 && AiTasks.Count > 0)
        {
            using var dbTasks = appData.OpenAiTaskDb();
        
            var pendingTasks = AiTasks.Values.AsEnumerable()
                .Where(x => (x.DeviceId == null || x.DeviceId == agent.DeviceId)
                    && agent.LanguageModels.Contains(x.Model))
                .OrderBy(x => x.Id);
            
            foreach (var task in pendingTasks)
            {
                if (task is OllamaGenerateTask)
                {
                    var assignTask = dbTasks.UpdateOnly(() => new OllamaGenerateTask
                    {
                        State = TaskState.Assigned,
                        Status = GenerationStatus.AssignedToAgent,
                        DeviceId = agent.DeviceId,
                        UserId = userId,
                    }, x => x.Id == task.Id && x.State == TaskState.Queued
                        && (x.DeviceId == null || x.DeviceId == agent.DeviceId));

                    if (assignTask == 0)
                    {
                        if (!dbTasks.Exists<OllamaGenerateTask>(x => x.Id == task.Id && x.State == TaskState.Queued))
                        {
                            log.LogWarning("Task {Id} was no longer queued, removing from queue", task.Id);
                            AiTasks.TryRemove(task.Id, out _);
                        }
                        continue;
                    }
                    
                    ret.Add(new AgentEvent
                    {
                        Name = EventMessages.ExecOllama,
                        Args = new() {
                            ["model"] = task.Model,
                            ["endpoint"] = "/api/generate",
                            ["request"] = $"/api/{nameof(GetOllamaGenerateTask)}".AddQueryParam("taskId", task.Id),
                            ["replyTo"] = task.ReplyTo,
                        }
                    });
                }
                else if (task is OpenAiChatTask)
                {
                    var assignTask = dbTasks.UpdateOnly(() => new OpenAiChatTask
                    {
                        State = TaskState.Assigned,
                        Status = GenerationStatus.AssignedToAgent,
                        DeviceId = agent.DeviceId,
                        UserId = userId,
                    }, x => x.Id == task.Id && x.State == TaskState.Queued
                        && (x.DeviceId == null || x.DeviceId == agent.DeviceId));

                    if (assignTask == 0)
                    {
                        if (!dbTasks.Exists<OpenAiChatTask>(x => x.Id == task.Id && x.State == TaskState.Queued))
                        {
                            log.LogWarning("Task {Id} was no longer queued, removing from queue", task.Id);
                            AiTasks.TryRemove(task.Id, out _);
                        }
                        continue;
                    }
                    
                    ret.Add(new AgentEvent
                    {
                        Name = EventMessages.ExecOllama,
                        Args = new() {
                            ["model"] = task.Model,
                            ["endpoint"] = "/v1/chat/completions",
                            ["request"] = $"/api/{nameof(GetOpenAiChatTask)}".AddQueryParam("taskId", task.Id),
                            ["replyTo"] = task.ReplyTo,
                        }
                    });
                }
                
                if (ret.Count >= take)
                    break;
            }
        }
        
        return ret;
    }

    private static List<OllamaGenerateTask> GetPendingOllamaGenerateTasks(IDbConnection dbTasks, ComfyAgent agent)
    {
        var pendingTasks = dbTasks.Select(dbTasks.From<OllamaGenerateTask>()
            .Where(x => x.State == TaskState.Queued
                        && (x.DeviceId == null || x.DeviceId == agent.DeviceId)
                        && agent.LanguageModels.Contains(x.Model))
            .OrderBy(x => x.Id));
        return pendingTasks;
    }

    public void Reload()
    {
        AiTasks.Clear();
        using var dbTasks = appData.OpenAiTaskDb();
        var pendingOllamaGenerateTasks = dbTasks
            .Select(dbTasks.From<OllamaGenerateTask>()
            .Where(x => x.State == TaskState.Queued));
        foreach (var task in pendingOllamaGenerateTasks)
        {
            AiTasks[task.Id] = task;
        }
        
        var pendingOpenAiChatTasks = dbTasks
            .Select(dbTasks.From<OpenAiChatTask>()
                .Where(x => x.State == TaskState.Queued));
        foreach (var task in pendingOpenAiChatTasks)
        {
            AiTasks[task.Id] = task;
        }
        
        log.LogInformation("Reloaded {Count} pending tasks (generate {OllamaGenerateTasks}, chat {OpenAiChatTasks})", 
            AiTasks.Count, pendingOllamaGenerateTasks.Count, pendingOpenAiChatTasks.Count);
    }

    public void RemoveAgent(string deviceId)
    {
        agentTaskQueues.TryRemove(deviceId, out _);
    }
}

// https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events
public class ServerEvent
{
    /// <summary>
    /// The event ID to set the EventSource object's last event ID value.
    /// </summary>
    public int? Id { get; set; }
    
    /// <summary>
    /// A string identifying the type of event described. If this is specified, an event will be dispatched
    /// on the browser to the listener for the specified event name;
    /// the website source code should use addEventListener() to listen for named events.
    /// The onmessage handler is called if no event name is specified for a message.
    /// </summary>
    public string? Event { get; set; }
    
    /// <summary>
    /// The data field for the message.
    /// When the EventSource receives multiple consecutive lines that begin with data:, it concatenates them,
    /// inserting a newline character between each one. Trailing newlines are removed.
    /// </summary>
    public object? Data { get; set; }
    
    /// <summary>
    /// The reconnection time. If the connection to the server is lost,
    /// the browser will wait for the specified time before attempting to reconnect.
    /// This must be an integer, specifying the reconnection time in milliseconds.
    /// If a non-integer value is specified, the field is ignored.
    /// </summary>
    public int? Retry { get; set; }
}
