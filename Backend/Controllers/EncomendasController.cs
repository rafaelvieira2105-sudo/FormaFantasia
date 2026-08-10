using Microsoft.AspNetCore.Mvc;
using FormaFantasia.Web.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using FormaFantasia.Web.Models;

namespace FormaFantasia.Web.Controllers;

// Controlador responsável por gerir as Encomendas (API)
[ApiController]
[Route("api/[controller]")]
public class EncomendasController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    //Injeção de dependência da base de dados
    public EncomendasController(ApplicationDbContext context)
    {
        _context = context;
    }

    // GET /api/Encomendas — todas (admin)
    //Vai á Base de Dados buscar o histórico de encomendas. 
    //o Include e ThenInclude fazem os JOINs necessários para trazer os detalhes dos itens, os produtos e os dados de quem comprou
    [HttpGet]
    [Authorize(Roles = "Admin")]
    public IActionResult Get()
    {
        return Ok(_context.Encomendas
            .Include(e => e.ItensEncomenda).ThenInclude(i => i.Produto)
            .Include(e => e.Utilizador)
            .OrderByDescending(e => e.Data)
            .ToList());
    }

    // GET /api/Encomendas/5
    //Vai buscar os detalhes de uma encomenda pelo seu ID
    [HttpGet("{id}")]
    [Authorize]
    public IActionResult Get(int id)
    {
        var encomenda = _context.Encomendas
            .Include(e => e.ItensEncomenda).ThenInclude(i => i.Produto)
            .Include(e => e.Utilizador)
            .FirstOrDefault(e => e.Id == id);
        if (encomenda == null) return NotFound();
        return Ok(encomenda);
    }

    // GET /api/Encomendas/minhas — encomendas do utilizador autenticado
    //Retorna as encomendas do utilizador autentcado.
    [HttpGet("minhas")]
    [Authorize]
    public async Task<IActionResult> GetMinhas()
    {
        //identifica o ID do utlizador através do token de sessão ativo
        var userId = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
        if (userId == null) return Unauthorized();

        //Filtra a lista para apresentar apenas onde o UtilizadorId corresponde ao utlizador autenticado
        var encomendas = await _context.Encomendas
            .Include(e => e.ItensEncomenda).ThenInclude(i => i.Produto)
            .Where(e => e.UtilizadorId == userId)
            .OrderByDescending(e => e.Data)
            .ToListAsync();

        return Ok(encomendas);
    }

    // PUT /api/Encomendas/5/estado — atualizar estado (admin)
    [HttpPut("{id}/estado")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> UpdateEstado(int id, [FromBody] EstadoDto dto)
    {
        var encomenda = await _context.Encomendas.FindAsync(id);
        if (encomenda == null) return NotFound();
        encomenda.Estado = dto.Estado;
        await _context.SaveChangesAsync();
        return Ok(encomenda);
    }

    // DELETE /api/Encomendas/5
    //Apaga uma encomenda e os seus itens associados (admin)
    [HttpDelete("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Delete(int id)
    {
        var encomenda = await _context.Encomendas
            .Include(e => e.ItensEncomenda)
            .FirstOrDefaultAsync(e => e.Id == id);
        if (encomenda == null) return NotFound();
        //remove primeiro as linhas "filhas" para não causar erro de integridade referencial (chave estrangeira)
        _context.ItensEncomenda.RemoveRange(encomenda.ItensEncomenda);
        _context.Encomendas.Remove(encomenda);
        await _context.SaveChangesAsync();
        return NoContent();
    }

    // POST /api/Encomendas — criar encomenda
    [HttpPost]
    [Authorize]
    public async Task<IActionResult> Create([FromBody] EncomendaDto dto)
    {
        var userId = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
        if (userId == null) return Unauthorized();

        var encomenda = new Encomenda
        {
            Data = DateTime.UtcNow,
            Estado = "pendente",
            UtilizadorId = userId,
            NomeCliente = dto.NomeCliente,
            EmailCliente = dto.EmailCliente,
            Telefone = dto.Telefone,
            MoradaEntrega = dto.MoradaEntrega,
            Localidade = dto.Localidade,
            CodigoPostal = dto.CodigoPostal,
            Pais = dto.Pais,
            Notas = dto.Notas,
            Total = dto.Total
        };

        foreach (var item in dto.Itens)
        {
            encomenda.ItensEncomenda.Add(new ItemEncomenda
            {
                ProdutoId = item.ProdutoId,
                Quantidade = item.Quantidade,
                PrecoUnitario = item.PrecoUnitario
            });

            // Reduzir stock
            var produto = await _context.Produtos.FindAsync(item.ProdutoId);
            if (produto != null)
                produto.Stock -= item.Quantidade;
        }

        _context.Encomendas.Add(encomenda);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(Get), new { id = encomenda.Id }, encomenda);
    }
}

public class EstadoDto
{
    public string Estado { get; set; } = string.Empty;
}

public class EncomendaDto
{
    public string NomeCliente { get; set; } = string.Empty;
    public string EmailCliente { get; set; } = string.Empty;
    public string Telefone { get; set; } = string.Empty;
    public string MoradaEntrega { get; set; } = string.Empty;
    public string Localidade { get; set; } = string.Empty;
    public string CodigoPostal { get; set; } = string.Empty;
    public string Pais { get; set; } = string.Empty;
    public string? Notas { get; set; }
    public decimal Total { get; set; }
    public List<ItemEncomendaDto> Itens { get; set; } = new();
}

public class ItemEncomendaDto
{
    public int ProdutoId { get; set; }
    public int Quantidade { get; set; }
    public decimal PrecoUnitario { get; set; }
}