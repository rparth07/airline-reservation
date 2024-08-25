using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Airfare.Data.Migrations
{
    public partial class destinationAirport : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_FlightDetails_DestinationAirportId",
                table: "FlightDetails",
                column: "DestinationAirportId");

            migrationBuilder.AddForeignKey(
                name: "FK_FlightDetails_AirportData_DestinationAirportId",
                table: "FlightDetails",
                column: "DestinationAirportId",
                principalTable: "AirportData",
                principalColumn: "AirportId",
                onDelete: ReferentialAction.NoAction);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FlightDetails_AirportData_DestinationAirportId",
                table: "FlightDetails");

            migrationBuilder.DropIndex(
                name: "IX_FlightDetails_DestinationAirportId",
                table: "FlightDetails");
        }
    }
}
