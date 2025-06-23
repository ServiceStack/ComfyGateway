using MyApp.Data;
using MyApp.ServiceModel;
using ServiceStack;
using ServiceStack.OrmLite;
using Microsoft.AspNetCore.Identity;

namespace MyApp.ServiceInterface;

public class UserServices(AppData appData, UserManager<ApplicationUser> userManager) : Service
{
    public object Get(GetDeletedRows request)
    {
        var lastId = appData.GetMaxDeletedRowId(Db);
        var ret = new GetDeletedRowsResponse
        {
            LastId = lastId,
        };

        if (request.AfterId != null)
        {
            var q = Db.From<DeletedRow>().Where(x => x.Id > request.AfterId);
            q.Take(1000);
            ret.Results = Db.Select(q);
        }
        
        return ret;
    }

    public object Any(UpdatePreferences request)
    {
        var userId = Request.GetClaimsPrincipal().GetUserId();
        if (request.Ratings != null)
        {
            var efRatings = string.Join(",", request.Ratings.Map(x => x.ToString()));
            Db.UpdateOnly(() => new ApplicationUser {
                Ratings = efRatings,
            }, x => x.Id == userId);
        }
        return new EmptyResponse();
    }

    public async Task<object> Any(UpdateUserAvatar request)
    {
        var userId = Request.GetClaimsPrincipal().GetUserId();
        var user = await userManager.FindByIdAsync(userId);
        if (user == null)
            throw HttpError.NotFound("User not found");

        // The Avatar property will be automatically populated by ServiceStack's file upload feature
        if (!string.IsNullOrEmpty(request.Avatar))
        {
            user.Avatar = request.Avatar;
            await userManager.UpdateAsync(user);
        }

        return new EmptyResponse();
    }
}