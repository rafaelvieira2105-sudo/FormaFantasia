using Microsoft.AspNetCore.Mvc;
using FormaFantasia.Web.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

namespace FormaFantasia.Web.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProdutosController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public ProdutosController(ApplicationDbContext context)
    {
        _context = context;
    }

    // GET /api/Produtos
    [HttpGet]
    public IActionResult Get([FromQuery] string? tag, [FromQuery] int? categoriaId, [FromQuery] string? slug)
    {
        var query = _context.Produtos.Include(p => p.Categoria).AsQueryable();

        if (!string.IsNullOrEmpty(tag))
            query = query.Where(p => p.Tag == tag);

        if (categoriaId.HasValue)
            query = query.Where(p => p.CategoriaId == categoriaId.Value);

        if (!string.IsNullOrEmpty(slug))
            query = query.Where(p => p.Categoria != null && p.Categoria.Slug == slug);

        return Ok(query.ToList());
    }

    // GET /api/Produtos/5
    [HttpGet("{id}")]
    public IActionResult GetById(int id)
    {
        var produto = _context.Produtos
            .Include(p => p.Categoria)
            .FirstOrDefault(p => p.Id == id);
        if (produto == null) return NotFound();
        return Ok(produto);
    }

    // POST /api/Produtos
    [HttpPost]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Create([FromBody] ProdutoDto dto)
    {
        var produto = new FormaFantasia.Web.Models.Produto
        {
            Nome = dto.Nome,
            Descricao = dto.Descricao,
            Preco = dto.Preco,
            Stock = dto.Stock,
            CategoriaId = dto.CategoriaId,
            Referencia = dto.Referencia,
            FotoUrl = dto.FotoUrl,
            Tag = dto.Tag,
            PrecoOriginal = dto.PrecoOriginal
        };
        _context.Produtos.Add(produto);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetById), new { id = produto.Id }, produto);
    }

    // PUT /api/Produtos/5
    [HttpPut("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Update(int id, [FromBody] ProdutoDto dto)
    {
        var produto = await _context.Produtos.FindAsync(id);
        if (produto == null) return NotFound();

        produto.Nome = dto.Nome;
        produto.Descricao = dto.Descricao;
        produto.Preco = dto.Preco;
        produto.Stock = dto.Stock;
        produto.CategoriaId = dto.CategoriaId;
        produto.Referencia = dto.Referencia;
        produto.FotoUrl = dto.FotoUrl;
        produto.Tag = dto.Tag;
        produto.PrecoOriginal = dto.PrecoOriginal;

        await _context.SaveChangesAsync();
        return Ok(produto);
    }

    // DELETE /api/Produtos/5
    [HttpDelete("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Delete(int id)
    {
        var produto = await _context.Produtos.FindAsync(id);
        if (produto == null) return NotFound();
        _context.Produtos.Remove(produto);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}

public class ProdutoDto
{
    public string Nome { get; set; } = string.Empty;
    public string Descricao { get; set; } = string.Empty;
    public decimal Preco { get; set; }
    public int Stock { get; set; }
    public int CategoriaId { get; set; }
    public string? Referencia { get; set; }
    public string? FotoUrl { get; set; }
    public string? Tag { get; set; }
    public decimal? PrecoOriginal { get; set; }
}