'use client'

import { useState, useEffect } from 'react'

export default function Produto({ params }: { params: { id: string } }) {

    const [produto, setProduto] = useState<any>(null)
    const [quantidade, setQuantidade] = useState(1)
    const [tabActiva, setTabActiva] = useState('descricao')

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
                        <button className="btn-auth" onClick={() => { }}>
                            Adicionar ao Carrinho
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