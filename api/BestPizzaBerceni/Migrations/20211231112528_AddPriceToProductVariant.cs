using Microsoft.EntityFrameworkCore.Migrations;

namespace BestPizzaBerceni.Migrations
{
    public partial class AddPriceToProductVariant : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<float>(
                name: "Price",
                table: "ProductVariants",
                type: "real",
                nullable: false,
                defaultValue: 0f);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Price",
                table: "ProductVariants");
        }
    }
}
