'use client'

import { useState, useEffect } from 'react'

export default function HeroAdmin() {
  const [imagens, setImagens] = useState([])
  const [novaUrl, setNovaUrl] = useState('')
  const [novaOrdem, setNovaOrdem] = useState(1)

  useEffect(() => {
    fetch('/api/HeroImagens')
      .then(res => res.json())
      .then(data => setImagens(data))
  }, [])

  async function adicionarImagem() {
    if (!novaUrl) return
    await fetch('/api/HeroImagens', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ ImagemUrl: novaUrl, Ordem: novaOrdem })
    })
    setNovaUrl('')
    fetch('/api/HeroImagens').then(res => res.json()).then(data => setImagens(data))
  }

  async function eliminarImagem(id: number) {
    await fetch(`/api/HeroImagens/${id}`, { method: 'DELETE', credentials: 'include' })
    setImagens(imagens.filter((i: any) => i.id !== id))
  }

  return (
    <div>
      <div className="admin-form-header">
        <h1>Imagens do Hero</h1>
      </div>

      <div className="cat-form" style={{ marginBottom: '2rem' }}>
        <h3 style={{ marginBottom: '1rem', fontFamily: 'Cormorant Garamond, serif', fontSize: '20px' }}>Adicionar Imagem</h3>
        <div className="form-group">
          <label>URL da Imagem</label>
          <input type="text" value={novaUrl} onChange={(e) => setNovaUrl(e.target.value)} placeholder="https://..." />
        </div>
        <div className="form-group">
          <label>Ordem</label>
          <input type="number" value={novaOrdem} onChange={(e) => setNovaOrdem(parseInt(e.target.value))} />
        </div>
        <button className="btn-guardar" onClick={adicionarImagem}>+ Adicionar</button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {imagens.map((img: any) => (
          <div key={img.id} style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: '10px', padding: '1rem' }}>
            <img src={img.imagemUrl} alt="" style={{ width: '120px', height: '70px', objectFit: 'cover', borderRadius: '6px' }} />
            <span style={{ flex: 1, fontSize: '13px', color: 'var(--text-secondary)' }}>{img.imagemUrl}</span>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Ordem: {img.ordem}</span>
            <button onClick={() => eliminarImagem(img.id)} style={{ color: '#c0392b', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}>Eliminar</button>
          </div>
        ))}
      </div>
    </div>
  )
}