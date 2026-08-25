using Stripe;

namespace FormaFantasia.Web.Services;

public class StripeService
{
    public StripeService(IConfiguration config)
    {
        StripeConfiguration.ApiKey = config["Stripe:SecretKey"];
    }

    public async Task<PaymentIntent> CriarPaymentIntent(decimal valor, string moeda = "eur")
    {
        var options = new PaymentIntentCreateOptions
        {
            Amount = (long)(valor * 100), // Stripe usa cêntimos
            Currency = moeda,
            AutomaticPaymentMethods = new PaymentIntentAutomaticPaymentMethodsOptions
            {
                Enabled = true,
            },
        };

        var service = new PaymentIntentService();
        return await service.CreateAsync(options);
    }
}