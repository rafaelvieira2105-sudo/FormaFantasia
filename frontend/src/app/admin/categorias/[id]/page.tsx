'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function EditarCategoria({ params }: { params: {id: string}}) {
     
    const router = useRouter()

    const [nome, setNome] = useState('')
    const [slug, setSlug] = useState('')
    const [descricao, setDesricao] = useState('')
    const [categoriaPaiId, setCategoriaPaiId] = useState(false)
    const [categorias, setCategorias] = useState([])
    
    useEffect(() => )
}