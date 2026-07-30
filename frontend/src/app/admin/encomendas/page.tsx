'use client'

import { useState, useEffect } from 'react'

export default function Encomendas() {

    const [encomendas, setEncomendas] = useState([])
    const [filtro, setFiltro] = useState('todas')

    useEffect(() => {
        fetch(`/api/Encomendas`, { credentials: 'include' })
            .then(res => res.json())
            .then(data => setEncomendas(data))
    }, [])

    const encomendasFiltradas = filtro === 'todas'
        ? encomendas
        : encomendas.filter((e: any) => e.estado === filtro)


    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '28px', fontWeight: 600, color: 'var(--navy)' }}>
                    Encomendas
                </h1>
            </div>

            <div style={{ display: 'flex', gap: '.5rem', marginBottom: '1.5rem' }}>
                <button
                    className={filtro === 'todas' ? 'filter-btn active' : 'filter-btn'}
                    onClick={() => setFiltro('todas')}
                >
                    Todas
                </button>
                <button
                    className={filtro === 'em curso' ? 'filter-btn active' : 'filter-btn'}
                    onClick={() => setFiltro('em curso')}
                >
                    Em Curso
                </button>
                <button
                    className={filtro === 'concluida' ? 'filter-btn active' : 'filter-btn'}
                    onClick={() => setFiltro('concluida')}
                >
                    Concluídas
                </button>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse', background: 'var(--white)', borderRadius: '10px', overflow: 'hidden', border: '1px solid var(--border)' }}>
                <thead style={{ background: 'var(--cream-dark)' }}>
                    <tr>
                        <th style={{ padding: '.75rem 1rem', textAlign: 'left', fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Nº</th>
                        <th style={{ padding: '.75rem 1rem', textAlign: 'left', fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Data</th>
                        <th style={{ padding: '.75rem 1rem', textAlign: 'left', fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Cliente</th>
                        <th style={{ padding: '.75rem 1rem', textAlign: 'left', fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Itens</th>
                        <th style={{ padding: '.75rem 1rem', textAlign: 'left', fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Estado</th>
                        <th style={{ padding: '.75rem 1rem', textAlign: 'left', fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {encomendasFiltradas.map((e: any) => (
                        <tr key={e.id} style={{ borderTop: '1px solid var(--border-light)' }}>
                            <td style={{ padding: '.75rem 1rem', fontSize: '13px' }}>#{e.id}</td>
                            <td style={{ padding: '.75rem 1rem', fontSize: '13px' }}>{new Date(e.data).toLocaleDateString('pt-PT')}</td>
                            <td style={{ padding: '.75rem 1rem', fontSize: '13px' }}>{e.utilizador?.email || '—'}</td>
                            <td style={{ padding: '.75rem 1rem', fontSize: '13px' }}>{e.itensEncomenda?.length || 0}</td>
                            <td style={{ padding: '.75rem 1rem', fontSize: '13px' }}>{e.estado || '—'}</td>
                            <td style={{ padding: '.75rem 1rem', fontSize: '13px' }}>
                                <a href={`/admin/encomendas/${e.id}`} style={{ color: 'var(--gold)', fontWeight: 500 }}>Ver</a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}