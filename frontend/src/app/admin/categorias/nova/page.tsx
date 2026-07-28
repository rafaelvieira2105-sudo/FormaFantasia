'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Nova() {

    const router = useRouter()

    const [nome, setNome] = useState('')
    const [slug, setSlug] = useState('')
    const [descricao, setDescricao] = useState('')
    const [categoriaPaiId, setCategoriaPaiId] = useState('')
    const [emDestaque, setEmDestaque] = useState(false)
    const [categorias, setCategorias] = useState([])

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/Categorias`, { credentials: 'include' })
            .then(res => res.json())
            .then(data => setCategorias(data))
    }, [])

    async function guardarCategoria() {

        if (!nome || !slug || !descricao) {
            alert('Preencher nome, descrição e slug')
            return
        }

        const resposta = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/Categorias`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({
                Nome: nome,
                Descricao: descricao,
                Slug: slug,
                CategoriaPaiId: categoriaPaiId ? parseInt(categoriaPaiId) : null
            })
        })

        if (resposta.ok) {
            router.push('/admin/categorias')
        }
    }

    return (
        <div>
            <div className="admin-form-header">
                <h1>Nova Categoria</h1>
                <button className="btn-guardar" onClick={guardarCategoria}>+ Guardar</button>
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
                    <label>Slug</label>
                    <input
                        type="text"
                        value={slug}
                        onChange={(e) => setSlug(e.target.value)}
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
                    <label>Categoria Pai</label>
                    <select value={categoriaPaiId} onChange={(e) => setCategoriaPaiId(e.target.value)}>
                        <option value="">— Sem categoria pai —</option>
                        {categorias.map((c: any) => (
                            <option key={c.id} value={c.id}>{c.nome}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>Em Destaque</label>
                    <input
                        type="checkbox"
                        checked={emDestaque}
                        onChange={(e) => setEmDestaque(e.target.checked)}
                    />
                </div>
            </div>
        </div>
    )
}