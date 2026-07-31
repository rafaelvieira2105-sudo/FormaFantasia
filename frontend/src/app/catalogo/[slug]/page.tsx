'use client'

import { useState, useEffect } from 'react'


export default function PaginaCatalogo({ params }: { params: { slug: string } }) {

    const [categoria, setCategoria] = useState<any>(null)
    const [produtos, setProdutos] = useState([])

    useEffect(() => {
        fetch(`/api/Categorias/slug/${params.slug}`)
            .then(res => res.json())
            .then(data => setCategoria(data))
    }, [])

    useEffect(() => {
        fetch(`/api/Produtos?slug=${params.slug}`)
            .then(res => res.json())
            .then(data => setProdutos(data))
    }, [])

    return (
        <main>
            <div className="page-hero">
                <div className="page-hero-inner">
                    <h1>{categoria?.nome || 'Catálogo'}</h1>
                    <p>{categoria?.descricao || ''}</p>
                </div>
            </div>

            <div className="section">
                <div className="container">
                    {produtos.length === 0 ? (
                        <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '3rem' }}>
                            Nenhum produto encontrado nesta categoria.
                        </p>
                    ) : (
                        <div className="products-grid">
                            {produtos.map((p: any) => (
                                <a key={p.id} href={`/produto/${p.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <div className="product-card">
                                        <div className="product-card-img">
                                            {p.fotoUrl ? (
                                                <img src={p.fotoUrl} alt={p.nome} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                            ) : (
                                                <div style={{ width: '100%', height: '100%', background: 'var(--cream-dark)' }} />
                                            )}
                                        </div>
                                        <div className="product-card-body">
                                            <div className="product-card-category">{p.categoria?.nome}</div>
                                            <div className="product-card-name">{p.nome}</div>
                                            <div className="product-card-ref">Ref. {p.referencia || 'N/A'}</div>
                                            <div className="product-card-footer">
                                                <div className="product-card-price">{p.preco} €</div>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </main>
    )
}