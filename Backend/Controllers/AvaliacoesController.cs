using Microsoft.AspNetCore.Mvc;
using FormaFantasia.Web.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using FormaFantasia.Web.Models;

namespace FormaFantasia.Web.Controllers;

[ApiController]
[Route("/api/[controller]")]
public class AvaliacoesController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public AvaliacoesController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public IActionResult Get([FromQuery] int produtoId)
    {
        var avaliacoes = _context.Avaliacoes
            .Include(a => a.Utilizador)
            .Where(a => a.ProdutoId == produtoId)
            .OrderByDescending(a => a.Data)
            .ToList();

        return Ok(avaliacoes);
    }

    [HttpPost]
    [Authorize]
    public async Task<IActionResult> Create([FromBody] AvaliacaoDto dto)
    {
        var userId = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
        if (userId == null) return Unauthorized();

        var avaliacao = new Avaliacao
        {
            ProdutoId = dto.ProdutoId,
            UtilizadorId = userId,
            Estrelas = dto.Estrelas,
            Comentario = dto.Comentario,
            Data = DateTime.UtcNow
        };

        _context.Avaliacoes.Add(avaliacao);
        await _context.SaveChangesAsync();
        return Ok(avaliacao);
    }

}

public class AvaliacaoDto
{
    public int ProdutoId { get; set; }
    public int Estrelas { get; set; }
    public string? Comentario { get; set; }
}