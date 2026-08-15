'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCart } from '@/context/CartContext'
import { useWishList } from '@/context/WishListContext'

export default function Header() {

    const router = useRouter()

    const [categorias, setCategorias] = useState([])
    const { itens, abrirCarrinho } = useCart()
    const { itensWishlist, abrirWishList } = useWishList()
    const [pesquisa, setPesquisa] = useState('')

    useEffect(() => {
        fetch(`/api/Categorias`)
            .then(res => res.json())
            .then(data => setCategorias(data))
    }, [])

    const [perfil, setPerfil] = useState<any>(null)

    useEffect(() => {
        fetch('/api/Utilizadores/auth', { credentials: 'include' })
            .then(res => res.json())
            .then(data => {
                if (data.isAuthenticated) {
                    setPerfil(data)
                } else {
                    setPerfil(null)
                }
            })
            .catch(() => setPerfil(null))
    }, [])

    async function doLogout() {
        await fetch('/api/Utilizadores/logout-api', { method: 'POST', credentials: 'include' })
        setPerfil(null)
        router.push('/')
    }

    function doPesquisa(){
        if(pesquisa.trim()){
            router.push(`/pesquisa?q=${encodeURIComponent(pesquisa)}`)
        }
    }

    return (
        <header>
            <div className="header-top">
                Envios Internacionais Disponíveis - <a href="/condicoes">Saiba mais</a>
            </div>
            <div className="header-main">
                <a href="/" className="logo">Forma<span>Fantasia</span></a>
                <nav aria-label="Navegação principal">
                    {categorias
                        .filter((cat: any) => !cat.categoriaPaiId)
                        .map((cat: any) => (
                            <a key={cat.id} href={`/catalogo/${cat.slug}`}>{cat.nome}</a>
                        ))}
                </nav>
                <div className="header-actions">
                    <div className="search-wrapper">
                        <input type="search" placeholder="Buscar..." autoComplete="off" value={pesquisa} onChange={(e) => setPesquisa(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && doPesquisa()}/>
                        <button aria-label="Pesquisar" onClick={doPesquisa}>
                            <svg viewBox="0 0 24 24" style={{ width: '16px', height: '16px', stroke: 'currentColor', fill: 'none', strokeWidth: 2 }}>
                                <circle cx="11" cy="11" r="8" />
                                <path strokeLinecap="round" d="m21 21-4.35-4.35" />
                            </svg>
                        </button>
                    </div>
                    <button className="icon-btn" onClick={abrirWishList} aria-label="Lista de desejos" title="Lista de desejos">
                        <svg viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                        </svg>
                        <span className="badge" style={{ display: 'none' }}>0</span>
                    </button>
                    <button className="icon-btn" aria-label="Carrinho de compras" title="Carrinho" onClick={abrirCarrinho}>
                        <svg viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                            <line x1="3" y1="6" x2="21" y2="6" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16 10a4 4 0 01-8 0" />
                        </svg>
                        <span className="badge" style={{ display: itens.length > 0 ? 'flex' : 'none' }}>{itens.length}</span>
                    </button>
                    {perfil ? (
                        <div className="user-dropdown-wrap">
                            <button className="icon-btn" aria-label="Conta">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="8" r="4" />
                                    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                                </svg>
                            </button>
                            <div className="user-dropdown">
                                {perfil.role === 'Admin' ? (
                                    <a href="/admin" style={{ display: 'block', padding: '.5rem .75rem', fontSize: '13px', color: 'var(--navy)', fontWeight: 500 }}>⚙️ Admin</a>
                                ) : (
                                    <a href="/conta" style={{ display: 'block', padding: '.5rem .75rem', fontSize: '13px', color: 'var(--navy)', fontWeight: 500 }}>👤 Perfil</a>
                                )}
                                <button onClick={doLogout} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '.5rem .75rem', fontSize: '13px', color: '#c0392b', fontWeight: 500, background: 'none', border: 'none', cursor: 'pointer' }}>
                                    Terminar Sessão
                                </button>
                            </div>
                        </div>
                    ) : (
                        <a href="/login" className="icon-btn" style={{ textDecoration: 'none' }}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="8" r="4" />
                                <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                            </svg>
                        </a>
                    )}
                </div>
            </div>
        </header>
    )
}