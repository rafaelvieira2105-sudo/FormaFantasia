'use client'

import { Suspense } from 'react'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

function PesquisaConteudo() {
  const [produtos, setProdutos] = useState([])
  const [pesquisa, setPesquisa] = useState('')
  const searchParams = useSearchParams()
  const q = searchParams.get('q') || ''

  useEffect(() => {
    fetch('/api/Produtos')
      .then(res => res.json())
      .then(data => {
        const filtrados = data.filter((p: any) =>
          p.nome.toLowerCase().includes(q.toLowerCase()) ||
          (p.referencia && p.referencia.toLowerCase().includes(q.toLowerCase()))
        )
        setProdutos(filtrados)
        setPesquisa(q)
      })
  }, [q])

  return (
    <main>
      <div className="page-hero">
        <div className="page-hero-inner">
          <h1>Resultados para: "{pesquisa}"</h1>
          <p>{produtos.length} produtos encontrados</p>
        </div>
      </div>
      <div className="section">
        <div className="container">
          <div className="products-grid">
            {produtos.length === 0 ? (
              <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '3rem', gridColumn: '1/-1' }}>
                Nenhum produto encontrado para "{pesquisa}".
              </p>
            ) : (
              produtos.map((p: any) => (
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
              ))
            )}
          </div>
        </div>
      </div>
    </main>
  )
}

export default function Pesquisa() {
  return (
    <Suspense fallback={<div style={{ padding: '2rem', textAlign: 'center' }}>A carregar...</div>}>
      <PesquisaConteudo />
    </Suspense>
  )
}