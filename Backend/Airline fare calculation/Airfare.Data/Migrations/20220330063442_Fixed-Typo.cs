using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Airfare.Data.Migrations
{
  public partial class FixedTypo : Migration
  {
    protected override void Up(MigrationBuilder migrationBuilder)
    {

      migrationBuilder.RenameColumn(
          name: "Abbrevation",
          table: "AirportData",
          newName: "Abbreviation");

      migrationBuilder.RenameIndex(
                name: "IX_AirportData_Abbrevation",
                table: "AirportData",
                newName: "IX_AirportData_Abbreviation");
    }

    protected override void Down(MigrationBuilder migrationBuilder)
    {

      migrationBuilder.RenameColumn(
          name: "Abbreviation",
          table: "AirportData",
          newName: "Abbrevation");

      migrationBuilder.RenameIndex(
                name: "IX_AirportData_Abbreviation",
                table: "AirportData",
                newName: "IX_AirportData_Abbrevation");
    }
  }
}
