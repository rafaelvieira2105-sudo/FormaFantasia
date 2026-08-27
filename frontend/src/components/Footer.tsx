export default function Footer() {
  return (
    <footer>
      <div className="footer-main">
        <div className="footer-col">
          <div className="footer-col-title">Aplicações</div>
          <ul>
            <li><a href="/aplicar-papel">Aplicar Papel De Parede</a></li>
            <li><a href="/aplicar-paineis">Aplicar Painéis Decorativos</a></li>
            <li><a href="/aplicar-vinil">Aplicar Vinil Decorativo</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <div className="footer-col-title">Informação</div>
          <ul>
            <li><a href="/condicoes">Condições</a></li>
            <li><a href="/condicoes-uso">Condições De Uso</a></li>
            <li><a href="/sobre-nos">Sobre Nós</a></li>
            <li><a href="/pagamento-seguro">Pagamento Seguro</a></li>
            <li><a href="/contactos">Contactos</a></li>
            <li><a href="/devolucoes">Devoluções</a></li>
            <li><a href="/reclamacoes">Livro De Reclamações</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <div className="footer-col-title">Área De Cliente</div>
          <ul>
            <li><a href="/conta">Informação Pessoal</a></li>
            <li><a href="/conta">Encomendas</a></li>
            <li><a href="/conta">Notas De Crédito</a></li>
            <li><a href="/conta">Endereços</a></li>
            <li><a href="/conta">Vales De Desconto</a></li>
            <li><a href="/conta">Meus Alertas</a></li>
            <li><a href="/cookies">Política De Cookies</a></li>
          </ul>
        </div>
        <div className="footer-col footer-contact">
          <div className="footer-col-title">Contacte-Nos</div>
          <p>
            FormaFantasia<br />
            Rua Calouste Gulbenkian, Loja 28 Rch/Dirt<br />
            3080-084 Figueira Da Foz<br />
            Portugal — Coimbra
          </p>
          <p style={{ marginTop: '.75rem' }}>
            <a href="tel:233429608">233 429 608</a> (Rede Fixa)<br />
            <a href="tel:966092180">966 092 180</a> (Rede Móvel)<br />
            <a href="mailto:Geral@Formafantasia.Pt">Geral@Formafantasia.Pt</a>
          </p>
        </div>
      </div>
      <div className="footer-bottom">
        <span className="footer-bottom-left">&copy; 2026 FormaFantasia. Todos os direitos reservados.</span>
        <div className="payment-icons">
          <span className="payment-icon">MB WAY</span>
          <span className="payment-icon">Multibanco</span>
          <span className="payment-icon">Transf. Bancária</span>
          <span className="payment-icon">PayPal</span>
        </div>
        <div className="secure-badges">
          <span className="secure-badge">Loja Protegida SSL</span>
          <span className="secure-badge">Comodo Secure</span>
        </div>
      </div>
    </footer>
  )
}