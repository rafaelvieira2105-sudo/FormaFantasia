using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FormaFantasia.Web.Migrations
{
    /// <inheritdoc />
    public partial class AdicionarCamposEncomenda : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CodigoPostal",
                table: "Encomendas",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "EmailCliente",
                table: "Encomendas",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "Localidade",
                table: "Encomendas",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "MoradaEntrega",
                table: "Encomendas",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "NomeCliente",
                table: "Encomendas",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "Notas",
                table: "Encomendas",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "Pais",
                table: "Encomendas",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "Telefone",
                table: "Encomendas",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<decimal>(
                name: "Total",
                table: "Encomendas",
                type: "decimal(65,30)",
                nullable: false,
                defaultValue: 0m);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CodigoPostal",
                table: "Encomendas");

            migrationBuilder.DropColumn(
                name: "EmailCliente",
                table: "Encomendas");

            migrationBuilder.DropColumn(
                name: "Localidade",
                table: "Encomendas");

            migrationBuilder.DropColumn(
                name: "MoradaEntrega",
                table: "Encomendas");

            migrationBuilder.DropColumn(
                name: "NomeCliente",
                table: "Encomendas");

            migrationBuilder.DropColumn(
                name: "Notas",
                table: "Encomendas");

            migrationBuilder.DropColumn(
                name: "Pais",
                table: "Encomendas");

            migrationBuilder.DropColumn(
                name: "Telefone",
                table: "Encomendas");

            migrationBuilder.DropColumn(
                name: "Total",
                table: "Encomendas");
        }
    }
}
