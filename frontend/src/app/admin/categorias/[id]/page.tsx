'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function EditarCategoria({ params }: { params: { id: string } }) {

    const router = useRouter()

    const [nome, setNome] = useState('')
    const [slug, setSlug] = useState('')
    const [descricao, setDescricao] = useState('')
    const [categoriaPaiId, setCategoriaPaiId] = useState('')
    const [categorias, setCategorias] = useState([])
    const [emDestaque, setEmDestaque] = useState(false)

    useEffect(() => {
        fetch(`/api/Categorias`, { credentials: 'include' })
            .then(res => res.json())
            .then(data => setCategorias(data))
    }, [])

    useEffect(() => {
        fetch(`/api/Categorias/${params.id}`)
            .then(res => res.json())
            .then(data => {
                setNome(data.nome)
                setSlug(data.slug)
                setDescricao(data.descricao)
                setCategoriaPaiId(data.categoriaPaiId)
                setEmDestaque(data.emDestaque)
            })
    }, [])

    async function guardarCategoria() {
        if (!nome || !slug || !descricao) {
            alert('Preencher nome, descrição e slug')
            return
        }

        const resposta = await fetch(`/api/Categorias/${params.id}`, {
            method: 'PUT',
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
                <h1>Editar Categoria</h1>
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
                        {categorias.filter((c: any) => !c.categoriaPaiId).map((c: any) => (
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