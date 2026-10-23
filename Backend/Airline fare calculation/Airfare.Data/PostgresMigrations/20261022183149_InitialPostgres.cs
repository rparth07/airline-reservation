using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Airfare.Data.PostgresMigrations
{
    /// <inheritdoc />
    public partial class InitialPostgres : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AirportData",
                columns: table => new
                {
                    AirportId = table.Column<Guid>(type: "uuid", nullable: false),
                    AirportName = table.Column<string>(type: "text", nullable: false),
                    Abbreviation = table.Column<string>(type: "character varying(3)", maxLength: 3, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AirportData", x => x.AirportId);
                });

            migrationBuilder.CreateTable(
                name: "BookingDetails",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    PhoneNumber = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BookingDetails", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "FlightGraph",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    SourceAirport = table.Column<string>(type: "text", nullable: false),
                    DestinationAirport = table.Column<string>(type: "text", nullable: false),
                    Weight = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FlightGraph", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "FlightOperator",
                columns: table => new
                {
                    OperatorId = table.Column<Guid>(type: "uuid", nullable: false),
                    CompanyName = table.Column<string>(type: "text", nullable: false),
                    BaseFare = table.Column<double>(type: "double precision", nullable: false),
                    Tax = table.Column<double>(type: "double precision", nullable: false),
                    Convenience = table.Column<double>(type: "double precision", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FlightOperator", x => x.OperatorId);
                });

            migrationBuilder.CreateTable(
                name: "Passengers",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Age = table.Column<int>(type: "integer", nullable: false),
                    Gender = table.Column<string>(type: "text", nullable: false),
                    BookingId = table.Column<Guid>(type: "uuid", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Passengers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Passengers_BookingDetails_BookingId",
                        column: x => x.BookingId,
                        principalTable: "BookingDetails",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "FlightDetails",
                columns: table => new
                {
                    FlightId = table.Column<Guid>(type: "uuid", nullable: false),
                    FlightNumber = table.Column<string>(type: "text", nullable: false),
                    FlightOperatorOperatorId = table.Column<Guid>(type: "uuid", nullable: false),
                    TotalSeatEconomy = table.Column<int>(type: "integer", nullable: false),
                    TotalSeatBusiness = table.Column<int>(type: "integer", nullable: false),
                    SeatingFormatEconomy = table.Column<int>(type: "integer", nullable: false),
                    SeatingFormatBusiness = table.Column<int>(type: "integer", nullable: false),
                    OperatingDays = table.Column<int>(type: "integer", nullable: false),
                    SourceDepartureTime = table.Column<TimeSpan>(type: "time without time zone", nullable: false),
                    DestinationArrivalTime = table.Column<TimeSpan>(type: "time without time zone", nullable: false),
                    SourceAirportId = table.Column<Guid>(type: "uuid", nullable: false),
                    DestinationAirportId = table.Column<Guid>(type: "uuid", nullable: false),
                    Distance = table.Column<double>(type: "double precision", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FlightDetails", x => x.FlightId);
                    table.ForeignKey(
                        name: "FK_FlightDetails_AirportData_DestinationAirportId",
                        column: x => x.DestinationAirportId,
                        principalTable: "AirportData",
                        principalColumn: "AirportId",
                        onDelete: ReferentialAction.Cascade);
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
                name: "IX_AirportData_Abbreviation",
                table: "AirportData",
                column: "Abbreviation",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_FlightDetails_DestinationAirportId",
                table: "FlightDetails",
                column: "DestinationAirportId");

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
                name: "IX_FlightGraph_SourceAirport_DestinationAirport",
                table: "FlightGraph",
                columns: new[] { "SourceAirport", "DestinationAirport" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_FlightOperator_CompanyName",
                table: "FlightOperator",
                column: "CompanyName",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Passengers_BookingId",
                table: "Passengers",
                column: "BookingId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "FlightDetails");

            migrationBuilder.DropTable(
                name: "FlightGraph");

            migrationBuilder.DropTable(
                name: "Passengers");

            migrationBuilder.DropTable(
                name: "AirportData");

            migrationBuilder.DropTable(
                name: "FlightOperator");

            migrationBuilder.DropTable(
                name: "BookingDetails");
        }
    }
}
