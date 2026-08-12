'use client'

import { useState, useEffect, use } from 'react'
import { useRouter } from 'next/navigation'


export default function Cliente() {

    const [dados, setDados] = useState(null)
    const [encomendas, setEncomendas] = useState([])
    const [primeiroNome, setPrimeiroNome] = useState('')
    const [ultimoNome, setUltimoNome] = useState('')
    const [email, setEmail] = useState('')
    const [nif, setNif] = useState('')
    const [morada, setMorada] = useState('')
    const [telemovel, setTelemovel] = useState('')
    const [codPostal, setCodPostal] = useState('')
    const [localidade, setLocalidade] = useState('')
    const [pais, setPais] = useState('')
    const [tabAtiva, setTabAtiva] = useState('encomendas')

    const router = useRouter()

    useEffect(() => {
        fetch(`/api/Utilizadores/me`, { credentials: 'include' })
            .then(res => res.json())
            .then(data => {
                setDados(data)
                setPrimeiroNome(data.nome)
                setUltimoNome(data.apelido)
                setEmail(data.email)
                setNif(data.nif)
                setMorada(data.morada)
                setTelemovel(data.phoneNumber)
                setCodPostal(data.codPostal)
                setLocalidade(data.localidade)
                setPais(data.pais)
            })
    }, [])

    useEffect(() => {
        fetch(`/api/Encomendas/minhas`, { credentials: 'include' })
            .then(res => res.json())
            .then(data => setEncomendas(data))
    }, [])



    async function guardarDados() {
        const resposta = await fetch(`/api/Utilizadores/me`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({
                Nome: primeiroNome,
                Apelido: ultimoNome,
                Email: email,
                NIF: nif,
                Morada: morada,
                PhoneNumber: telemovel,
                CodPostal: codPostal,
                Localidade: localidade,
                Pais: pais,
            })
        })

        if (resposta.ok) {
            alert("Os seus dados foram guardados!")
            return
        }


    }

    async function doLogout() {
        await fetch('/api/Utilizadores/logout-api', { method: 'POST', credentials: 'include' })
        router.push('/')
    }

    return (
        <div className="account-page">

            <div className="account-hero">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 00-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                </svg>
                <h1>{primeiroNome} {ultimoNome}</h1>
                <button className="cliente-auth" onClick={doLogout}>Terminar Sessão</button>
            </div>

            <div className="account-body">

                <aside className="account-sidebar">
                    <button
                        className={tabAtiva === 'encomenda' ? 'account-sidebar-item active' : 'account-sidebar-item'}
                        onClick={() => setTabAtiva('encomendas')}
                    >
                        Encomendas
                    </button>
                    <button
                        className={tabAtiva === 'informacao' ? 'account-sidebar-item active' : 'account-sidebar-item'}
                        onClick={() => setTabAtiva('informacao')}
                    >
                        Informação Pessoal
                    </button>
                </aside>

                <main>
                    <div className="account-body">
                        {tabAtiva === 'informacao' ? (
                            <div className="account-form">
                                <div className="form-row">
                                    <input
                                        type="text"
                                        value={primeiroNome}
                                        onChange={(e) => setPrimeiroNome(e.target.value)}
                                    />
                                    <label>Primeiro Nome</label>
                                </div>
                                <div className="form-row">
                                    <input
                                        type="text"
                                        value={ultimoNome}
                                        onChange={(e) => setUltimoNome(e.target.value)}
                                    />
                                    <label>último Nome</label>
                                </div>
                                <div className="form-row">
                                    <input
                                        type="text"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        readOnly
                                    />
                                    <label>Email</label>
                                </div>
                                <div className="form-row">
                                    <input
                                        type="text"
                                        value={telemovel}
                                        onChange={(e) => setTelemovel(e.target.value)}
                                    />
                                    <label>Telemóvel</label>
                                </div>
                                <div className="form-row">
                                    <input
                                        type="text"
                                        value={nif}
                                        onChange={(e) => setNif(e.target.value)}
                                    />
                                    <label>NIF</label>
                                </div>
                                <div className="form-row">
                                    <input
                                        type="text"
                                        value={morada}
                                        onChange={(e) => setMorada(e.target.value)}
                                    />
                                    <label>Morada</label>
                                </div>
                                <div className="form-row">
                                    <input
                                        type="text"
                                        value={localidade}
                                        onChange={(e) => setLocalidade(e.target.value)}
                                    />
                                    <label>Localidade</label>
                                </div>
                                <div className="form-row">
                                    <input
                                        type="text"
                                        value={pais}
                                        onChange={(e) => setPais(e.target.value)}
                                    />
                                    <label>País</label>
                                </div>
                                <div className="form-row">
                                    <input
                                        type="text"
                                        value={codPostal}
                                        onChange={(e) => setCodPostal(e.target.value)}
                                    />
                                    <label>Código Postal</label>
                                </div>
                                <button className="btn-auth" onClick={guardarDados}>
                                    Guardar Alterações
                                </button>
                            </div>
                        ) : (
                            <div className="account-deliveries">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Nº</th>
                                            <th>Data</th>
                                            <th>Total</th>
                                            <th>Estado</th>
                                            <th>Ações</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {encomendas.map((e:any) => (
                                            <tr key={e.id}>
                                                <td>#{e.id}</td>
                                                <td>{new Date(e.data).toLocaleDateString('pt-PT')}</td>
                                                <td>{e.total}</td>
                                                <td>{e.estado}</td>
                                                <td><a href={`/conta/encomendas/${e.id}`}>Ver</a></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </main>
            </div>

        </div>
    )
}