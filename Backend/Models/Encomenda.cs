namespace FormaFantasia.Web.Models;

public class Encomenda
{
    public int Id { get; set; }
    public DateTime Data { get; set; }
    public string Estado { get; set; } = string.Empty;
    //Chave Estrangeira, liga a encomenda ao utilizador que a fez
    public string UtilizadorId { get; set; } = string.Empty;
    public Utilizador Utilizador { get; set; }
    // Relação 1:N com ItensEncomenda, uma encomenda pode ter vários itens
    public ICollection<ItemEncomenda> ItensEncomenda { get; set; } = new List<ItemEncomenda>();

    public string? NomeCliente { get; set; }
    public string? EmailCliente { get; set; }
    public string? Telefone { get; set; }
    public string? MoradaEntrega { get; set; }
    public string? Localidade { get; set; }
    public string? CodigoPostal { get; set; }
    public string? Pais { get; set; }
    public string? Notas { get; set; }
    public decimal Total { get; set; }
    public string? MetodoEnvio { get; set;}
    public decimal CustoEnvio { get; set;}
}