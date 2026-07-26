'use client'

import { useEffect, useState } from 'react'

export default function CategoriasDestaque() {

    const [categorias, setCategorias] = useState([])

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/Categorias`)
            .then(res => res.json())
            .then(data => setCategorias(data))
    }, [])

    const [produtos, setProdutos] = useState([])

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/Produtos`)
            .then(res => res.json())
            .then(data => setProdutos(data))
    }, [])

    const [categoriaAtiva, setCategoriaAtiva] = useState('todos')

    const produtosFiltrados = categoriaAtiva === 'todos'
        ? produtos
        : produtos.filter((p: any) => p.categoria?.slug === categoriaAtiva)

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
                {categorias.map((cat: any) => (
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
                    <div key={p.id} className="product-card">
                        <div className="product-card-img">
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
                ))}
            </div>
        </section>
    )
}