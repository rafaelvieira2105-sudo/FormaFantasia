'use client'

import { useState, useEffect } from 'react'


export default function Destaque() {

    const [destaque, setDestaque] = useState<any>([])


    useEffect(() => {
        fetch(`/api/Produtos?tag=destaque`)
            .then(res => res.json())
            .then(data => setDestaque(data))
    }, [])

    const [stockoff, setStockoff] = useState<any>([])

    useEffect(() => {
        fetch(`/api/Produtos?tag=stockoff`)
            .then(res => res.json())
            .then(data => setStockoff(data))
    }, [])

    const [promo, setPromo] = useState<any>([])

    useEffect(() => {
        fetch(`/api/Produtos?tag=promo`)
            .then(res => res.json())
            .then(data => setPromo(data))
    }, [])

    const [emDestaque, setEmDestaque] = useState(null)

    useEffect(() => {
        fetch(`/api/Categorias/destaque`)
            .then(res => res.json())
            .then(data => setEmDestaque(data))
    }, [])

    return (
        <section className="highlights-strip">
            <div className="highlights-inner">
                {destaque?.[0] && (
                    <a href={`/produto/${destaque[0].id}`} className="highlight-card">
                        {destaque[0].fotoUrl && (
                            <img src={destaque[0].fotoUrl} alt={destaque[0].nome} style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '8px', marginBottom: '1rem' }} />
                        )}
                        <span className="highlight-badge badge-new">Em Destaque</span>
                        <h3>{destaque[0].nome}</h3>
                        <span className="highlight-link">Ver produto →</span>
                    </a>
                )}
                <a href="/catalogo/papel-de-parede" className="highlight-card">
                    <div className="highlight-visual hv-marble"></div>
                    <span className="highlight-badge badge-promo">Novidades</span>
                    <h3>Papel de Parede</h3>
                    <p>Descobre as últimas novidades em papel de parede decorativo.</p>
                    <span className="highlight-link">Ver catálogo →</span>
                </a>
                <a href="/catalogo/vinil-decorativo" className="highlight-card">
                    <div className="highlight-visual hv-floral"></div>
                    <span className="highlight-badge badge-dest">Popular</span>
                    <h3>Vinil Decorativo</h3>
                    <p>Transforma qualquer superfície com vinil decorativo de qualidade.</p>
                    <span className="highlight-link">Ver catálogo →</span>
                </a>
            </div>
        </section>
    )
}