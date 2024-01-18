using BookSale.Management.Application.Abstracts;
using BookSale.Management.Application.Services;
using BookSale.Management.DataAccess.Abstract;
using BookSale.Management.DataAccess.Dapper;
using BookSale.Management.DataAccess.Data;
using BookSale.Management.DataAccess.Repository;
using BookSale.Management.Domain.Abstract;
using BookSale.Management.Domain.Abstracts;
using BookSale.Management.Domain.Entities;
using BookSale.Management.Infrastruture.Services;
using DinkToPdf.Contracts;
using DinkToPdf;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Serilog;
using Microsoft.AspNetCore.Builder;

namespace BookSale.Management.Infrastruture.Configuration
{
    public static class ConfigurationService
    {
        public static void ConfigureIdentity(this IServiceCollection services, IConfiguration configuration)
        {
            var connectionString = configuration.GetConnectionString("DefaultConnection")
                                ?? throw new InvalidOperationException("Connection string 'DefaultConnection' not found.");

            services.AddDbContext<ApplicationDbContext>(options => options.UseSqlServer(connectionString));

            services.AddIdentity<ApplicationUser, IdentityRole>()
                        .AddEntityFrameworkStores<ApplicationDbContext>()
                        .AddDefaultTokenProviders();

            services.ConfigureApplicationCookie(options =>
            {
                options.Cookie.Name = "BookSaleMangementCookie";
                options.ExpireTimeSpan = TimeSpan.FromHours(8);
                options.LoginPath = "/admin/authentication/login";
                options.SlidingExpiration = true;
                //options.AccessDeniedPath = "/";
            });

            services.Configure<IdentityOptions>(options =>
            {
                options.Lockout.AllowedForNewUsers = true;
                options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(1);
                options.Lockout.MaxFailedAccessAttempts = 3;
            });
        }

        public static void AddDependencyInjection(this IServiceCollection services)
        {
            services.AddTransient<PasswordHasher<ApplicationUser>>();
            services.AddTransient<ISQLQueryHandler, SQLQueryHandler>();
            services.AddTransient<IUnitOfWork, UnitOfWork>();
            services.AddTransient<IImageService, ImageService>();
            services.AddTransient<IEmailService, EmailService>();
            services.AddTransient<ICommonService, CommonService>();
            services.AddSingleton(typeof(IConverter), new SynchronizedConverter(new PdfTools()));
            services.AddTransient<IPDFService, PDFService>();
            services.AddTransient<IExcelHandler, ExcelHandler>();

            services.AddTransient<IAuthenticationService, AuthenticationService>();
            services.AddTransient<IUserService, UserService>();
            services.AddTransient<IRoleService, RoleService>();
            services.AddTransient<IGenreService, GenreService>();
            services.AddTransient<IBookService, BookService>();
            services.AddTransient<IUserAddressService, UserAddressService>();
            services.AddTransient<ICartService, CartService>();
            services.AddTransient<IOrderService, OrderService>();
        }

        public static void AddAutoMapper(this IServiceCollection services)
        {
            services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
        }

        public static void AddAuthorizationGlobal(this IServiceCollection services, IConfiguration configuration)
        {
            var autherizeAdmin = new AuthorizationPolicyBuilder()
                   .RequireAuthenticatedUser().Build();

            services.AddAuthentication()
                   .AddGoogle(options =>
                   {
                       IConfigurationSection googleAuthNSection = configuration.GetSection("Authentication:Google");
                       options.ClientId = googleAuthNSection["ClientId"];
                       options.ClientSecret = googleAuthNSection["ClientSecret"];
                   }).AddFacebook(options =>
                   {
                       IConfigurationSection fbAuthNSection = configuration.GetSection("Authentication:Facebook");
                       options.AppId = fbAuthNSection["AppId"];
                       options.AppSecret = fbAuthNSection["AppSecret"];
                   });

            services.AddAuthorization(options =>
            {
                options.AddPolicy("AuthorizedAdminPolicy", autherizeAdmin);
            });
        }

        public static void AddSerilog(this WebApplicationBuilder builder)
        {
            Log.Logger = new LoggerConfiguration()
                                .MinimumLevel.Information()
                                .Enrich.FromLogContext()
                                .WriteTo.Console()
                                .WriteTo.File(
                                   System.IO.Path.Combine("LogFiles",  "log.txt"),
                                   rollingInterval: RollingInterval.Day,
                                   fileSizeLimitBytes: 10 * 1024 * 1024, //10mb
                                   retainedFileCountLimit: 2
                                 )
                                .CreateLogger(); 

            builder.Host.UseSerilog();
        }
    }
}
