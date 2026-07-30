'use client'

import { useState, useEffect } from 'react'

export default function Produtos() {

    const [produtos, setProdutos] = useState([])

    useEffect(() => {
        fetch(`/api/produtos`, { credentials: 'include' })
            .then(res => res.json())
            .then(data => setProdutos(data))
    }, [])

    async function eliminarProduto(id: number) {

        if (!confirm('Tem a certeza que quer eliminar este produto?')) return

        await fetch(`/api/Produtos/${id}`, {
            method: 'DELETE',
            credentials: 'include'
        })
        setProdutos(produtos.filter((p: any) => p.id !== id))
    }

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '28px', fontWeight: 600, color: 'var(--navy)' }}>
                    Produtos
                </h1>
                <a href="/admin/produtos/novo" style={{ padding: '.75rem 1.5rem', background: 'var(--green-cta)', color: 'white', borderRadius: '8px', fontWeight: 600, fontSize: '14px' }}>
                    + Novo Produto
                </a>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse', background: 'var(--white)', borderRadius: '10px', overflow: 'hidden', border: '1px solid var(--border)' }}>
                <thead style={{ background: 'var(--cream-dark)' }}>
                    <tr>
                        <th style={{ padding: '.75rem 1rem', textAlign: 'left', fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Nome</th>
                        <th style={{ padding: '.75rem 1rem', textAlign: 'left', fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Referência</th>
                        <th style={{ padding: '.75rem 1rem', textAlign: 'left', fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Categoria</th>
                        <th style={{ padding: '.75rem 1rem', textAlign: 'left', fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Preço</th>
                        <th style={{ padding: '.75rem 1rem', textAlign: 'left', fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {produtos.map((p: any) => (
                        <tr key={p.id} style={{ borderTop: '1px solid var(--border-light)' }}>
                            <td style={{ padding: '.75rem 1rem', fontSize: '13px' }}>{p.nome}</td>
                            <td style={{ padding: '.75rem 1rem', fontSize: '13px' }}>{p.referencia || '—'}</td>
                            <td style={{ padding: '.75rem 1rem', fontSize: '13px' }}>{p.categoria?.nome || '—'}</td>
                            <td style={{ padding: '.75rem 1rem', fontSize: '13px' }}>{p.preco} €</td>
                            <td style={{ padding: '.75rem 1rem', fontSize: '13px' }}>
                                <a href={`/admin/produtos/${p.id}`} style={{ marginRight: '.5rem', color: 'var(--gold)', fontWeight: 500 }}>Editar</a>
                                <button onClick={() => eliminarProduto(p.id)} style={{ color: '#c0392b', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 500, fontSize: '13px' }}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}