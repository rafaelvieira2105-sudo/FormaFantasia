'use client'

import { useState, useEffect } from 'react'


export default function Destaque() {

    const [destaque, setDestaque] = useState(null)

    useEffect(() => {
        fetch(`/api/Produtos?tag=destaque`)
            .then(res => res.json())
            .then(data => setDestaque(data))
    }, [])

    const [stockoff, setStockoff] = useState([])

    useEffect(() => {
        fetch(`/api/Produtos?tag=stockoff`)
            .then(res => res.json())
            .then(data => setStockoff(data))
    }, [])

    const [promo, setPromo] = useState([])

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
                <a href="/produto/${destaque?.[0]?.id}" className="highlight-card">
                    <div className="highlight-visual hv-greek"></div>
                    <span className="highlight-badge badge-new">Novidade</span>
                    <h3>{destaque?.[0]?.nome}</h3>
                    <p>{destaque?.[0]?.descricao}</p>
                    <span className="highlight-link">
                        Ver produto
                        <svg viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </span>
                </a>
                <a href="/catalogo/stockoff" className="highlight-card">
                    <div className="highlight-visual hv-marble"></div>
                    <span className="highlight-badge badge-promo">Promoção</span>
                    <h3>Stock Off — Liquidação</h3>
                    <p>Artigos em liquidação com descontos até 40%. Enquanto houver stock disponível.</p>
                    <span className="highlight-link">
                        Ver stock off
                        <svg viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </span>
                </a>
                <a href="" className="highlight-card">
                    <div className="highlight-visual hv-floral"></div>
                    <span className="highlight-badge badge-dest">Destaque</span>
                    <h3></h3>
                    <p></p>
                    <span className="highlight-link">
                        Ver produto
                        <svg viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </span>
                </a>
            </div>
        </section>
    )
}