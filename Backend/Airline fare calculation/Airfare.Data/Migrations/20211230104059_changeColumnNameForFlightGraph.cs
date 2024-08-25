using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Airfare.Data.Migrations
{
    public partial class changeColumnNameForFlightGraph : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "SourceCity",
                table: "FlightGraph",
                newName: "SourceAirport");

            migrationBuilder.RenameColumn(
                name: "DestinationCity",
                table: "FlightGraph",
                newName: "DestinationAirport");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "SourceAirport",
                table: "FlightGraph",
                newName: "SourceCity");

            migrationBuilder.RenameColumn(
                name: "DestinationAirport",
                table: "FlightGraph",
                newName: "DestinationCity");
        }
    }
}
