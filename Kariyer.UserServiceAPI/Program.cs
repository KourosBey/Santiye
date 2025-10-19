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
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddApplicationServices();
builder.Services.AddInfrastructure();
builder.Services.AddPersistence(builder.Configuration);
builder.Services.AddPresentation();

builder.Services.AddIdentity<ApplicationUser, IdentityRole<Guid>>()
    .AddEntityFrameworkStores<USDBContext>()
    .AddDefaultTokenProviders();

builder.Host.UseSerilog((context, configuration) => configuration.ReadFrom.Configuration(context.Configuration));

builder.Services.AddAuthentication();
builder.Services.AddAuthorization();


// ? CORS POLICY EKLEME — Next.js frontend için
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowNextJs", policy =>
    {
        policy
            .WithOrigins(
                "http://localhost:3000"     // ?? Next.js local ortam
            )
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials(); // E?er cookie/token kullan?yorsan
    });
});

var app = builder.Build();

// ROL OLU?TURMA BLO?UN AYNEN KALAB?L?R
using (var scope = app.Services.CreateScope())
{
    var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole<Guid>>>();

    string[] roleNames = new string[] { "BUSSINESS", "CUSTOMER", "ADMIN" };

    foreach (var roleName in roleNames)
    {
        if (!await roleManager.RoleExistsAsync(roleName))
        {
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

// ? CORS Middleware’i yetkilendirmeden ÖNCE ça??r!
app.UseCors("AllowNextJs");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
