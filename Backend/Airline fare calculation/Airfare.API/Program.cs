using Microsoft.AspNetCore.RateLimiting;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.Threading.RateLimiting;
using Airfare.API.Helper;
using Airfare.Data;
using Airfare.Data.Repository.Admin;
using Airfare.Data.Repository.User;
using Airfare.Domain.RepositoryInterfaces.AdminInterfaces;
using Airfare.Domain.RepositoryInterfaces.UserInterfaces;
using Airfare.Service.Filter;
using Airfare.Service.Services.Admin;
using Airfare.Service.Services.Admin.AdminInterfaces;
using Airfare.Service.Services.User;
using Airfare.Service.Services.User.UserInterfaces;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Serialization;

var builder = WebApplication.CreateBuilder(args.Where(a => a != "--migrate-seed").ToArray());

// Add services to the container.

builder.Services.AddControllers()
    .AddJsonOptions(options =>
        options.JsonSerializerOptions.Converters.Add(new StringToTimeSpanConverter()))
    .AddNewtonsoftJson(setupAction =>
    {
      setupAction.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
      setupAction.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
      setupAction.SerializerSettings.MaxDepth = 32;
    });

builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

builder.Services.AddScoped<IAirportRepository, AirportRepository>();
builder.Services.AddScoped<IFlightDetailsRepository, FlightDetailsRepository>();
builder.Services.AddScoped<IOperatorRepository, OperatorRepository>();
builder.Services.AddScoped<IFlightSearchRepository, FlightSearchRepository>();
builder.Services.AddScoped<IBookingDetailsRepository, BookingDetailsRepository>();



builder.Services.AddScoped<IAirportService, AirportService>();
builder.Services.AddScoped<IFlightDetailsService, FlightDetailsService>();
builder.Services.AddScoped<IOperatorService, OperatorService>();

builder.Services.AddScoped<IFlightSearchService, FlightSearchService>();
builder.Services.AddScoped<IFlightDetailsHelperService, FlightDetailsHelperService>();
builder.Services.AddScoped<IBookingDetailsService, BookingDetailsService>();

// Filter to handle exception 
builder.Services.AddMvc(options =>
{
  options.Filters.Add(new UserFriendlyExceptionFilterAttribute());
});

var connectionString = builder.Configuration["DATABASE_URL"];
if (string.IsNullOrWhiteSpace(connectionString))
  throw new InvalidOperationException("Configure DATABASE_URL in the backend host's secret settings.");

var allowedOrigins = (builder.Configuration["AllowedOrigin"] ?? "")
  .Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries);
if (allowedOrigins.Length == 0)
  throw new InvalidOperationException("Configure AllowedOrigin with the frontend origin(s), separated by commas.");

builder.Services.AddCors(options => options.AddDefaultPolicy(policy =>
  policy.WithOrigins(allowedOrigins).AllowAnyHeader().AllowAnyMethod()));

builder.Services.AddDbContext<AirfareContext>(options =>
{
  options.UseNpgsql(PostgresConfiguration.ConnectionString(connectionString));
});


var signingKey = builder.Configuration["AdminSigningKey"];
if (string.IsNullOrWhiteSpace(signingKey) || signingKey.Length < 32)
  throw new InvalidOperationException("Configure a random AdminSigningKey of at least 32 characters.");
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options => {
  options.TokenValidationParameters = new TokenValidationParameters {
    ValidateIssuer = true, ValidIssuer = "airline-demo",
    ValidateAudience = true, ValidAudience = "airline-admin",
    ValidateIssuerSigningKey = true, IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(signingKey)),
    ValidateLifetime = true, ClockSkew = TimeSpan.FromSeconds(30)
  };
});
builder.Services.AddAuthorization();
builder.Services.AddRateLimiter(options => options.AddFixedWindowLimiter("login", limiter => {
  limiter.PermitLimit = 10; limiter.Window = TimeSpan.FromMinutes(1); limiter.QueueLimit = 0;
}));
var app = builder.Build();

if (builder.Configuration.GetValue<bool>("MigrateOnStartup") || args.Contains("--migrate-seed")) {
  var migrationUrl = builder.Configuration["MIGRATION_DATABASE_URL"] ?? connectionString;
  var options = new DbContextOptionsBuilder<AirfareContext>().UseNpgsql(PostgresConfiguration.ConnectionString(migrationUrl)).Options;
  await using var database = new AirfareContext(options);
  await database.Database.MigrateAsync();
  if (builder.Configuration.GetValue<bool>("SeedDemoData")) await DemoSeeder.SeedAsync(database);
  if (args.Contains("--migrate-seed")) return;
}


// Configure the HTTP request pipeline.
app.UseCors();


app.UseRateLimiter();
app.UseAuthentication();
app.UseAuthorization();

app.MapGet("/health/live", () => Results.Ok(new { status = "ok", mode = "demo" }));
app.MapGet("/health/ready", async (AirfareContext db) => {
  try { return await db.Database.CanConnectAsync() ? Results.Ok(new { status = "ready", mode = "demo" }) : Results.StatusCode(503); }
  catch { return Results.StatusCode(503); }
});
app.MapControllers();

app.Run();
