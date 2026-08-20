'use client'

import { useState, useEffect } from 'react'
import { useCart } from '@/context/CartContext'
import { useWishList } from '@/context/WishListContext'
import { useRouter } from 'next/navigation'

export default function Produto({ params }: { params: { id: string } }) {

    const [produto, setProduto] = useState<any>(null)
    const [quantidade, setQuantidade] = useState(1)
    const [tabActiva, setTabActiva] = useState('descricao')
    const { adicionarItem, abrirCarrinho } = useCart()
    const { toggleItem, itens: itensWishlist } = useWishList()
    const [avaliacoes, setAvaliacoes] = useState([])
    const [estrelas, setEstrelas] = useState(0)
    const [comentario, setComentario] = useState('')
    const router = useRouter()

    useEffect(() => {
        fetch(`/api/Produtos/${params.id}`)
            .then(res => res.json())
            .then(data => setProduto(data))
    }, [])

    useEffect(() => {
        if (produto?.id) {
            fetch(`/api/Avaliacoes?produtoId=${produto.id}`)
                .then(res => res.json())
                .then(data => setAvaliacoes(data))
        }
    }, [produto])

    async function submeterAvaliacao() {

        const res = await fetch('/api/Utilizadores/auth', { credentials: 'include' })
        const auth = await res.json()

        if (!auth.isAuthenticated) {
            router.push('/login')
            return
        }

        if (estrelas === 0) {
            alert('Selecciona o número de estrelas.')
            return
        }

        const resposta = await fetch('/api/Avaliacoes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({
                ProdutoId: produto.id,
                Estrelas: estrelas,
                Comentario: comentario
            })
        })

        if (resposta.ok) {
            setComentario('')
            setEstrelas(0)
            // Recarregar avaliações
            fetch(`/api/Avaliacoes?produtoId=${produto.id}`)
                .then(res => res.json())
                .then(data => setAvaliacoes(data))
        } else {
            alert('Tens de estar autenticado para deixar uma avaliação.')
        }
    }

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
                        {tabActiva === 'avaliacoes' && (
                            <div className="avaliacoes">

                                {/* Lista de avaliações */}
                                {avaliacoes.length === 0 ? (
                                    <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Ainda não há avaliações.</p>
                                ) : (
                                    avaliacoes.map((a: any) => (
                                        <div key={a.id} className="avaliacao-item">
                                            <div className="avaliacao-header">
                                                <span className="avaliacao-autor">{a.utilizador?.nome} {a.utilizador?.apelido}</span>
                                                <span className="avaliacao-data">{new Date(a.data).toLocaleDateString('pt-PT')}</span>
                                            </div>
                                            <div className="avaliacao-estrelas">
                                                {'★'.repeat(a.estrelas)}{'☆'.repeat(5 - a.estrelas)}
                                            </div>
                                            {a.comentario && <p className="avaliacao-comentario">{a.comentario}</p>}
                                        </div>
                                    ))
                                )}

                                {/* Formulário para deixar avaliação */}
                                <div className="avaliacao-form">
                                    <h3>Deixar uma avaliação</h3>
                                    <div className="avaliacao-estrelas-input">
                                        {[1, 2, 3, 4, 5].map(n => (
                                            <span
                                                key={n}
                                                onClick={() => setEstrelas(n)}
                                                style={{ cursor: 'pointer', fontSize: '24px', color: n <= estrelas ? 'var(--gold)' : 'var(--border)' }}
                                            >
                                                ★
                                            </span>
                                        ))}
                                    </div>
                                    <div className="form-group">
                                        <label>Comentário (opcional)</label>
                                        <textarea
                                            value={comentario}
                                            onChange={(e) => setComentario(e.target.value)}
                                            rows={4}
                                            style={{ width: '100%', padding: '.75rem', border: '1px solid var(--border)', borderRadius: '8px', fontFamily: 'inherit', resize: 'vertical' }}
                                        />
                                    </div>
                                    <button className="btn-auth" onClick={submeterAvaliacao}>
                                        Submeter Avaliação
                                    </button>
                                </div>

                            </div>
                        )}
                    </div>
                </div>

            </div>
        </main>
    )
}