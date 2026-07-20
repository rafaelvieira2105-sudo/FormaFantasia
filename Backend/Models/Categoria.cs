namespace FormaFantasia.Web.Models;

public class Categoria
{
    public int Id { get; set;}
    public string Nome { get; set;}
    public string Descricao { get; set;}
    //Tabela Principal (Primary Key "Id"): Os Produtos usam este ID para se organizarem por categoria.

    public string? Slug { get; set;}
    public int? CategoriaPaiId { get; set;}
    
    public Categoria? CategoriaPai {get; set;}

    public ICollection<Categoria> Subcategorias { get; set;} = new List<Categoria>();
}