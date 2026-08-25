'use client'

import { useState, useEffect } from 'react'


export default function Admin() {

    const [totalProdutos, setTotalProdutos] = useState(0)
    const [totalCategorias, setTotalCategorias] = useState(0)
    const [totalEncomendas, setTotalEncomendas] = useState(0)
    const [totalUtilizadores, setTotalUtilizadores] = useState(0)
    const [encomendas, setEncomendas] = useState([])
    const [encomendaHoje, setEncomendaHoje] = useState(0)
    const [totalVendasHoje, setTotalVendasHoje] = useState(0)
    const [encomendaPendentes, setEncomendaPendentes] = useState(0)
    const [stockBaixo, setStockBaixo] = useState(0)

    useEffect(() => {
        fetch(`/api/Produtos`, { credentials: 'include' })
            .then(res => res.json())
            .then(data => setTotalProdutos(data.length))

        fetch(`/api/Categorias`, { credentials: 'include' })
            .then(res => res.json())
            .then(data => setTotalCategorias(data.length))

        fetch(`/api/Encomendas`, { credentials: 'include' })
            .then(res => res.json())
            .then(data => setTotalEncomendas(data.length))

        fetch(`/api/Utilizadores`, { credentials: 'include' })
            .then(res => res.json())
            .then(data => setTotalUtilizadores(data.length))

        fetch(`/api/Encomendas`, { credentials: 'include' })
            .then(res => res.json())
            .then(data => setEncomendas(data))
        fetch('/api/Encomendas', { credentials: 'include' })
            .then(res => res.json())
            .then(data => {
                const hoje = new Date().toDateString()
                const encomendas = data
                setTotalEncomendas(encomendas.length)
                setEncomendaHoje(encomendas.filter((e: any) => new Date(e.data).toDateString() === hoje).length)
                setTotalVendasHoje(encomendas.filter((e: any) => new Date(e.data).toDateString() === hoje).reduce((acc: number, e: any) => acc + e.total, 0))
                setEncomendaPendentes(encomendas.filter((e: any) => e.estado === 'pendente').length)
            })

        fetch('/api/Produtos', { credentials: 'include' })
            .then(res => res.json())
            .then(data => {
                setTotalProdutos(data.length)
                setStockBaixo(data.filter((p: any) => p.stock < 5).length)
            })
    }, [])


    return (
        <div>
            <div className="admin-stats">
                <div className="admin-stat-card">
                    <h3>Produtos</h3>
                    <p>{totalProdutos}</p>
                    <a href="/admin/produtos">Gerir Produtos →</a>
                </div>
                <div className="admin-stat-card">
                    <h3>Categorias</h3>
                    <p>{totalCategorias}</p>
                    <a href="/admin/categorias">Gerir Categorias →</a>
                </div>
                <div className="admin-stat-card">
                    <h3>Encomendas</h3>
                    <p>{totalEncomendas}</p>
                    <a href="/admin/encomendas">Gerir Encomendas →</a>
                </div>
                <div className="admin-stat-card">
                    <h3>Utilizadores</h3>
                    <p>{totalUtilizadores}</p>
                    <a href="/admin/utilizadores">Gerir Utilizadores →</a>
                </div>
                <div className="admin-stat-card">
                    <h3>Encomendas Hoje</h3>
                    <p>{encomendaHoje}</p>
                </div>
                <div className="admin-stat-card">
                    <h3>Vendas Hoje</h3>
                    <p>{totalVendasHoje.toFixed(2)} €</p>
                </div>
                <div className="admin-stat-card">
                    <h3>Pendentes</h3>
                    <p>{encomendaPendentes}</p>
                    <a href="/admin/encomendas">Ver encomendas →</a>
                </div>
                <div className="admin-stat-card" style={{ borderColor: stockBaixo > 0 ? '#e74c3c' : 'var(--border)' }}>
                    <h3>Stock Baixo</h3>
                    <p style={{ color: stockBaixo > 0 ? '#e74c3c' : 'inherit' }}>{stockBaixo}</p>
                    <a href="/admin/produtos">Ver produtos →</a>
                </div>
            </div>
            <div style={{ marginTop: '2rem' }}>
                <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '24px', fontWeight: 600, color: 'var(--navy)', marginBottom: '1rem' }}>
                    Últimas Encomendas
                </h2>
                <table style={{ width: '100%', borderCollapse: 'collapse', background: 'var(--white)', borderRadius: '10px', overflow: 'hidden', border: '1px solid var(--border)' }}>
                    <thead style={{ background: 'var(--cream-dark)' }}>
                        <tr>
                            <th style={{ padding: '.75rem 1rem', textAlign: 'left', fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '.06em' }}>Nº</th>
                            <th style={{ padding: '.75rem 1rem', textAlign: 'left', fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '.06em' }}>Data</th>
                            <th style={{ padding: '.75rem 1rem', textAlign: 'left', fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '.06em' }}>Cliente</th>
                            <th style={{ padding: '.75rem 1rem', textAlign: 'left', fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '.06em' }}>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {encomendas.slice(0, 5).map((e: any) => (
                            <tr key={e.id} style={{ borderTop: '1px solid var(--border-light)' }}>
                                <td style={{ padding: '.75rem 1rem', fontSize: '13px' }}>#{e.id}</td>
                                <td style={{ padding: '.75rem 1rem', fontSize: '13px' }}>{new Date(e.data).toLocaleDateString('pt-PT')}</td>
                                <td style={{ padding: '.75rem 1rem', fontSize: '13px' }}>{e.utilizador?.email || '—'}</td>
                                <td style={{ padding: '.75rem 1rem', fontSize: '13px' }}>{e.estado || '—'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}