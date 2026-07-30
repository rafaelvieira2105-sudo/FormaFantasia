'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Login() {

  const router = useRouter()

  const [modo, setModo] = useState('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [nome, setNome] = useState('')
  const [apelido, setApelido] = useState('')
  const [confirmarPassword, setConfirmarPassword] = useState('')
  const [verPassword, setVerPassword] = useState(false)
  const [erro, setErro] = useState('')

  async function doLogin() {
    setErro('')
    const resposta = await fetch(`/api/Utilizadores/login-api`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ email, password })
    })

    if (!resposta.ok) {
      setErro('Email ou password incorretos.')
      return
    }

    const dados = await resposta.json()

    if (dados.role === 'Admin') {
      router.push('/admin')
    } else {
      router.push('/conta')
    }
  }

  async function doRegisto() {
    setErro('')
    if (password !== confirmarPassword) {
      setErro('As passwords não coincidem.')
      return
    }

    const resposta = await fetch(`/api/Utilizadores/register-api`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        PrimeiroNome: nome,
        Apelido: apelido,
        Email: email,
        Password: password
      })
    })

    if (!resposta.ok) {
      const dados = await resposta.json()
      setErro(dados.message || 'Erro ao criar conta.')
      return
    }

    router.push('/conta')
  }

  return (
    <main className="login-page">
      <div className="auth-wrap">
        <a href="/" className="btn-voltar">← Voltar ao site</a>
        <div className="tab-bar">
          <button
            className={modo === 'login' ? 'tab-btn active' : 'tab-btn'}
            onClick={() => { setModo('login'); setErro('') }}
          >
            Entrar
          </button>
          <button
            className={modo === 'registo' ? 'tab-btn active' : 'tab-btn'}
            onClick={() => { setModo('registo'); setErro('') }}
          >
            Criar Conta
          </button>
        </div>

        <div className="auth-card">
          {erro && <p className="error-banner show">{erro}</p>}

          {modo === 'login' ? (
            <div>
              <h1>Bem-vindo de volta</h1>
              <p>Entra na tua conta para ver as tuas encomendas.</p>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  placeholder="email@exemplo.pt"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={verPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ paddingRight: '2.5rem', width: '100%' }}
                  />
                  <button
                    type="button"
                    onClick={() => setVerPassword(!verPassword)}
                    style={{ position: 'absolute', right: '0.5rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}
                  >
                    {verPassword ? '🙈' : '👁️'}
                  </button>
                </div>
              </div>
              <button type="button" className="btn-auth" onClick={doLogin}>
                Entrar
              </button>
            </div>
          ) : (
            <div>
              <h1>Criar conta</h1>
              <p>Regista-te para acompanhar as tuas encomendas.</p>
              <div className="form-row">
                <div className="form-group">
                  <label>Nome</label>
                  <input
                    type="text"
                    placeholder="Primeiro Nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Apelido</label>
                  <input
                    type="text"
                    placeholder="Último Nome"
                    value={apelido}
                    onChange={(e) => setApelido(e.target.value)}
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  placeholder="email@exemplo.pt"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={verPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ paddingRight: '2.5rem', width: '100%' }}
                  />
                  <button
                    type="button"
                    onClick={() => setVerPassword(!verPassword)}
                    style={{ position: 'absolute', right: '0.5rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}
                  >
                    {verPassword ? '🙈' : '👁️'}
                  </button>
                </div>
              </div>
              <div className="form-group">
                <label>Confirmar Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={confirmarPassword}
                  onChange={(e) => setConfirmarPassword(e.target.value)}
                />
              </div>
              <button type="button" className="btn-auth" onClick={doRegisto}>
                Criar Conta
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}