using Kariyer.UserService.Application.UserService.Application.Services.UserService.Application.Interfaces;
using Kariyer.UserService.Infrastructure.Services;
using Kariyer.UserService.Infrastructure.Mapping;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Kariyer.UserService.Application;

namespace Kariyer.UserService.Infrastructures
{
    public static class DependecyInjection
    {
        public static IServiceCollection AddInfrastructure(this IServiceCollection services)
        {
            services.AddAutoMapper(cfg => cfg.AddProfile<UserProfile>());
            services.AddScoped<ITokenService, TokenService>();
            services.AddScoped<IAuthenticationService, AuthenticationService>();
            //services.AddScoped(typeof(IGenericRepository<>), typeof(RepositoryBase<>));
            return services;
            // Infrastructure services registration logic here
        }
    }
}
