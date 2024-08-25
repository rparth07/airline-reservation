using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Airfare.Data.Migrations
{
    public partial class createDatabase : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AirportData",
                columns: table => new
                {
                    AirportId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    AirportName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Abbrevation = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AirportData", x => x.AirportId);
                });

            migrationBuilder.CreateTable(
                name: "FlightOperator",
                columns: table => new
                {
                    OperatorId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CompanyName = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    BaseFare = table.Column<double>(type: "float", nullable: false),
                    Tax = table.Column<double>(type: "float", nullable: false),
                    Convience = table.Column<double>(type: "float", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FlightOperator", x => x.OperatorId);
                });

            migrationBuilder.CreateTable(
                name: "FlightDetails",
                columns: table => new
                {
                    FlightId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    FlightNumber = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    FlightOperatorOperatorId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TotalSeatEconomy = table.Column<int>(type: "int", nullable: false),
                    TotalSeatBusiness = table.Column<int>(type: "int", nullable: false),
                    SeatingFormatEconomy = table.Column<int>(type: "int", nullable: false),
                    SeatingFormatBusiness = table.Column<int>(type: "int", nullable: false),
                    OperatingDays = table.Column<int>(type: "int", nullable: false),
                    DepartureTime = table.Column<TimeSpan>(type: "time", nullable: false),
                    ArrivalTime = table.Column<TimeSpan>(type: "time", nullable: false),
                    SourceAirportId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    DestinationAirportId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FlightDetails", x => x.FlightId);
                    table.ForeignKey(
                        name: "FK_FlightDetails_AirportData_SourceAirportId",
                        column: x => x.SourceAirportId,
                        principalTable: "AirportData",
                        principalColumn: "AirportId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_FlightDetails_FlightOperator_FlightOperatorOperatorId",
                        column: x => x.FlightOperatorOperatorId,
                        principalTable: "FlightOperator",
                        principalColumn: "OperatorId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AirportData_Abbrevation",
                table: "AirportData",
                column: "Abbrevation",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_FlightDetails_FlightNumber",
                table: "FlightDetails",
                column: "FlightNumber",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_FlightDetails_FlightOperatorOperatorId",
                table: "FlightDetails",
                column: "FlightOperatorOperatorId");

            migrationBuilder.CreateIndex(
                name: "IX_FlightDetails_SourceAirportId",
                table: "FlightDetails",
                column: "SourceAirportId");

            migrationBuilder.CreateIndex(
                name: "IX_FlightOperator_CompanyName",
                table: "FlightOperator",
                column: "CompanyName",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "FlightDetails");

            migrationBuilder.DropTable(
                name: "AirportData");

            migrationBuilder.DropTable(
                name: "FlightOperator");
        }
    }
}
