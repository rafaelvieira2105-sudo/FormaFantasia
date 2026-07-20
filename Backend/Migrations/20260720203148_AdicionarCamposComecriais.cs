using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FormaFantasia.Web.Migrations
{
    /// <inheritdoc />
    public partial class AdicionarCamposComecriais : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "FotoUrl",
                table: "Produtos",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<decimal>(
                name: "PrecoOriginal",
                table: "Produtos",
                type: "decimal(65,30)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Referencia",
                table: "Produtos",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "Tag",
                table: "Produtos",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<int>(
                name: "CategoriaPaiId",
                table: "Categorias",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Slug",
                table: "Categorias",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_Categorias_CategoriaPaiId",
                table: "Categorias",
                column: "CategoriaPaiId");

            migrationBuilder.AddForeignKey(
                name: "FK_Categorias_Categorias_CategoriaPaiId",
                table: "Categorias",
                column: "CategoriaPaiId",
                principalTable: "Categorias",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Categorias_Categorias_CategoriaPaiId",
                table: "Categorias");

            migrationBuilder.DropIndex(
                name: "IX_Categorias_CategoriaPaiId",
                table: "Categorias");

            migrationBuilder.DropColumn(
                name: "FotoUrl",
                table: "Produtos");

            migrationBuilder.DropColumn(
                name: "PrecoOriginal",
                table: "Produtos");

            migrationBuilder.DropColumn(
                name: "Referencia",
                table: "Produtos");

            migrationBuilder.DropColumn(
                name: "Tag",
                table: "Produtos");

            migrationBuilder.DropColumn(
                name: "CategoriaPaiId",
                table: "Categorias");

            migrationBuilder.DropColumn(
                name: "Slug",
                table: "Categorias");
        }
    }
}
