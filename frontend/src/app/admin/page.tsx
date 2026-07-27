'use client'

import { useState, useEffect } from 'react'


export default function Admin() {

    const [totalProdutos, setTotalProdutos] = useState(0)
    const [totalCategorias, setTotalCategorias] = useState(0)
    const [totalEncomendas, setTotalEncomendas] = useState(0)
    const [totalUtilizadores, setTotalUtilizadores] = useState(0)

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/Produtos`, { credentials: 'include' })
            .then(res => res.json())
            .then(data => setTotalProdutos(data.length))

        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/Categorias`, { credentials: 'include' })
            .then(res => res.json())
            .then(data => setTotalCategorias(data.length))

        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/Encomendas`, { credentials: 'include' })
            .then(res => res.json())
            .then(data => setTotalEncomendas(data.length))

        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/Utilizadores`, { credentials: 'include' })
            .then(res => res.json())
            .then(data => setTotalUtilizadores(data.length))
    }, [])  

    return (
        <div>
            <div className="admin-stats">
                <div className="admin-stat-card">
                    <h3>Produtos</h3>
                    <p>{totalProdutos}</p>
                </div>
                <div className="admin-stat-card">
                    <h3>Categorias</h3>
                    <p>{totalCategorias}</p>
                </div>
                <div className="admin-stat-card">
                    <h3>Encomendas</h3>
                    <p>{totalEncomendas}</p>
                </div>
                <div className="admin-stat-card">
                    <h3>Utilizadores</h3>
                    <p>{totalUtilizadores}</p>
                </div>
            </div>
        </div>
    )
}