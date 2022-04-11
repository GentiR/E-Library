using Microsoft.Extensions.Configuration;
using Domain;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using Persistence;

namespace API.Extensions
{
    public static class IdentityServiceExtentions
    {
            public static IServiceCollection AddIdentityServices(this IServiceCollection services, 
            IConfiguration config)
            {
                services.AddIdentityCore<AppUser>(opt =>
                {
                    opt.Password.RequireNonAlphanumeric = false;
                })
                .AddEntityFrameworkStores<DataContext>()
                .AddSignInManager<SignInManager<AppUser>>();

                services.AddAuthentication();

                return services;
           }
    }
}