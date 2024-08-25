using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Airfare.Data.Migrations
{
    public partial class CorrectedColumnName : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Passengers_BookingDetails_BookingDataModelId",
                table: "Passengers");

            migrationBuilder.DropIndex(
                name: "IX_Passengers_PassengerId",
                table: "Passengers");

            migrationBuilder.RenameColumn(
                name: "BookingDataModelId",
                table: "Passengers",
                newName: "BookingId");

            migrationBuilder.RenameColumn(
                name: "PassengerId",
                table: "Passengers",
                newName: "Id");

            migrationBuilder.RenameIndex(
                name: "IX_Passengers_BookingDataModelId",
                table: "Passengers",
                newName: "IX_Passengers_BookingId");

            migrationBuilder.AddForeignKey(
                name: "FK_Passengers_BookingDetails_BookingId",
                table: "Passengers",
                column: "BookingId",
                principalTable: "BookingDetails",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Passengers_BookingDetails_BookingId",
                table: "Passengers");

            migrationBuilder.RenameColumn(
                name: "BookingId",
                table: "Passengers",
                newName: "BookingDataModelId");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Passengers",
                newName: "PassengerId");

            migrationBuilder.RenameIndex(
                name: "IX_Passengers_BookingId",
                table: "Passengers",
                newName: "IX_Passengers_BookingDataModelId");

            migrationBuilder.CreateIndex(
                name: "IX_Passengers_PassengerId",
                table: "Passengers",
                column: "PassengerId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Passengers_BookingDetails_BookingDataModelId",
                table: "Passengers",
                column: "BookingDataModelId",
                principalTable: "BookingDetails",
                principalColumn: "Id");
        }
    }
}
