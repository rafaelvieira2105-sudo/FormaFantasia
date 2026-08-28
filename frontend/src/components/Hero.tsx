'use client'

import { useState, useEffect } from 'react'

export default function Hero() {
  const [imagens, setImagens] = useState<any[]>([])
  const [atual, setAtual] = useState(0)

  useEffect(() => {
    fetch('/api/HeroImagens')
      .then(res => res.json())
      .then(data => setImagens(data))
  }, [])

  useEffect(() => {
    if (imagens.length === 0) return
    const timer = setInterval(() => {
      setAtual(a => (a + 1) % imagens.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [imagens])

  return (
    <section className="hero">
      <div className="hero-slider">
        {imagens.length > 0 ? (
          <>
            <img
              src={imagens[atual]?.imagemUrl}
              alt="Hero"
              style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }}
            />
            <div className="hero-overlay" />
            <div className="hero-dots">
              {imagens.map((_: any, i: number) => (
                <button
                  key={i}
                  onClick={() => setAtual(i)}
                  className={i === atual ? 'hero-dot active' : 'hero-dot'}
                />
              ))}
            </div>
          </>
        ) : (
          <div style={{ background: 'var(--navy)', width: '100%', height: '100%' }} />
        )}
        <div className="hero-inner">
          <p className="hero-eyebrow">Decoração de Interiores</p>
          <h1 className="hero-title">
            Transforma<br />o teu espaço
          </h1>
          <p className="hero-subtitle">
            Papel de parede, vinil decorativo, tapeçarias e muito mais.
          </p>
        </div>
      </div>
    </section>
  )
}