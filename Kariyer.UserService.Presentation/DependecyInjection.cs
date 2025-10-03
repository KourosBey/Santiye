using Microsoft.Extensions.DependencyInjection;

namespace Kariyer.UserService.Presentation
{
    public static class DependecyInjection
    {
        public static IServiceCollection AddPresentation(this IServiceCollection services)
        {
            // Add presentation layer services here (e.g., controllers, view models)
            return services;
        }
    }
}
