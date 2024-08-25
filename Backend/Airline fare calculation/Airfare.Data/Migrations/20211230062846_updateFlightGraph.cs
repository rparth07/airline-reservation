using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Airfare.Data.Migrations
{
    public partial class updateFlightGraph : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "SourceCity",
                table: "FlightGraph",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "DestinationCity",
                table: "FlightGraph",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");


            migrationBuilder.AddColumn<int>(
                name: "Weight",
                table: "FlightGraph",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DestinationCity",
                table: "FlightGraph");

            migrationBuilder.DropColumn(
                name: "SourceCity",
                table: "FlightGraph");

            migrationBuilder.DropColumn(
                name: "Weight",
                table: "FlightGraph");
        }
    }
}
