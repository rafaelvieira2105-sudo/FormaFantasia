using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FormaFantasia.Web.Migrations
{
    /// <inheritdoc />
    public partial class AdicionarEmDestaqueCategorias : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "EmDestaque",
                table: "Categorias",
                type: "tinyint(1)",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EmDestaque",
                table: "Categorias");
        }
    }
}
