using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Models.Migrations
{
    /// <inheritdoc />
    public partial class UpdatedDb2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "IsACtive",
                table: "Rides",
                newName: "IsActive");

            migrationBuilder.RenameColumn(
                name: "IsACtive",
                table: "OfferedRides",
                newName: "IsActive");

            migrationBuilder.RenameColumn(
                name: "IsACtive",
                table: "BookedRides",
                newName: "IsActive");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "IsActive",
                table: "Rides",
                newName: "IsACtive");

            migrationBuilder.RenameColumn(
                name: "IsActive",
                table: "OfferedRides",
                newName: "IsACtive");

            migrationBuilder.RenameColumn(
                name: "IsActive",
                table: "BookedRides",
                newName: "IsACtive");
        }
    }
}
