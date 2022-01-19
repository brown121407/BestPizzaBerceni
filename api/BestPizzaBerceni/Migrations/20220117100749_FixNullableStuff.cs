using Microsoft.EntityFrameworkCore.Migrations;

namespace BestPizzaBerceni.Migrations
{
    public partial class FixNullableStuff : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OrderItems_Coupons_CouponId",
                table: "OrderItems");

            migrationBuilder.AlterColumn<int>(
                name: "CouponId",
                table: "OrderItems",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AddForeignKey(
                name: "FK_OrderItems_Coupons_CouponId",
                table: "OrderItems",
                column: "CouponId",
                principalTable: "Coupons",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OrderItems_Coupons_CouponId",
                table: "OrderItems");

            migrationBuilder.AlterColumn<int>(
                name: "CouponId",
                table: "OrderItems",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_OrderItems_Coupons_CouponId",
                table: "OrderItems",
                column: "CouponId",
                principalTable: "Coupons",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
