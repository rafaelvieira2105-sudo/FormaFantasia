'use client'

import { useWishList } from '@/context/WishListContext'

export default function WishlistDrawer() {
    const { itens, removerItem, aberto, fecharWishList } = useWishList()

    if (!aberto) return null

    return (
        <div className="cart-overlay" onClick={fecharWishList}>
            <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
                <div className="cart-header">
                    <h2>Lista de desejos</h2>
                    <button onClick={fecharWishList}>✕</button>
                </div>

                <div className="cart-body">
                    {itens.length === 0 ? (
                        <p className="cart-empty">A tua lista de desejos está vazia.</p>
                    ) : (
                        itens.map((item: any) => (
                            <div key={item.id} className="cart-item">
                                <div className="cart-item-info">
                                    <p className="cart-item-name">{item.nome}</p>
                                    <p className="cart-item-price">{item.preco} €</p>
                                </div>
                                <button onClick={() => removerItem(item.id)}>✕</button>
                                <a href={`/produto/${item.id}`}>Ver Produto</a>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}
