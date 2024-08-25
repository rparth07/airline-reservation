using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Airfare.Data.Migrations
{
    public partial class BookingDataModel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "BookingDataModelId",
                table: "Passengers",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "BookingDetails",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    PhoneNumber = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BookingDetails", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Passengers_BookingDataModelId",
                table: "Passengers",
                column: "BookingDataModelId");

            migrationBuilder.AddForeignKey(
                name: "FK_Passengers_BookingDetails_BookingDataModelId",
                table: "Passengers",
                column: "BookingDataModelId",
                principalTable: "BookingDetails",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Passengers_BookingDetails_BookingDataModelId",
                table: "Passengers");

            migrationBuilder.DropTable(
                name: "BookingDetails");

            migrationBuilder.DropIndex(
                name: "IX_Passengers_BookingDataModelId",
                table: "Passengers");

            migrationBuilder.DropColumn(
                name: "BookingDataModelId",
                table: "Passengers");
        }
    }
}
