using Microsoft.AspNetCore.Mvc;
using FormaFantasia.Web.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

namespace FormaFantasia.Web.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CategoriasController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public CategoriasController(ApplicationDbContext context)
    {
        _context = context;
    }

    // GET /api/Categorias
    // Devolve todas as categorias com a sua categoria pai incluída
    [HttpGet]
    public IActionResult Get()
    {
        var categorias = _context.Categorias
            .Include(c => c.CategoriaPai)
            .Include(c => c.Subcategorias)
            .ToList();
        return Ok(categorias);
    }

    // GET /api/Categorias/5
    [HttpGet("{id}")]
    public IActionResult GetById(int id)
    {
        var categoria = _context.Categorias
            .Include(c => c.CategoriaPai)
            .Include(c => c.Subcategorias)
            .FirstOrDefault(c => c.Id == id);
        if (categoria == null) return NotFound();
        return Ok(categoria);
    }

    // GET /api/Categorias/slug/papel-decoracao
    [HttpGet("slug/{slug}")]
    public IActionResult GetBySlug(string slug)
    {
        var categoria = _context.Categorias
            .Include(c => c.CategoriaPai)
            .Include(c => c.Subcategorias)
            .FirstOrDefault(c => c.Slug == slug);
        if (categoria == null) return NotFound();
        return Ok(categoria);
    }

    // POST /api/Categorias
    [HttpPost]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Create([FromBody] CategoriaDto dto)
    {
        // Gerar slug automaticamente se não for fornecido
        var slug = string.IsNullOrEmpty(dto.Slug)
            ? GerarSlug(dto.Nome)
            : dto.Slug;

        var categoria = new FormaFantasia.Web.Models.Categoria
        {
            Nome = dto.Nome,
            Descricao = dto.Descricao,
            Slug = slug,
            CategoriaPaiId = dto.CategoriaPaiId
        };
        _context.Categorias.Add(categoria);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetById), new { id = categoria.Id }, categoria);
    }

    // PUT /api/Categorias/5
    [HttpPut("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Update(int id, [FromBody] CategoriaDto dto)
    {
        var categoria = await _context.Categorias.FindAsync(id);
        if (categoria == null) return NotFound();

        categoria.Nome = dto.Nome;
        categoria.Descricao = dto.Descricao;
        categoria.Slug = string.IsNullOrEmpty(dto.Slug) ? GerarSlug(dto.Nome) : dto.Slug;
        categoria.CategoriaPaiId = dto.CategoriaPaiId;

        await _context.SaveChangesAsync();
        return Ok(categoria);
    }

    // DELETE /api/Categorias/5
    [HttpDelete("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Delete(int id)
    {
        var categoria = await _context.Categorias.FindAsync(id);
        if (categoria == null) return NotFound();
        _context.Categorias.Remove(categoria);
        await _context.SaveChangesAsync();
        return NoContent();
    }

    // Gerar slug a partir do nome (ex: "Papel de Parede" -> "papel-de-parede")
    private static string GerarSlug(string nome)
    {
        return nome.ToLower()
            .Replace(" ", "-")
            .Replace("ã", "a").Replace("â", "a").Replace("á", "a").Replace("à", "a")
            .Replace("é", "e").Replace("ê", "e").Replace("è", "e")
            .Replace("í", "i").Replace("î", "i")
            .Replace("ó", "o").Replace("ô", "o").Replace("õ", "o")
            .Replace("ú", "u").Replace("û", "u")
            .Replace("ç", "c")
            .Replace("ñ", "n");
    }
}

public class CategoriaDto
{
    public string Nome { get; set; } = string.Empty;
    public string Descricao { get; set; } = string.Empty;
    public string? Slug { get; set; }
    public int? CategoriaPaiId { get; set; }
}