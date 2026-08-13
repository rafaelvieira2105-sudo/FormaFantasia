export default function Contactos() {
  return (
    <main>
      <div className="page-hero">
        <div className="page-hero-inner">
          <h1>Contactos</h1>
        </div>
      </div>

      <div className="content-body">

        <div className="info-section">
          <h2 className="section-h2">Loja Física</h2>
          <div className="prose">
            <p><strong>FormaFantasia</strong><br />
            Rua Calouste Gulbenkian, Loja 28 Rch/Dirt<br />
            3080-084 Figueira Da Foz<br />
            Portugal — Coimbra</p>
          </div>
        </div>

        <div className="info-section">
          <h2 className="section-h2">Contactos</h2>
          <div className="prose">
            <p><strong>Telefone:</strong> <a href="tel:233429608">233 429 608</a> (Rede Fixa)</p>
            <p><strong>Telemóvel:</strong> <a href="tel:966092180">966 092 180</a> (Rede Móvel)</p>
            <p><strong>Email:</strong> <a href="mailto:Geral@formafantasia.pt">Geral@formafantasia.pt</a></p>
          </div>
        </div>

        <div className="info-section">
          <h2 className="section-h2">Horário</h2>
          <div className="prose">
            <p><strong>Segunda a Sexta:</strong> 09h00 — 18h00</p>
            <p><strong>Sábado:</strong> 09h00 — 13h00</p>
            <p><strong>Domingo e Feriados:</strong> Encerrado</p>
            <p style={{ marginTop: '.75rem' }}>A loja online está disponível 24 horas por dia, 7 dias por semana.</p>
          </div>
        </div>

      </div>
    </main>
  )
}