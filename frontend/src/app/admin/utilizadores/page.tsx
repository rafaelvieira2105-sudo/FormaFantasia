'use client'

import { useState, useEffect } from 'react'

export default function Utilizadores() {

    const [utilizadores, setUtilizadores] = useState([])
    const [filtro, setFiltro] = useState('todos')
    const utilizadoresFiltrados = filtro === 'todos'
        ? utilizadores
        : utilizadores.filter((u: any) => u.role === filtro)

    useEffect(() => {
        fetch(`/api/Utilizadores`, { credentials: 'include' })
            .then(res => res.json())
            .then(data => setUtilizadores(data))
    }, [])

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '28px', fontWeight: 600, color: 'var(--navy)' }}>
                    Utilizadores
                </h1>
            </div>

            <div style={{ display: 'flex', gap: '.5rem', marginBottom: '1.5rem' }}>
                <button className={filtro === 'todos' ? 'filter-btn active' : 'filter-btn'} onClick={() => setFiltro('todos')}>Todos</button>
                <button className={filtro === 'Admin' ? 'filter-btn active' : 'filter-btn'} onClick={() => setFiltro('Admin')}>Admin</button>
                <button className={filtro === 'Cliente' ? 'filter-btn active' : 'filter-btn'} onClick={() => setFiltro('Cliente')}>Cliente</button>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse', background: 'var(--white)', borderRadius: '10px', overflow: 'hidden', border: '1px solid var(--border)' }}>
                <thead style={{ background: 'var(--cream-dark)' }}>
                    <tr>
                        <th style={{ padding: '.75rem 1rem', textAlign: 'left', fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Nome</th>
                        <th style={{ padding: '.75rem 1rem', textAlign: 'left', fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Email</th>
                        <th style={{ padding: '.75rem 1rem', textAlign: 'left', fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Role</th>
                        <th style={{ padding: '.75rem 1rem', textAlign: 'left', fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {utilizadoresFiltrados.map((u: any) => (
                        <tr key={u.id} style={{ borderTop: '1px solid var(--border-light)' }}>
                            <td style={{ padding: '.75rem 1rem', fontSize: '13px' }}>{u.nome} {u.apelido}</td>
                            <td style={{ padding: '.75rem 1rem', fontSize: '13px' }}>{u.email}</td>
                            <td style={{ padding: '.75rem 1rem', fontSize: '13px' }}>{u.role}</td>
                            <td style={{ padding: '.75rem 1rem', fontSize: '13px' }}>
                                <a href={`/admin/utilizadores/${u.id}`} style={{ color: 'var(--gold)', fontWeight: 500 }}>Ver</a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}