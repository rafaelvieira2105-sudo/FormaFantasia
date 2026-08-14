'use client'

import { useState, useEffect } from 'react'
import { useCart } from '@/context/CartContext'
import { useWishList } from '@/context/WishListContext'

export default function Produto({ params }: { params: { id: string } }) {

    const [produto, setProduto] = useState<any>(null)
    const [quantidade, setQuantidade] = useState(1)
    const [tabActiva, setTabActiva] = useState('descricao')
    const { adicionarItem, abrirCarrinho } = useCart()
    const { toggleItem, itens: itensWishlist } = useWishList()


    useEffect(() => {
        fetch(`/api/Produtos/${params.id}`)
            .then(res => res.json())
            .then(data => setProduto(data))
    }, [])

    return (
        <main>
            <div className="produto-container">
                <div className="produto-top">
                    {/* coluna esquerda - imagem */}
                    <div className="produto-imagem">
                        {produto?.fotoUrl ? (
                            <img src={produto.fotoUrl} alt={produto.nome} />
                        ) : (
                            <div style={{ background: 'var(--cream-dark)', width: '100%', height: '400px' }} />
                        )}
                    </div>

                    {/* coluna direita - informações */}
                    <div className="produto-info">
                        <h1>{produto?.nome}</h1>
                        <p>Ref. {produto?.referencia}</p>
                        <div className="produto-preco">
                            <span className="preco-valor">{produto?.preco} €</span>
                            <span className="preco-iva">(IVA incluído)</span>
                        </div>
                        <div className="produto-quantidade">
                            <button onClick={() => setQuantidade(Math.max(1, quantidade - 1))}>−</button>
                            <span>{quantidade}</span>
                            <button onClick={() => setQuantidade(quantidade + 1)}>+</button>
                        </div>
                        <button className="btn-auth" onClick={() => {
                            adicionarItem({
                                id: produto.id,
                                nome: produto.nome,
                                preco: produto.preco,
                                quantidade: quantidade,
                                fotoUrl: produto.fotoUrl
                            })
                            abrirCarrinho()
                        }}>
                            Adicionar ao Carrinho
                        </button>
                        <button
                            className="icon-btn"
                            onClick={() => toggleItem({
                                id: produto.id,
                                nome: produto.nome,
                                preco: produto.preco,
                                fotoUrl: produto.fotoUrl
                            })}
                            aria-label="Adicionar aos favoritos"
                        >
                            <svg viewBox="0 0 24 24" fill={itensWishlist.some((i: any) => i.id === produto?.id) ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* zona inferior - descrição */}
                <div className="produto-tabs">
                    <div className="produto-tabs-header">
                        <button
                            className={tabActiva === 'descricao' ? 'tab-btn active' : 'tab-btn'}
                            onClick={() => setTabActiva('descricao')}
                        >
                            Descrição
                        </button>
                        <button
                            className={tabActiva === 'dados' ? 'tab-btn active' : 'tab-btn'}
                            onClick={() => setTabActiva('dados')}
                        >
                            Dados do Produto
                        </button>
                        <button
                            className={tabActiva === 'avaliacoes' ? 'tab-btn active' : 'tab-btn'}
                            onClick={() => setTabActiva('avaliacoes')}
                        >
                            Avaliações
                        </button>
                    </div>

                    <div className="produto-tab-content">
                        {tabActiva === 'descricao' && <p>{produto?.descricao}</p>}
                        {tabActiva === 'dados' && <p>Dados técnicos do produto.</p>}
                        {tabActiva === 'avaliacoes' && <p>Ainda não há avaliações.</p>}
                    </div>
                </div>

            </div>
        </main>
    )
}