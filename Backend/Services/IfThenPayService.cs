using System.Text;
using System.Text.Json;

namespace FormaFantasia.Web.Services;

public class IfThenPayService
{
    private readonly HttpClient _http;
    private readonly IConfiguration _config;

    public IfThenPayService(HttpClient http, IConfiguration config)
    {
        _http = http;
        _config = config;
    }

    public async Task<MultibankReferencia?> GerarReferenciaMultibanco(int encomendaId, decimal valor)
    {
        var subEntidade = _config["IfThenPay:SubEntidade"];

        var payload = new
        {
            mbkey = subEntidade,
            orderId = encomendaId.ToString(),
            amount = valor.ToString("F2"),
            expiryDays = 3
        };

        var json = JsonSerializer.Serialize(payload);
        var content = new StringContent(json, Encoding.UTF8, "application/json");

        var response = await _http.PostAsync(
            "https://api.ifthenpay.com/multibanco/reference/init",
            content
        );

        if (!response.IsSuccessStatusCode) return null;

        var result = await response.Content.ReadAsStringAsync();
        return JsonSerializer.Deserialize<MultibankReferencia>(result, new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true
        });
    }

    public async Task<MbWayResposta?> PedirPagamentoMbWay(int encomendaId, decimal valor, string telemovel)
    {
        var mbwayKey = _config["IfThenPay:MbWayKey"];

        var payload = new
        {
            mbWayKey = mbwayKey,
            orderId = encomendaId.ToString(),
            amount = valor.ToString("F2"),
            mobileNumber = telemovel,
            email = ""
        };

        var json = JsonSerializer.Serialize(payload);
        var content = new StringContent(json, Encoding.UTF8, "application/json");

        var response = await _http.PostAsync(
            "https://api.ifthenpay.com/spg/payment/mbway",
            content
        );

        if (!response.IsSuccessStatusCode) return null;

        var result = await response.Content.ReadAsStringAsync();
        return JsonSerializer.Deserialize<MbWayResposta>(result, new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true
        });
    }
}

public class MultibankReferencia
{
    public string? Entidade { get; set; }
    public string? Referencia { get; set; }
    public string? ValorTotal { get; set; }
    public string? DataFim { get; set; }
}

public class MbWayResposta
{
    public string? Status { get; set; }
    public string? Message { get; set; }
    public string? RequestId { get; set; }
}