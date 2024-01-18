using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BookSale.Management.DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class addstatusaddressidtoorder : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "AddressId",
                table: "Order",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Status",
                table: "Order",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AddressId",
                table: "Order");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "Order");
        }
    }
}
