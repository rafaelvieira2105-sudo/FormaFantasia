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
                            <img src={destaque[0].fotoUrl} alt={destaque[0].nome} style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px', marginBottom: '1rem' }} />
                        )}
                        <div className="highlight-visual hv-greek"></div>
                        <div className="highlight-visual hv-greek"></div>
                        <span className="highlight-badge badge-new">Novidade</span>
                        <h3>{destaque[0].nome}</h3>
                        <p>{destaque[0].descricao?.substring(0, 100)}</p>
                        <span className="highlight-link">
                            Ver produto
                            <svg viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" /></svg>
                        </span>
                    </a>
                )}
                {stockoff?.[0] && (
                    <a href={`/produto/${stockoff[0].id}`} className="highlight-card">
                        {destaque[0].fotoUrl && (
                            <img src={destaque[0].fotoUrl} alt={destaque[0].nome} style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px', marginBottom: '1rem' }} />
                        )}
                        <div className="highlight-visual hv-greek"></div>
                        <div className="highlight-visual hv-marble"></div>
                        <span className="highlight-badge badge-promo">Stock Off</span>
                        <h3>{stockoff[0].nome}</h3>
                        <p>{stockoff[0].descricao?.substring(0, 100)}</p>
                        <span className="highlight-link">
                            Ver produto
                            <svg viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" /></svg>
                        </span>
                    </a>
                )}
                {promo?.[0] && (
                    <a href={`/produto/${promo[0].id}`} className="highlight-card">
                        {destaque[0].fotoUrl && (
                            <img src={destaque[0].fotoUrl} alt={destaque[0].nome} style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px', marginBottom: '1rem' }} />
                        )}
                        <div className="highlight-visual hv-greek"></div>
                        <div className="highlight-visual hv-floral"></div>
                        <span className="highlight-badge badge-dest">Promoção</span>
                        <h3>{promo[0].nome}</h3>
                        <p>{promo[0].descricao?.substring(0, 100)}</p>
                        <span className="highlight-link">
                            Ver produto
                            <svg viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" /></svg>
                        </span>
                    </a>
                )}
            </div>
        </section>
    )
}