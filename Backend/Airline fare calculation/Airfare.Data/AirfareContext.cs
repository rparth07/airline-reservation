using Airfare.Data.AdminDataModel;
using Microsoft.EntityFrameworkCore;

namespace Airfare.Data
{
    public class AirfareContext : DbContext
    {

        public DbSet<FlightDetailsDataModel> FlightDetails { get; set; }
        public DbSet<FlightOperatorDataModel> FlightOperator { get; set; }
        public DbSet<AirportDataModel> AirportData { get; set; }

        public DbSet<FlightGraphDataModel> FlightGraph { get; set; }


        public AirfareContext()
        { }

        public AirfareContext(DbContextOptions<AirfareContext> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<AirportDataModel>(entity => {
                entity.HasIndex(e => e.Abbreviation).IsUnique();
            });

            modelBuilder.Entity<FlightDetailsDataModel>(entity => {
                entity.HasIndex(e => e.FlightNumber).IsUnique();
            });

            modelBuilder.Entity<FlightOperatorDataModel>(entity => {
                entity.HasIndex(e => e.CompanyName).IsUnique();
            });
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            //optionsBuilder.EnableSensitiveDataLogging();
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("Data Source=.");
            }
        }
    }
}
