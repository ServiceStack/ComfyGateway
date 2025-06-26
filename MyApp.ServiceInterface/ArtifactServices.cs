using System.Data;
using Microsoft.Extensions.Logging;
using MyApp.ServiceModel;
using ServiceStack;
using ServiceStack.Data;
using ServiceStack.OrmLite;

namespace MyApp.ServiceInterface;

public record ArtifactInfo(int ArtifactId, string GenerationId, string? Phash, string? Color, string? Description);

public class ArtifactServices(
    ILogger<ArtifactServices> log, 
    AppData appData, 
    AgentEventsManager agentEvents) : Service
{
    public async Task<object> Get(QueryArtifacts request)
    {
        if (request.Id > 0)
        {
            var artifact = await Db.SingleByIdAsync<Artifact>(request.Id);
            return new QueryResponse<Artifact> {
                Results = artifact != null ? [artifact] : []
            };
        }
        
        var q = Db.From<Artifact>(Db.TableAlias("a"));
        if (request.Category != null)
        {
            var category = appData.GetCategory(request.Category);
            if (category != null)
            {
                q.Join<ArtifactCategory>((a, ac) => a.Id == ac.ArtifactId && ac.CategoryId == category.Id);
            }
            else
            {
                log.LogWarning("Unknown category {Category}", request.Category);
            }
        }
        if (request.Tag != null)
        {
            var tag = appData.GetTag(request.Tag);
            if (tag != null)
            {
                q.Join<ArtifactTag>((a, at) => a.Id == at.ArtifactId && at.TagId == tag.Id);
            }
            else
            {
                log.LogWarning("Unknown tag {Tag}", request.Tag);
            }
        }
        if (request.VersionId != null)
        {
            q.Where(x => x.VersionId == request.VersionId);
        }

        if (request.UserId != null)
        {
            q.Where(x => x.CreatedBy == request.UserId);
        }
        if (request.Similar != null)
        {
            var info = Db.Single<ArtifactInfo>(
                Db.From<Artifact>()
                .Join<WorkflowGeneration>((a,wg) => a.GenerationId == wg.Id)
                .Where(x => x.Id == request.Similar)
                .Select<Artifact,WorkflowGeneration>((a, g) => 
                    new { a.Id, a.GenerationId, a.Phash, a.Color, g.Description }));

            if (info is { Description: not null, Color: not null })
            {
                var matchingGenerationIds = Db.From<WorkflowGeneration>()
                    .Where(x => x.Description == info.Description)
                    .Select(x => x.Id);
                q.Where(x => Sql.In(x.GenerationId, matchingGenerationIds)
                    || Sql.Custom<int>($"bgcompare('{info.Color}',a.\"Color\")") <= 3
                    || Sql.Custom<int>("hamming_distance_hex(\"Phash\", {0})") <= 20, info.Phash);
                q.OrderByDescending($"hamming_distance_hex(\"Phash\", {q.Params.Last().ParameterName})");
            }
        }

        q.Where(x => x.PublishedDate != null);
        if (request.Rating != null)
        {
            q.Where(x => x.Rating == request.Rating);
        }
        if (request.Ratings != null)
        {
            q.Where(x => request.Ratings.Contains(x.Rating!.Value));
        }

        var userId = Request.GetClaimsPrincipal().GetUserId();
        if (userId != null)
        {
            q.WhereNotExists(Db.From<HiddenArtifact>()
                .Where<Artifact,HiddenArtifact>((a,ha) => 
                    ha.ArtifactId == Sql.TableAlias(a.Id, "a"))
                .And(ha => ha.UserId == userId));
        }
        if (!string.IsNullOrEmpty(request.Search))
        {
            var search = request.Search ?? "";
            search = search.Replace("\"", ""); // escape
            if (search.EndsWith('s')) // allow wildcard search to match on both
                search = Words.Singularize(search);
            q.UnsafeWhere("a.ts @@ websearch_to_tsquery('english', {0})", search);
            q.UnsafeOrderBy($"ts_rank(a.ts, websearch_to_tsquery('english', {q.Params.Last().ParameterName})) DESC");
        }
        
        if (request.Search == null && request.Similar == null)
        {
            if (!string.IsNullOrEmpty(request.OrderBy))
            {
                q.OrderByFields(request.OrderBy);
            }
            else if (!string.IsNullOrEmpty(request.OrderByDesc))
            {
                q.OrderByFieldsDescending(request.OrderByDesc);
            }
            else
            {
                q.OrderByDescending(x => x.PublishedDate);
            }
        }
        q.Limit(request.Skip, request.Take);
        
        var artifacts = await Db.SelectAsync(q);
        return new QueryResponse<Artifact>
        {
            Offset = request.Skip.GetValueOrDefault(),
            Results = artifacts
        };
    }

    public object Any(PublishGeneration request)
    {
        var gen = Db.AssertGeneration(request.Id);
        var userId = Request.AssertValidUser(gen.CreatedBy);
        var now = DateTime.UtcNow;
        
        Db.UpdateOnly(() => new WorkflowGeneration {
            PublishedBy = userId,
            PublishedDate = now,
            ModifiedBy = userId,
            ModifiedDate = now,
        }, where:x => x.Id == request.Id);

        if (gen.PosterImage != null)
        {
            Db.UpdateOnly(() => new Artifact {
                PublishedBy = userId,
                PublishedDate = now,
                ModifiedBy = userId,
                ModifiedDate = now,
            }, where:x => x.GenerationId == request.Id && x.Url == gen.PosterImage);
        }

        // Publish Tags and Categories for all Generation Artifacts
        using var dbTasks = appData.OpenAiTaskDb();
        var genArtifacts = Db.Select<Artifact>(x => x.GenerationId == request.Id);
        foreach (var artifact in genArtifacts)
        {
            // Ignore if has existing categories
            if (artifact.Categories?.Count > 0 && !Db.Exists<ArtifactCategory>(x => x.ArtifactId == artifact.Id))
            {
                Db.InsertArtifactCategories(artifact, appData);
            }

            // Ignore if has existing tags
            if (artifact.Tags?.Count > 0 && !Db.Exists<ArtifactTag>(x => x.ArtifactId == artifact.Id))
            {
                Db.InsertArtifactTags(artifact, appData);
            }

            agentEvents.AddCaptionArtifactTask(dbTasks, artifact, userId);
            agentEvents.AddDescribeArtifactTask(dbTasks, artifact, userId);
        }
        
        return new EmptyResponse();
    }

    public object Any(ModerateArtifact request)
    {
        var artifact = Db.AssertArtifact(request.Id);

        var now = DateTime.UtcNow;
        var userId = Request.GetRequiredUserId();
        var isAdmin = Request.GetClaimsPrincipal().IsAdmin();
        if (userId != artifact.CreatedBy || !isAdmin)
            throw HttpError.Forbidden("You cannot moderate this Artifact");

        if (!isAdmin && artifact.PublishedDate != null && request.Rating != null)
        {
            Db.Insert(new ModerationQueue
            {
                ArtifactId = request.Id,
                Rating = request.Rating,
                CreatedBy = userId,
                CreatedDate = now,
                ModifiedBy = userId,
                ModifiedDate = now,
            });
            throw HttpError.Conflict("This rating change on a published artifact has been added to the moderation queue.");
        }
        
        artifact.Rating ??= request.Rating;
        
        // Update the rating
        Db.UpdateOnly(() => new Artifact {
                Rating = artifact.Rating, 
                ModifiedBy = userId,
                ModifiedDate = now,
            },
            where: x => x.Id == request.Id);

        log.LogInformation("Updated artifact {Id} rating to {Rating}", request.Id, request.Rating);
        return new EmptyResponse();
    }

    public object Any(SubmitArtifactModeration request)
    {
        var artifact = Db.AssertArtifact(request.ArtifactId);

        var now = DateTime.UtcNow;
        var userId = Request.GetRequiredUserId();

        // If Admin, immediately approve changes
        if (Request.GetClaimsPrincipal().IsAdmin()
            && (request.PoorQuality > 0 || request.Rating != null))
        {
            if (request.PoorQuality > 0)
            {
                appData.DeleteArtifact(Db, artifact);
                artifact.DeletedBy = userId;
                artifact.DeletedDate = now;
                return artifact;
            }
            if (request.Rating != null)
            {
                ComfyAssetOutput? asset = null;
                var generation = Db.SingleById<WorkflowGeneration>(artifact.GenerationId);
                asset = generation?.Result?.Assets?.Find(x => x.Url == artifact.Url);
                if (asset != null)
                {
                    asset.Rating = request.Rating;
                }
                
                Db.UpdateOnly(() => new Artifact
                {
                    Rating = request.Rating,
                    ModifiedDate = now,
                    ModifiedBy = userId,
                }, where: x => x.Id == request.ArtifactId);
                
                if (generation != null && asset != null)
                {
                    Db.UpdateOnly(() => new WorkflowGeneration {
                        Result = generation.Result,
                        ModifiedBy = userId,
                        ModifiedDate = now,
                    }, where:x => x.Id == artifact.GenerationId);
                }
                log.LogInformation("Updated artifact {Id} rating to {Rating}", request.ArtifactId, request.Rating);
            }
        }
        else
        {
            if (request.HideArtifact == true)
            {
                Db.Insert(new HiddenArtifact
                {
                    ArtifactId = request.ArtifactId,
                    UserId = userId,
                    CreatedDate = now,
                });
            }
            
            Db.Insert(new ModerationQueue
            {
                ArtifactId = request.ArtifactId,
                Rating = request.Rating,
                Hide = request.HideArtifact,
                PoorQuality = request.PoorQuality,
                ReportType = request.ReportType,
                ReportTag = request.ReportTag,
                ReportComment = request.ReportComment,
                CreatedBy = userId,
                CreatedDate = now,
                ModifiedBy = userId,
                ModifiedDate = now,
            });
            log.LogInformation("Submitted artifact {Id} for moderation", request.ArtifactId);
        }
        
        return Db.SingleById<Artifact>(request.ArtifactId);
    }
    
}
