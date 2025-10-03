using Kariyer.UserService.Application.Interfaces;
using Kariyer.UserService.Domain.Entity;
using Kariyer.UserService.Persistence;
using Kariyer.UserService.Persistence.Context.USDBContext;
using Kariyer.UserService.Persistence.Repositories;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Kariyer.UserService.Persistence
{
    public static class DependecyInjection
    {
        public static IServiceCollection AddPersistence(this IServiceCollection services, IConfiguration configuration)
        {

            services.AddDbContext<USDBContext>(options =>
            options.UseSqlServer(configuration.GetConnectionString("DefaulConnection")));
            services.AddScoped<IRefreshTokenRepository, RefreshTokenRepository>();
            return services;
        }
    }
}
