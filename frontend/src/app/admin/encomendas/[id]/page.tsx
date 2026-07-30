'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function editarEncomenda({ params }: { params: { id: string } }) {

    const router = useRouter()

    const [encomenda, setEncomenda] = useState<any>(null)
    const [estado, setEstado] = useState('')

    useEffect(() => {
        fetch(`/api/Encomendas/${params.id}`)
            .then(res => res.json())
            .then(data => setEncomenda(data))
    }, [])

    async function guardarEstado() {
        fetch(`/api/Encomendas/${params.id}/estado`, {
            method: 'PUT',
            headers: { 'COntent-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ Estado: estado })
        })

        router.push('/admin/encomendas')
    }

    return (
        <div>
            <div className="admin-form-header">
                <h1>Encomenda #{params.id}</h1>
                <button className="btn-guardar" onClick={guardarEstado}>Guardar</button>
            </div>

            {encomenda ? (
                <div className="cat-form">
                    <div className="form-group">
                        <label>Cliente</label>
                        <input type="text" value={encomenda.utilizador?.email || '—'} readOnly />
                    </div>
                    <div className="form-group">
                        <label>Data</label>
                        <input type="text" value={new Date(encomenda.data).toLocaleDateString('pt-PT')} readOnly />
                    </div>
                    <div className="form-group">
                        <label>Total</label>
                        <input type="text" value={`${encomenda.total} €`} readOnly />
                    </div>
                    <div className="form-group">
                        <label>Estado</label>
                        <select value={estado} onChange={(e) => setEstado(e.target.value)}>
                            <option value="pendente">Pendente</option>
                            <option value="em curso">Em Curso</option>
                            <option value="concluida">Concluída</option>
                            <option value="cancelada">Cancelada</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Produtos</label>
                        <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid var(--border)', borderRadius: '8px', overflow: 'hidden' }}>
                            <thead style={{ background: 'var(--cream-dark)' }}>
                                <tr>
                                    <th style={{ padding: '.5rem 1rem', textAlign: 'left', fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Produto</th>
                                    <th style={{ padding: '.5rem 1rem', textAlign: 'left', fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Quantidade</th>
                                    <th style={{ padding: '.5rem 1rem', textAlign: 'left', fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Preço</th>
                                </tr>
                            </thead>
                            <tbody>
                                {encomenda.itensEncomenda?.map((item: any) => (
                                    <tr key={item.id} style={{ borderTop: '1px solid var(--border-light)' }}>
                                        <td style={{ padding: '.5rem 1rem', fontSize: '13px' }}>{item.produto?.nome || '—'}</td>
                                        <td style={{ padding: '.5rem 1rem', fontSize: '13px' }}>{item.quantidade}</td>
                                        <td style={{ padding: '.5rem 1rem', fontSize: '13px' }}>{item.precoUnitario} €</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <p>A carregar...</p>
            )}
        </div>
    )
}