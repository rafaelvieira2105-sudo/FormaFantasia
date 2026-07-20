namespace FormaFantasia.Web.Models;

public class Produto
{
    public int Id { get; set;}
    public string Nome { get; set;}
    public string Descricao { get; set;}
    public decimal Preco {get; set;}
    public int Stock {get; set;}

    //Chave estrangeira, liga o produto à categoria a que pertence
    public int CategoriaId {get; set;}
    //Propriedade de navegação, permite aceder à categoria do produto
    public Categoria? Categoria { get; set;}

    public string? Referencia { get; set; }

    public string? FotoUrl { get; set;}

    public string? Tag { get; set;}

    public decimal? PrecoOriginal { get; set;}
}