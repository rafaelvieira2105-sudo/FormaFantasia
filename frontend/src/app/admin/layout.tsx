'use client'

import {useEffect } from 'react'
import {useRouter} from 'next/navigation'

export default function AdminLayout({ children }: { children: React.ReactNode }) {

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/Utilizadores/auth`, {
            credentials: 'include'
        })
            .then(res => res.json())
            .then(dados => {
                if (!dados.isAuthenticated || dados.role !== 'Admin') {
                    router.push('/login')
                }
            })
    }, [])

    return (
        <div className="admin-layout">
            <aside className="admin-sidebar">
                <a href="/admin">Dashboard</a>
                <a href="/admin/categorias">Categorias</a>
                <a href="/admin/produtos">Produtos</a>
                <a href="/admin/encomendas">Encomendas</a>
                <a href="/admin/utilizadores">Utilizadores</a>
            </aside>
            <main className="admin-main">
                {children}
            </main>
        </div>
    )
}