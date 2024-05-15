using BookSale.Management.DataAccess.Data;
using BookSale.Management.Domain.Entities;
using BookSale.Management.Domain.Setting;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace BookSale.Management.DataAccess
{
    public static class ConfigurationService
    {
        public static async Task AutoMigration(this WebApplication webApplication)
        {
            using(var scope = webApplication.Services.CreateScope())
            {
                var appContext = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();

                await appContext.Database.MigrateAsync();
            }
        }

        public static async Task SeedData(this WebApplication webApplication, IConfiguration configuration)
        {
            using (var scope = webApplication.Services.CreateScope())
            {
                var userManager = scope.ServiceProvider.GetRequiredService<UserManager<ApplicationUser>>();
                var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();

                var defaultUser = configuration.GetSection("DefaultUsers")?.Get<DefaultUser>() ?? new DefaultUser();
                var defaultRole = configuration.GetValue<string>("DefaultRole") ?? "SuperAdmin";

                try
                {
                    if (!await roleManager.RoleExistsAsync(defaultRole))
                    {
                        await roleManager.CreateAsync(new IdentityRole(defaultRole));
                    }

                    var existUser = await userManager.FindByNameAsync(defaultUser.Username);

                    if (existUser == null)
                    {
                        var user = new ApplicationUser
                        {
                            UserName = defaultUser.Username,
                            Fullname = defaultUser.Username,
                            Email = defaultUser.Email,
                            NormalizedEmail = defaultUser.Email.ToUpper(),
                            IsActive = true,
                            AccessFailedCount = 0
                        };

                        var identityUser = await userManager.CreateAsync(user, defaultUser.Password);

                        if (identityUser.Succeeded)
                        {
                            await userManager.AddToRoleAsync(user, defaultRole);
                        }
                    }
                }
                catch (Exception)
                {
                    throw;
                }
            }
        }
    }
}
