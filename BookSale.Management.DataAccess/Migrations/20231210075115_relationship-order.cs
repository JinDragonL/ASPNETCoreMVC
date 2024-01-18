using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BookSale.Management.DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class relationshiporder : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsActive",
                table: "Order");

            migrationBuilder.AlterColumn<string>(
                name: "OrderId",
                table: "OrderDetail",
                type: "nvarchar(50)",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.CreateIndex(
                name: "IX_OrderDetail_OrderId",
                table: "OrderDetail",
                column: "OrderId");

            migrationBuilder.AddForeignKey(
                name: "FK_OrderDetail_Order_OrderId",
                table: "OrderDetail",
                column: "OrderId",
                principalTable: "Order",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OrderDetail_Order_OrderId",
                table: "OrderDetail");

            migrationBuilder.DropIndex(
                name: "IX_OrderDetail_OrderId",
                table: "OrderDetail");

            migrationBuilder.AlterColumn<int>(
                name: "OrderId",
                table: "OrderDetail",
                type: "int",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(50)");

            migrationBuilder.AddColumn<bool>(
                name: "IsActive",
                table: "Order",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }
    }
}
