using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Airfare.Data.Migrations
{
    public partial class updateColumnNameforDateTime : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "DepartureTime",
                table: "FlightDetails",
                newName: "SourceDepartureTime");

            migrationBuilder.RenameColumn(
                name: "ArrivalTime",
                table: "FlightDetails",
                newName: "DestinationArrivalTime");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "SourceDepartureTime",
                table: "FlightDetails",
                newName: "DepartureTime");

            migrationBuilder.RenameColumn(
                name: "DestinationArrivalTime",
                table: "FlightDetails",
                newName: "ArrivalTime");
        }
    }
}
