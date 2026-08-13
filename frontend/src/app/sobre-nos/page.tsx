export default function SobreNos() {
  return (
    <main>
      <div className="page-hero">
        <div className="page-hero-inner">
          <h1>Sobre Nós</h1>
        </div>
      </div>

      <div className="content-body">

        <div className="info-section">
          <h2 className="section-h2">A Nossa História</h2>
          <div className="prose">
            <p>A FormaFantasia criou esta loja online para levar até si alguns dos nossos artigos. A Internet é cada vez mais um grande impulsionador da divulgação de produtos, bens e serviços e como tal, graças a essas novas tecnologias, a FormaFantasia achou necessidade de vir preencher um espaço ainda pouco utilizado neste tipo de artigos.</p>
            <p>A nossa montra virtual conta com variados artigos e está em constante actualização para trazer até ao nosso cliente todas as novidades no campo dos acessórios para a aplicação de cortinados, papel de parede, painéis decorativos, vinil e muito mais.</p>
          </div>
        </div>

        <div className="info-section">
          <h2 className="section-h2">A Nossa Loja Física</h2>
          <div className="prose">
            <p><strong>FormaFantasia</strong><br />
            Rua Calouste Gulbenkian, Loja 28 Rch/Dirt<br />
            3080-084 Figueira Da Foz<br />
            Portugal — Coimbra</p>
            <p style={{ marginTop: '.75rem' }}>
              <a href="tel:233429608">233 429 608</a> (Rede Fixa)<br />
              <a href="tel:966092180">966 092 180</a> (Rede Móvel)<br />
              <a href="mailto:Geral@Formafantasia.Pt">Geral@Formafantasia.Pt</a>
            </p>
          </div>
        </div>

        <div className="info-section">
          <h2 className="section-h2">O Que Oferecemos</h2>
          <div className="prose">
            <p>No nosso catálogo encontras uma vasta selecção de produtos para decoração de interiores:</p>
            <ul>
              <li>Papel de parede — infantil, decoração, económico e para cozinha &amp; WC</li>
              <li>Vinil decorativo e impressão digital</li>
              <li>Tapeçarias e tapetes</li>
              <li>Painéis decorativos</li>
              <li>Calhas, varões e acessórios para cortinas</li>
              <li>Tecidos e colas para aplicação</li>
            </ul>
          </div>
        </div>

      </div>
    </main>
  )
}