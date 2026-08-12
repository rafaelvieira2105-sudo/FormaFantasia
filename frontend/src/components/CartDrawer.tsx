'use client'

import { useCart } from '@/context/CartContext'

export default function CartDrawer() {
    const { itens, removerItem, total, aberto, fecharCarrinho } = useCart()

    if (!aberto) return null

    return (
        <div className="cart-overlay" onClick={fecharCarrinho}>
            <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
                <div className="cart-header">
                    <h2>Carrinho</h2>
                    <button onClick={fecharCarrinho}>✕</button>
                </div>

                <div className="cart-body">
                    {itens.length === 0 ? (
                        <p className="cart-empty">O teu carrinho está vazio.</p>
                    ) : (
                        itens.map((item: any) => (
                            <div key={item.id} className="cart-item">
                                <div className="cart-item-info">
                                    <p className="cart-item-name">{item.nome}</p>
                                    <p className="cart-item-price">{item.preco} € × {item.quantidade}</p>
                                </div>
                                <button onClick={() => removerItem(item.id)}>✕</button>
                            </div>
                        ))
                    )}
                </div>

                <div className="cart-footer">
                    <div className="cart-total">
                        <span>Total</span>
                        <span>{total.toFixed(2)} €</span>
                    </div>
                    <button className="btn-auth" onClick={async () => {
                        const res = await fetch('/api/Utilizadores/auth', { credentials: 'include' })
                        const auth = await res.json()
                        if (auth.isAuthenticated) {
                            window.location.href = '/checkout'
                        } else {
                            window.location.href = '/login?redirect=checkout'
                        }
                        if(itens.length==0){
                            alert("Não tem Produtos no carrinho")
                            return
                        }
                    }}>
                        Finalizar Compra
                    </button>
                </div>
            </div>
        </div>
    )
}