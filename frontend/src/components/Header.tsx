'use client'

import { useEffect, useState } from 'react'

export default function Header() {

    const [categorias, setCategorias] = useState([])

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/Categorias`)
            .then(res => res.json())
            .then(data => setCategorias(data))
    }, [])

    return (
        <header>
            <div className="header-top">
                Envios Internacionais Disponíveis - <a href="/condicoes">Saiba mais</a>
            </div>
            <div className="header-main">
                <a href="/" className="logo">Forma<span>Fantasia</span></a>
                <nav aria-label="Navegação principal">

                    {categorias
                        .filter((cat: any) => !cat.categoriaPaiId)
                        .map((cat: any) => (
                            <a key={cat.id} href={`/catalogo/${cat.slug}`}>{cat.nome}</a>
                        ))}
                </nav>
                <div className="header-actions">
                    <div className="search-wrapper">
                        <input type="search" placeholder="Buscar..." autoComplete="off" />
                        <button aria-label="Pesquisar">
                            <svg viewBox="0 0 24 24" style={{ width: '16px', height: '16px', stroke: 'currentColor', fill: 'none', strokeWidth: 2 }}>
                                <circle cx="11" cy="11" r="8" />
                                <path strokeLinecap="round" d="m21 21-4.35-4.35" />
                            </svg>
                        </button>
                    </div>
                    <button className="icon-btn" aria-label="Lista de desejos" title="Lista de desejos">
                        <svg viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                        </svg>
                        <span className="badge" style={{ display: 'none' }}>0</span>
                    </button>
                    <button className="icon-btn" aria-label="Carrinho de compras" title="Carrinho">
                        <svg viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                            <line x1="3" y1="6" x2="21" y2="6" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16 10a4 4 0 01-8 0" />
                        </svg>
                        <span className="badge" style={{ display: 'none' }}>0</span>
                    </button>
                    <a href="/login" className="icon-btn" aria-label="Conta" title="A minha conta" style={{ textDecoration: 'none' }}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="8" r="4" />
                            <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                        </svg>
                    </a>
                </div>
            </div>
        </header>
    )
}