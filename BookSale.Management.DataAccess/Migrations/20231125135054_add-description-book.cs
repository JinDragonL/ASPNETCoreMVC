using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BookSale.Management.DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class adddescriptionbook : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Book",
                type: "nvarchar(250)",
                maxLength: 250,
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Description",
                table: "Book");
        }
    }
}
