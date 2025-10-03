using FluentValidation;
using FluentValidation.Validators;
using Kariyer.UserService.Application.UserService.Application.Services.UserService.Application.Interfaces;

using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Kariyer.UserService.Application
{
    public static class DependecyInjection
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services)
        {
            var assembly = typeof(DependecyInjection).Assembly;
            services.AddMediatR(
                configuration => configuration.RegisterServicesFromAssembly(assembly));

            services.AddValidatorsFromAssembly(assembly);
            return services;
        }
    }
}
