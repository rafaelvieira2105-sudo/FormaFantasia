'use client'

import { useState, useEffect } from 'react'

export default function Produto({ params }: { params: { id: string } }) {

    const [produto, setProduto] = useState<any>(null)

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
                        <p>{produto?.preco} €</p>
                        <button>Adicionar ao carrinho</button>
                    </div>
                </div>

                {/* zona inferior - descrição */}
                <div className="produto-descricao">
                    <p>{produto?.descricao}</p>
                </div>

            </div>
        </main>
    )
}