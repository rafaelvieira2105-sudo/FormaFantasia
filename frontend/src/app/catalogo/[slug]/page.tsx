'use client'

import { useState, useEffect } from 'react'
import { useWishList } from '@/context/WishListContext'


export default function PaginaCatalogo({ params }: { params: { slug: string } }) {

    const [categoria, setCategoria] = useState<any>(null)
    const [produtos, setProdutos] = useState([])
    const { toggleItem, itens: itensWishlist } = useWishList()

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
                                            <button
                                                className="icon-btn"
                                                onClick={(e) => {
                                                    e.preventDefault()
                                                    toggleItem({ id: p.id, nome: p.nome, preco: p.preco, fotoUrl: p.fotoUrl })
                                                }}
                                                style={{ position: 'absolute', top: '.5rem', right: '.5rem', background: 'var(--white)', borderRadius: '50%' }}
                                            >
                                                <svg viewBox="0 0 24 24" fill={itensWishlist.some((i: any) => i.id === p.id) ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                                                </svg>
                                            </button>
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