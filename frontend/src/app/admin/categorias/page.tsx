'use client'

import { useState, useEffect } from 'react'

export default function Categorias() {

    const [categorias, setCategorias] = useState([])

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categorias`, { credentials: 'include' })
            .then(res => res.json())
            .then(data => setCategorias(data))
    })

    async function eliminarCategoria(id: number) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/Produtos?categoriaId=${id}`, { credentials: 'include' })
        const produtos = await res.json()

        if (produtos.length > 0) {
            alert('Não podes eliminar esta categoria porque tem produtos associados.')
            return
        }

        if (!confirm('Tens a certeza que queres eliminar esta categoria?')) return

        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/Categorias/${id}`, {
            method: 'DELETE',
            credentials: 'include'
        })
        setCategorias(categorias.filter((c: any) => c.id !== id))
    }

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '28px', fontWeight: 600, color: 'var(--navy)' }}>
                    Categorias
                </h1>
                <a href="/admin/categorias/nova" style={{ padding: '.75rem 1.5rem', background: 'var(--green-cta)', color: 'white', borderRadius: '8px', fontWeight: 600, fontSize: '14px' }}>
                    + Nova Categoria
                </a>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse', background: 'var(--white)', borderRadius: '10px', overflow: 'hidden', border: '1px solid var(--border)' }}>
                <thead style={{ background: 'var(--cream-dark)' }}>
                    <tr>
                        <th style={{ padding: '.75rem 1rem', textAlign: 'left', fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Nome</th>
                        <th style={{ padding: '.75rem 1rem', textAlign: 'left', fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Slug</th>
                        <th style={{ padding: '.75rem 1rem', textAlign: 'left', fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Categoria Pai</th>
                        <th style={{ padding: '.75rem 1rem', textAlign: 'left', fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {categorias.map((c: any) => (
                        <tr key={c.id} style={{ borderTop: '1px solid var(--border-light)' }}>
                            <td style={{ padding: '.75rem 1rem', fontSize: '13px' }}>{c.nome}</td>
                            <td style={{ padding: '.75rem 1rem', fontSize: '13px' }}>{c.slug}</td>
                            <td style={{ padding: '.75rem 1rem', fontSize: '13px' }}>{c.categoriaPai?.nome || '—'}</td>
                            <td style={{ padding: '.75rem 1rem', fontSize: '13px' }}>
                                <a href={`/admin/categorias/${c.id}`} style={{ marginRight: '.5rem', color: 'var(--gold)', fontWeight: 500 }}>Editar</a>
                                <button onClick={() => eliminarCategoria(c.id)} style={{ color: 'var(--error, #c0392b)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 500, fontSize: '13px' }}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}