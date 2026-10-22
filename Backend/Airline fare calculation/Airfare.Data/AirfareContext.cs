using Airfare.Data.AdminDataModel;
using Airfare.Data.UserDataModel;
using Microsoft.EntityFrameworkCore;

namespace Airfare.Data
{
  public class AirfareContext : DbContext
  {

    public DbSet<FlightDetailsDataModel> FlightDetails { get; set; }
    public DbSet<FlightOperatorDataModel> FlightOperator { get; set; }
    public DbSet<AirportDataModel> AirportData { get; set; }

    public DbSet<FlightGraphDataModel> FlightGraph { get; set; }

    public DbSet<PassengerDataModel> Passengers { get; set; }
    public DbSet<BookingDataModel> BookingDetails { get; set; }


    public AirfareContext()
    { }

    public AirfareContext(DbContextOptions<AirfareContext> options) : base(options)
    {

    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {

      modelBuilder.Entity<AirportDataModel>(entity =>
      {
        entity.HasIndex(e => e.Abbreviation).IsUnique();
      });

      modelBuilder.Entity<FlightDetailsDataModel>(entity =>
      {
        entity.HasIndex(e => e.FlightNumber).IsUnique();
      });

      modelBuilder.Entity<FlightDetailsDataModel>().Property(f => f.SourceDepartureTime).HasColumnType("time without time zone");
      modelBuilder.Entity<FlightDetailsDataModel>().Property(f => f.DestinationArrivalTime).HasColumnType("time without time zone");
      modelBuilder.Entity<FlightGraphDataModel>().HasIndex(f => new { f.SourceAirport, f.DestinationAirport }).IsUnique();
      modelBuilder.Entity<FlightOperatorDataModel>(entity =>
      {
        entity.HasIndex(e => e.CompanyName).IsUnique();
      });
    
    }

  }
}
