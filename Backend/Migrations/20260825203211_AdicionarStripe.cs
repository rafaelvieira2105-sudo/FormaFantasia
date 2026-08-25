using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FormaFantasia.Web.Migrations
{
    /// <inheritdoc />
    public partial class AdicionarStripe : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "StripeClientSecret",
                table: "Encomendas",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "StripePaymentIntentId",
                table: "Encomendas",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "StripeClientSecret",
                table: "Encomendas");

            migrationBuilder.DropColumn(
                name: "StripePaymentIntentId",
                table: "Encomendas");
        }
    }
}
