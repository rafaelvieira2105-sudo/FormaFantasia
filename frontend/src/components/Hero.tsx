export default function Hero() {
    return (
        <section className="hero">
            <div className="hero-inner">
                <div className="hero-content">
                    <p className="hero-eyebrow">Coleção 2026</p>
                    <h1 className="hero-title">Transforma<br />as tuas <em>paredes</em><br />em arte</h1>
                    <p className="hero-subtitle">Papel de parede de luxo, vinil decorativo e tapeçarias exclusivas para cada ambiente.
                        Mais de 2000 referências disponíveis.</p>
                    <div className="hero-ctas">
                        <a href="catalogo-hub.html" className="btn-primary">
                            <svg viewBox="0 0 24 24" style={{ width: '14px', height: '14px', stroke: 'currentColor', fill: 'none', strokeWidth: 2.5 }}>
                                <rect x="3" y="3" width="7" height="7" />
                                <rect x="14" y="3" width="7" height="7" />
                                <rect x="14" y="14" width="7" height="7" />
                                <rect x="3" y="14" width="7" height="7" />
                            </svg>
                            Ver Catálogo
                        </a>
                        <a href="sobre-nos.html" className="btn-secondary">
                            <svg viewBox="0 0 24 24" style={{ width: '14px', height: '14px', stroke: 'currentColor', fill: 'none', strokeWidth: 2 }}>
                                <path strokeLinecap="round" strokeLinejoin="round"
                                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Sobre Nós
                        </a>
                    </div>
                </div>
                <div className="hero-visual" aria-hidden="true">
                    <div className="hero-visual-grid">
                        <div className="hero-swatch pattern-greek"></div>
                        <div className="hero-swatch pattern-waves"></div>
                        <div className="hero-swatch pattern-damask"></div>
                        <div className="hero-swatch pattern-geometric"></div>
                    </div>
                </div>
            </div>
        </section>
    )
}