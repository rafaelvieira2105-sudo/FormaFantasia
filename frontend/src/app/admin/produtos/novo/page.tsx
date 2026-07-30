'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Novo() {

    const router = useRouter()

    const [nome, setNome] = useState('')
    const [descricao, setDescricao] = useState('')
    const [preco, setPreco] = useState(0)
    const [stock, setStock] = useState(0)
    const [categoriaId, setCategoriaId] = useState(0)
    const [referencia, setReferencia] = useState('')
    const [tag, setTag] = useState('')
    const [precoOriginal, setPrecoOriginal] = useState(0)
    const [categorias, setCategorias] = useState([])

    useEffect(() => {
        fetch(`/api/Categorias`, { credentials: 'include' })
            .then(res => res.json())
            .then(data => setCategorias(data))
    }, [])

    async function guardarProduto() {

        if (!nome || !descricao || !preco || !stock || !referencia || !categoriaId || !categorias) {
            alert('Preencher campos obrigatórios')
            return
        }

        const resposta = await fetch(`/api/Produtos`, {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({
                Nome: nome,
                Descricao: descricao,
                Preco: preco,
                Stock: stock,
                CategoriaId: categoriaId,
                Referencia: referencia,
                Tag: tag || null,
                PrecoOriginal: precoOriginal || null
            })
        })

        if (resposta.ok) {
            router.push('/admin/produtos')
        }

    }

    return (
        <div>
            <div className="admin-form-header">
                <h1>Novo Produto</h1>
                <button className="btn-guardar" onClick={guardarProduto}>+ Guardar</button>
            </div>
            <div className="cat-form">
                <div className="form-group">
                    <label>Nome</label>
                    <input
                        type="text"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Descrição</label>
                    <input
                        type="text"
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Referência</label>
                    <input
                        type="text"
                        value={referencia}
                        onChange={(e) => setReferencia(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Preço (€)</label>
                    <input
                        type="number"
                        value={preco}
                        onChange={(e) => setPreco(parseFloat(e.target.value))}
                    />
                </div>
                <div className="form-group">
                    <label>Preço Original (€) — opcional, para promoções</label>
                    <input
                        type="number"
                        value={precoOriginal}
                        onChange={(e) => setPrecoOriginal(parseFloat(e.target.value))}
                    />
                </div>
                <div className="form-group">
                    <label>Stock</label>
                    <input
                        type="number"
                        value={stock}
                        onChange={(e) => setStock(parseInt(e.target.value))}
                    />
                </div>
                <div className="form-group">
                    <label>Categoria</label>
                    <select value={categoriaId} onChange={(e) => setCategoriaId(parseInt(e.target.value))}>
                        <option value="">— Seleciona uma categoria —</option>
                        {categorias.map((c: any) => (
                            <option key={c.id} value={c.id}>{c.nome}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>Tag</label>
                    <select value={tag} onChange={(e) => setTag(e.target.value)}>
                        <option value="">— Sem tag —</option>
                        <option value="destaque">Destaque</option>
                        <option value="promo">Promoção</option>
                        <option value="stockoff">Stock Off</option>
                    </select>
                </div>
            </div>
        </div>
    )
}