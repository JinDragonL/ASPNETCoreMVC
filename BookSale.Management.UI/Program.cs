using BookSale.Management.DataAccess;
using BookSale.Management.Infrastruture.Configuration;
using BookSale.Management.UI.Configuration;
using BookSale.Management.UI.Ultility;

var builder = WebApplication.CreateBuilder(args);
var builderRazer = builder.Services.AddRazorPages();

builder.Services.AddAntiforgery(options =>
{
    options.HeaderName = "RequestVerificationToken";
});

builder.Services.ConfigureIdentity(builder.Configuration);
builder.Services.AddDependencyInjection();

builder.Services.AddAutoMapper();

builder.Services.AddControllersWithViews(options =>
{
    options.Filters.Add(new CommonDataActionFiler());
});

builder.Services.RegisterGlobalizationAndLocalization();

builder.Services.AddAuthorizationGlobal(builder.Configuration);

builder.Services.AddSession(options =>
{
    options.IdleTimeout = TimeSpan.FromHours(1);
});

var app = builder.Build();

app.AutoMigration().GetAwaiter().GetResult();

app.SeedData(builder.Configuration).GetAwaiter().GetResult();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseMigrationsEndPoint();
    builderRazer.AddRazorRuntimeCompilation();
}
else
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}
 
app.UseHttpsRedirection();
app.UseRequestLocalization();
var timeOutCacheStaticFiles = 60 * 60;

app.UseStaticFiles(new StaticFileOptions
{
    OnPrepareResponse = cg =>
    {
        cg.Context.Response.Headers.Append("Cache-Control", $"public, max-age={timeOutCacheStaticFiles}");
    },
    //RequestPath = "/StaticFiles-User"
});

app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

app.UseSession();

//app.MapControllerRoute(
//    name: "AdminRouting",
//    pattern: "{area:exists}/{controller=Home}/{action=Index}/{id?}"); ////domain/{area}/controller/action

app.MapAreaControllerRoute(
    name: "AdminRouting",
    areaName: "Admin",
    pattern: "Admin/{controller=Home}/{action=Index}/{id?}")
.RequireAuthorization("AuthorizedAdminPolicy");

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");  //domain/controller/action

app.MapRazorPages();

app.Run();
