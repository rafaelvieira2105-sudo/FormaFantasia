'use client'

import { createContext, useContext, useState, useEffect } from 'react'

type ItemWishList = {
    id: number,
    nome: string,
    preco: number,
    fotoUrl?: string
}

const WishListContext = createContext<any>(null)

export function WishListProvider({ children }: { children: React.ReactNode }) {
    const [aberto, setAberto] = useState(false)

    const[itens, setItens] = useState<ItemWishList[]>(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('ff_wishlist')
            return saved ? JSON.parse(saved) : []
        }
        return []
    })

    useEffect(() => {
        localStorage.setItem('ff_wishlist', JSON.stringify(itens))
    }, [itens])

    function toggleItem(novoItem: ItemWishList) {
        const itemExistente = itens.find(item => item.id === novoItem.id)

        if (itemExistente) {
            setItens(itens.filter(item => item.id !== novoItem.id))
        } else {
            setItens([...itens, novoItem])
        }
    }

    function removerItem(id: number) {
        setItens(itens.filter(item => item.id !== id))
    }

    function abrirWishList() {
        setAberto(true)
    }

    function fecharWishList() {
        setAberto(false)
    }

    return (
        <WishListContext.Provider value={{ itens, toggleItem, removerItem, aberto, abrirWishList, fecharWishList }}>
            {children}
        </WishListContext.Provider>
    )
}

export function useWishList() {
    return useContext(WishListContext)
}