export default function PagamentoSeguro() {
  return (
    <main>
      <div className="page-hero">
        <div className="page-hero-inner">
          <h1>Pagamento Seguro</h1>
        </div>
      </div>

      <div className="content-body">

        <div className="info-section">
          <h2 className="section-h2">Métodos de Pagamento</h2>
          <div className="prose">
            <p>A FormaFantasia aceita os seguintes métodos de pagamento:</p>
            <ul>
              <li><strong>Multibanco</strong> — referência gerada automaticamente após a encomenda</li>
              <li><strong>MB Way</strong> — pagamento imediato pelo telemóvel</li>
              <li><strong>PayPal</strong> — pagamento seguro com conta PayPal</li>
              <li><strong>Cartão de Crédito/Débito</strong> — Visa, Mastercard e American Express</li>
            </ul>
          </div>
        </div>

        <div className="info-section">
          <h2 className="section-h2">Segurança</h2>
          <div className="prose">
            <p>Todas as transacções são processadas com encriptação SSL. Os dados do seu cartão nunca são armazenados nos nossos servidores.</p>
            <p>Os pagamentos por cartão são processados pela Stripe, uma das plataformas de pagamento mais seguras do mundo.</p>
            <p>Os pagamentos por Multibanco e MB Way são processados pelo IfThenPay, certificado pelo Banco de Portugal.</p>
          </div>
        </div>

        <div className="info-section">
          <h2 className="section-h2">Prazo de Pagamento</h2>
          <div className="prose">
            <p>O pagamento deve ser efectuado no prazo de 48 horas após a realização da encomenda. Caso contrário, a encomenda será automaticamente cancelada.</p>
          </div>
        </div>

      </div>
    </main>
  )
}