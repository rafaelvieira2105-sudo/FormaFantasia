using Microsoft.AspNetCore.Mvc;
using FormaFantasia.Web.Data;
using Microsoft.AspNetCore.Authorization;
using FormaFantasia.Web.Models;

namespace FormaFantasia.Web.Controllers;

[ApiController]
[Route("api/[controller]")]
public class HeroImagensController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public HeroImagensController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public IActionResult Get()
    {
        return Ok(_context.HeroImagens.OrderBy(h => h.Ordem).ToList());
    }

    [HttpPost]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Create([FromBody] HeroImagemDto dto)
    {
        var imagem = new HeroImagem
        {
            ImagemUrl = dto.ImagemUrl,
            Ordem = dto.Ordem
        };
        _context.HeroImagens.Add(imagem);
        await _context.SaveChangesAsync();
        return Ok(imagem);
    }

    [HttpDelete("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Delete(int id)
    {
        var imagem = await _context.HeroImagens.FindAsync(id);
        if (imagem == null) return NotFound();
        _context.HeroImagens.Remove(imagem);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}

public class HeroImagemDto
{
    public string ImagemUrl { get; set; } = string.Empty;
    public int Ordem { get; set; }
}