'use client'

import { useState, useEffect } from 'react'

export default function Detalhes({ params }: { params: { id: string } }) {

    const [encomenda, setEncomenda] = useState<any>(null)

    useEffect(() => {
        fetch(`/api/Encomendas/${params.id}`, { credentials: 'include' })
            .then(res => res.json())
            .then(data => setEncomenda(data))
    }, [])

    return (
        <div className="delivery-details">
            <h1>Encomenda #{params.id}</h1>
            <div>
                <p>Data: {new Date(encomenda?.data).toLocaleDateString('pt-PT')}</p>
                <p>Estado: {encomenda?.estado}</p>
                <p>Total: {encomenda?.total} €</p>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Produto</th>
                        <th>Quantidade</th>
                        <th>Preço</th>
                    </tr>
                </thead>
                <tbody>
                    {encomenda?.itensEncomenda?.map((item : any) => (
                        <tr key={item.id}>
                            <td>{item.produto?.nome}</td>
                            <td>{item.quantidade}</td>
                            <td>{item.precoUnitario}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}