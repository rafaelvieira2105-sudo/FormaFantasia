using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FormaFantasia.Web.Migrations
{
    /// <inheritdoc />
    public partial class AdicionarCamposEnvio : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<decimal>(
                name: "CustoEnvio",
                table: "Encomendas",
                type: "decimal(65,30)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<string>(
                name: "MetodoEnvio",
                table: "Encomendas",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CustoEnvio",
                table: "Encomendas");

            migrationBuilder.DropColumn(
                name: "MetodoEnvio",
                table: "Encomendas");
        }
    }
}
