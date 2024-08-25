using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Airfare.Data.Migrations
{
    public partial class noActionForSourceAirportData : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {

            migrationBuilder.Sql("" +
                "ALTER TABLE [dbo].[FlightDetails] DROP CONSTRAINT [FK_FlightDetails_AirportData_SourceAirportId] " +
                "ALTER TABLE[dbo].[FlightDetails]  WITH CHECK ADD  CONSTRAINT [FK_FlightDetails_AirportData_SourceAirportId] FOREIGN KEY([SourceAirportId]) " +
                "REFERENCES[dbo].[AirportData]([AirportId]) " +
                "ALTER TABLE[dbo].[FlightDetails] CHECK CONSTRAINT[FK_FlightDetails_AirportData_SourceAirportId]");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
