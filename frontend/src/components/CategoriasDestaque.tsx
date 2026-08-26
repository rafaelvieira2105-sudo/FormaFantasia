'use client'

import { useEffect, useState } from 'react'
import { useWishList } from '@/context/WishListContext'

export default function CategoriasDestaque() {

    const [categorias, setCategorias] = useState([])
    const { toggleItem, itens: itensWishlist } = useWishList()

    useEffect(() => {
        fetch(`/api/Categorias`)
            .then(res => res.json())
            .then(data => setCategorias(data))
    }, [])

    const [produtos, setProdutos] = useState([])

    useEffect(() => {
        fetch(`/api/Produtos`)
            .then(res => res.json())
            .then(data => setProdutos(data))
    }, [])

    const [categoriaAtiva, setCategoriaAtiva] = useState('todos')

    const produtosFiltrados = (categoriaAtiva === 'todos'
        ? produtos
        : produtos.filter((p: any) => p.categoria?.slug === categoriaAtiva)
    ).slice(0,24)
    
    return (
        <section className="section products-section" style={{ paddingTop: '5rem', paddingBottom: '5rem' }}>
            <div className="container">
                <div className="section-header">
                    <p className="section-eyebrow">Catálogo</p>
                    <h2 className="section-title">Explorar por Categoria</h2>
                    <p className="section-subtitle">Filtra por categoria e clica num produto para ver os detalhes</p>
                </div>
            </div>
            <div className="products-filter">
                <button
                    className={categoriaAtiva === 'todos' ? "filter-btn active" : "filter-btn"}
                    onClick={() => setCategoriaAtiva('todos')}
                >
                    Todos
                </button>
                {categorias.map((cat: any) => !cat.categoriaPaiId).map((cat: any) =>(
                    <button
                        key={cat.id}
                        className={categoriaAtiva === cat.slug ? 'filter-btn active' : 'filter-btn'}
                        onClick={() => setCategoriaAtiva(cat.slug)}
                    >
                        {cat.nome}
                    </button>
                ))}
            </div>
            <div className="products-grid">
                {produtosFiltrados.map((p: any) => (
                    <a key={p.id} href={`/produto/${p.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <div key={p.id} className="product-card">
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
        </section>
    )
}