using Microsoft.EntityFrameworkCore;
using BudgetApp.Application.Interfaces;
using BudgetApp.Infrastructure.Repositories;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using DotNetEnv;
using System.Text;
using BudgetApp.Domain.Models;

// load environment variables from .env file
DotNetEnv.Env.Load("../../../.env");

// This is the main entry point for the ASP.NET Core application.
var builder = WebApplication.CreateBuilder(args);

// Configure Entity Framework Core with PostgreSQL
var connectionString = $"Host={Environment.GetEnvironmentVariable("DB_HOST")};" +
                       $"Port={Environment.GetEnvironmentVariable("DB_PORT")};" +
                       $"Database={Environment.GetEnvironmentVariable("DB_NAME")};" +
                       $"Username={Environment.GetEnvironmentVariable("DB_USER")};" +
                       $"Password={Environment.GetEnvironmentVariable("DB_PASS")}";

// Register the DbContext with the connection string                   
builder.Services.AddDbContext<BudgetDbContext>(options =>
    options.UseNpgsql(connectionString));


// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Add Identity (AppUser + Role)
builder.Services.AddIdentity<AppUser, IdentityRole>()
    .AddEntityFrameworkStores<BudgetDbContext>()
    .AddDefaultTokenProviders();

// Add JWT Authentication
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = "budgetapp",
        ValidAudience = "budgetapp",
        IssuerSigningKey = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"] ?? "your-fallback-secret-key"))
    };
});

// Add authorization
builder.Services.AddAuthorization();
// Add services to the container.
builder.Services.AddControllers();

// Register application services
builder.Services.AddScoped<ITransactionRepository, TransactionRepository>();
builder.Services.AddScoped<ICategoryRepository, CategoryRepository>();

// Register the application services
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Use static files for serving Swagger UI and other static content
//app.UseHttpsRedirection();
app.UseRouting();

// Enable CORS for all origins, headers, and methods
app.UseCors(options =>
    options.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());

// for JWT
app.UseAuthentication();
app.UseAuthorization();
// Enable static files middleware to serve static files
app.UseStaticFiles(); 

app.MapControllers();

app.Run();

