'use client'

import { createContext, useContext, useState, useEffect } from 'react'

type ItemCarrinho = {
    id: number
    nome: string
    preco: number
    quantidade: number
    fotoUrl?: string
}

const CartContext = createContext<any>(null)


export function CartProvider({ children }: { children: React.ReactNode }) {

    const [aberto, setAberto] = useState(false)

    const [itens, setItens] = useState<ItemCarrinho[]>(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('ff_cart')
            return saved ? JSON.parse(saved) : []
        }
        return []
    })


    useEffect(() => {
        localStorage.setItem('ff_cart', JSON.stringify(itens))
    }, [itens])

    const total = itens.reduce((acc, item) => acc + item.preco * item.quantidade, 0)

    function adicionarItem(novoItem: ItemCarrinho) {
        const itemExistente = itens.find(item => item.id === novoItem.id)

        if (itemExistente) {
            setItens(itens.map(item =>
                item.id === novoItem.id
                    ? { ...item, quantidade: item.quantidade + 1 }
                    : item
            ))
        } else {
            setItens([...itens, { ...novoItem, quantidade: novoItem.quantidade }])
        }
    }

    function removerItem(id: number) {
        setItens(itens.filter(item => item.id !== id))
    }

    function limparCarrinho() {
        setItens([])
    }

    function abrirCarrinho() {
        setAberto(true)
    }

    function fecharCarrinho() {
        setAberto(false)
    }

    return (
        <CartContext.Provider value={{ itens, adicionarItem, removerItem, limparCarrinho, total, aberto, abrirCarrinho, fecharCarrinho }}>
            {children}
        </CartContext.Provider>
    )

}

export function useCart() {
    return useContext(CartContext)
}