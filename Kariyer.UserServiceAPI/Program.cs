using Kariyer.UserService.Application;
using Kariyer.UserService.Domain.Entity;
using Kariyer.UserService.Infrastructure;
using Kariyer.UserService.Infrastructures;
using Kariyer.UserService.Persistence;
using Kariyer.UserService.Persistence.Context.USDBContext;
using Kariyer.UserService.Presentation;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Serilog;
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
//builder.Services.AddIdentity<ApplicationUser, IdentityRole>()
//    .AddEntityFrameworkStores<USDBContext>()
//    .AddDefaultTokenProviders();
//builder.Services.AddSqlServer<Kariyer.UserService.Persistence.Context.USDBContext>(builder.Configuration.GetConnectionString("DefaulConnection"));
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddApplicationServices();
builder.Services
    .AddInfrastructure();
builder.Services.AddPersistence(builder.Configuration);

builder.Services
    .AddPresentation();
builder.Services.AddIdentity<ApplicationUser, IdentityRole<Guid>>()
    .AddEntityFrameworkStores<USDBContext>()
    .AddDefaultTokenProviders();


builder.Host.UseSerilog((context, configuration) => configuration.ReadFrom.Configuration(context.Configuration));

builder.Services.AddAuthentication();
builder.Services.AddAuthorization();
var app = builder.Build();
using (var scope = app.Services.CreateScope())
{
    var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole<Guid>>>();

    // Olu�turmak istedi�in rolleri tan�mla
    string[] roleNames = new string[] { "BUSSINESS", "CUSTOMER", "ADMIN" }; // Hatan� veren rol� buraya yaz!

    foreach (var roleName in roleNames)
    {
        // Rol�n veritaban�nda var olup olmad���n� kontrol et
        if (!await roleManager.RoleExistsAsync(roleName))
        {
            // E�er yoksa, yeni rol� olu�tur
            await roleManager.CreateAsync(new IdentityRole<Guid>(roleName));
        }
    }
}
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseSerilogRequestLogging();
app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
