namespace FormaFantasia.Web.Models;

public class Avaliacao
{
    public int Id { get; set;}
    public int ProdutoId { get; set;}
    public string UtilizadorId { get; set;}
    public int Estrelas { get; set;}
    public string? Comentario { get; set;}
    public DateTime Data { get; set;}
    public Produto Produto { get; set; } = null!;
    public Utilizador Utilizador { get; set;} = null;
}