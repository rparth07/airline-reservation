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

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers()
    .AddJsonOptions(options =>
        options.JsonSerializerOptions.Converters.Add(new StringToTimeSpanConverter()))
    .AddNewtonsoftJson(setupAction =>
    {
      setupAction.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
      setupAction.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
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



//builder.Services.AddDbContext<AirfareContext>(options =>
//{
//  options.UseSqlServer(
//      @"workstation id=Airfare.mssql.somee.com;packet size=4096;user id=krunal-ctrl_SQLLogin_1;pwd=hpbwq3n5oa;data source=Airfare.mssql.somee.com;persist security info=False;initial catalog=Airfare");
//});

builder.Services.AddDbContext<AirfareContext>(options =>
{
  //options.UseSqlServer(
  //    @"workstation id=Airfare.mssql.somee.com;packet size=4096;user id=krunal-ctrl_SQLLogin_1;pwd=hpbwq3n5oa;data source=Airfare.mssql.somee.com;persist security info=False;initial catalog=Airfare");
  options.UseSqlServer(@"Data Source = (localdb)\MSSQLLocalDB; Initial Catalog = AirfareData");
});
var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseCors(builder =>
{
  builder.WithOrigins("http://localhost:4200").AllowAnyHeader();
  builder.WithOrigins("http://localhost:4200").AllowAnyMethod();
  builder.WithOrigins("https://tark-airline-reservation.netlify.app").AllowAnyHeader();
  builder.WithOrigins("https://tark-airline-reservation.netlify.app").AllowAnyMethod();
});


app.UseAuthorization();

app.MapControllers();

app.Run();
