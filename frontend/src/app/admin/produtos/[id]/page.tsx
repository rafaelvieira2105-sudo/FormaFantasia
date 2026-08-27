'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function EditarProduto({ params }: { params: { id: string } }) {

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
    const [subcategorias, setSubcategorias] = useState([])
    const [subcategoriaId, setSubcategoriaId] = useState('')

    useEffect(() => {
        fetch(`/api/Categorias`, { credentials: 'include' })
            .then(res => res.json())
            .then(data => setCategorias(data))
    }, [])

    useEffect(() => {
        fetch(`/api/Produtos/${params.id}`)
            .then(res => res.json())
            .then(data => {
                setNome(data.nome)
                setDescricao(data.descricao)
                setPreco(data.preco)
                setStock(data.stock)
                setCategoriaId(data.categoriaId)
                setReferencia(data.referencia)
                setTag(data.tag)
                setPrecoOriginal(data.precoOriginal)
            })
    }, [])

    async function guardarProduto() {

        if (!nome || !descricao || !preco || !stock || !referencia || !categoriaId || !categorias) {
            alert('Preencher campos obrigatórios')
            return
        }

        const resposta = await fetch(`/api/Produtos/${params.id}`, {
            method: 'PUT',
            headers: { 'Content-type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({
                Nome: nome,
                Descricao: descricao,
                Preco: preco,
                Stock: stock,
                CategoriaId: subcategoriaId ? parseInt(subcategoriaId) : categoriaId,
                Referencia: referencia,
                Tag: tag || null,
                PrecoOriginal: precoOriginal || null
            })
        })

        if (resposta.ok) {
            router.push('/admin/produtos')
        }
    }

    async function onCategoriaChange(id: string) {
        setCategoriaId(parseInt(id))
        setSubcategoriaId('')

        const res = await fetch(`/api/Categorias/${id}`)
        const data = await res.json()
        setSubcategorias(data.subcategorias || [])
    }

    return (
        <div>
            <div className="admin-form-header">
                <h1>Editar Produto</h1>
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
                    <select value={categoriaId} onChange={(e) => onCategoriaChange(e.target.value)}>
                        <option value="">— Seleciona uma categoria —</option>
                        {categorias.map((c: any) => (
                            <option key={c.id} value={c.id}>{c.nome}</option>
                        ))}
                    </select>
                </div>
                {subcategorias.length > 0 && (
                    <div className="form-group">
                        <label>Subcategoria</label>
                        <select value={subcategoriaId} onChange={(e) => setSubcategoriaId(e.target.value)}>
                            <option value="">— Sem subcategoria —</option>
                            {subcategorias.map((s: any) => (
                                <option key={s.id} value={s.id}>{s.nome}</option>
                            ))}
                        </select>
                    </div>
                )}
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