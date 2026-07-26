export default function Valores() {
    return (
        <section className="values-section">
            <div className="container">
                <div className="values-grid">
                    <div className="value-item">
                        <div className="value-icon">
                            <svg viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h3 className="value-title">Envios Internacionais</h3>
                        <p className="value-desc">Entregamos em toda a Europa com transportadora certificada. Embalagem reforçada para
                            máxima proteção.</p>
                    </div>
                    <div className="value-item">
                        <div className="value-icon">
                            <svg viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                    d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <h3 className="value-title">Encomendas Online</h3>
                        <p className="value-desc">Catálogo completo disponível 24 horas, 7 dias por semana. Rastreio em tempo real da tua
                            encomenda.</p>
                    </div>
                    <div className="value-item">
                        <div className="value-icon">
                            <svg viewBox="0 0 24 24">
                                <rect x="2" y="5" width="20" height="14" rx="2" />
                                <line x1="2" y1="10" x2="22" y2="10" />
                            </svg>
                        </div>
                        <h3 className="value-title">Multibanco Disponível</h3>
                        <p className="value-desc">Aceita Multibanco, MB Way, transferência bancária e PayPal. Pagamento 100% seguro e
                            encriptado.</p>
                    </div>
                </div>
            </div>
        </section>
    )
}