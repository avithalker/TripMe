using System.Web;

namespace TripMe.Service.Authentication.Jwt
{
    public static class JwtExtensions
    {
        public static long GetAuthenticatedUserId(this HttpContext httpContext)
        {
            return long.Parse(httpContext.User.Identity.Name);
        }
    }
}
