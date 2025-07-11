using BookSale.Management.UI.Resources;
using Microsoft.AspNetCore.Mvc.Razor;
using System.Globalization;

namespace BookSale.Management.UI.Configuration
{
    public static class ConfigurationService
    {
        public static void RegisterGlobalizationAndLocalization(this IServiceCollection services)
        {
            var supportedCultures = new[]
{
                new CultureInfo("en-US"),
                new CultureInfo("vi-VN")
};

            var localizationOptions = new RequestLocalizationOptions
            {
                DefaultRequestCulture = new Microsoft.AspNetCore.Localization.RequestCulture("en-US"),
                SupportedCultures = supportedCultures.ToList(),
                SupportedUICultures = supportedCultures.ToList()
            };

            services.Configure<RequestLocalizationOptions>(options =>
            {
                options.DefaultRequestCulture = localizationOptions.DefaultRequestCulture;
                options.SupportedCultures = localizationOptions.SupportedCultures;
                options.SupportedUICultures = localizationOptions.SupportedUICultures;
            });

            services.AddMvc()
                    .AddViewLocalization(LanguageViewLocationExpanderFormat.Suffix)
                    .AddDataAnnotationsLocalization(options => {
                        options.DataAnnotationLocalizerProvider = (type, factory) =>
                factory.Create(typeof(Resource));
                    });

        }
    }
}
