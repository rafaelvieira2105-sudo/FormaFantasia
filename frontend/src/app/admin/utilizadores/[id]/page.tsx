'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function verUtilizadores({ params }: { params: { id: string } }) {

    const router = useRouter()

    const [utilizador, setUtilizador] = useState<any>(null)
    const [encomendas, setEncomendas] = useState([])

    useEffect(() => {
        fetch(`/api/Utilizadores/${params.id}`)
            .then(res => res.json())
            .then(data => setUtilizador(data))
    }, [])

    useEffect(() => {
        fetch(`/api/Encomendas`, { credentials: 'include' })
            .then(res => res.json())
            .then(data => setEncomendas(data))
    }, [])

    const encomendasDoUtilizador = encomendas.filter((e: any) => e.utilizadorId === params.id)

    return (
        <div>
            <div className="admin-form-header">
                <h1>Utilizador</h1>
                <a href="/admin/utilizadores" className="btn-guardar">← Voltar</a>
            </div>

            {utilizador ? (
                <div>
                    <div className="cat-form" style={{ marginBottom: '2rem' }}>
                        <div className="form-group">
                            <label>Nome</label>
                            <input type="text" value={`${utilizador.nome} ${utilizador.apelido}`} readOnly />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input type="text" value={utilizador.email || '—'} readOnly />
                        </div>
                        <div className="form-group">
                            <label>NIF</label>
                            <input type="text" value={utilizador.nif || '—'} readOnly />
                        </div>
                        <div className="form-group">
                            <label>Morada</label>
                            <input type="text" value={utilizador.morada || '—'} readOnly />
                        </div>
                    </div>

                    <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '24px', fontWeight: 600, color: 'var(--navy)', marginBottom: '1rem' }}>
                        Encomendas
                    </h2>
                    <table style={{ width: '100%', borderCollapse: 'collapse', background: 'var(--white)', borderRadius: '10px', overflow: 'hidden', border: '1px solid var(--border)' }}>
                        <thead style={{ background: 'var(--cream-dark)' }}>
                            <tr>
                                <th style={{ padding: '.75rem 1rem', textAlign: 'left', fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Nº</th>
                                <th style={{ padding: '.75rem 1rem', textAlign: 'left', fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Data</th>
                                <th style={{ padding: '.75rem 1rem', textAlign: 'left', fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Estado</th>
                                <th style={{ padding: '.75rem 1rem', textAlign: 'left', fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {encomendasDoUtilizador.map((e: any) => (
                                <tr key={e.id} style={{ borderTop: '1px solid var(--border-light)' }}>
                                    <td style={{ padding: '.75rem 1rem', fontSize: '13px' }}>#{e.id}</td>
                                    <td style={{ padding: '.75rem 1rem', fontSize: '13px' }}>{new Date(e.data).toLocaleDateString('pt-PT')}</td>
                                    <td style={{ padding: '.75rem 1rem', fontSize: '13px' }}>{e.estado || '—'}</td>
                                    <td style={{ padding: '.75rem 1rem', fontSize: '13px' }}>
                                        <a href={`/admin/encomendas/${e.id}`} style={{ color: 'var(--gold)', fontWeight: 500 }}>Ver</a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p>A carregar...</p>
            )}
        </div>
    )
}