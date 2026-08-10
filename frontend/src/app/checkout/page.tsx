'use client'

import { useState, useEffect } from 'react'
import { useCart } from '@/context/CartContext'
import { useRouter } from 'next/navigation'

export default function Checkout() {

    const [email, setEmail] = useState('')
    const [primeiroNome, setPrimeiroNome] = useState('')
    const [ultimoNome, setUltimoNome] = useState('')
    const [morada, setMorada] = useState('')
    const [localidade, setLocalidade] = useState('')
    const [codPostal, setCodPostal] = useState('')
    const [pais, setPais] = useState('')
    const [telemovel, setTelemovel] = useState('')
    const [edificio, setEdificio] = useState('')
    const [pagamento, setPagamento] = useState('')
    const [notas, setNotas] = useState('')
    const [termos, setTermos] = useState(false)

    const { itens, total, limparCarrinho } = useCart()

    const router = useRouter()

    useEffect(() => {
        fetch(`/api/Utilizadores/me`, { credentials: 'include' })
            .then(res => res.json())
            .then(data => {
                if (data.email) {
                    setEmail(data.email)
                    setPrimeiroNome(data.nome || '')
                    setUltimoNome(data.apelido || '')
                    setMorada(data.morada || '')
                    setTelemovel(data.telemovel || '')
                }
            })
            .catch(() => { })
    }, [])

    async function confirmarEncomenda() {
        if (!email || !primeiroNome || !ultimoNome || !morada || !localidade || !codPostal || !pais || !telemovel) {
            alert('Preencha os campos obrigatórios!')
            return
        }

        if (!termos) {
            alert('Confirme os termos e condições')
            return
        }

        const resposta = await fetch(`/api/Encomendas`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({
                NomeCliente: `${primeiroNome} ${ultimoNome}`,
                EmailCliente: email,
                Telefone: telemovel,
                MoradaEntrega: morada,
                Localidade: localidade,
                Pais: pais,
                Notas: notas,
                Total: total,
                CodigoPostal: codPostal,
                Itens: itens.map((item: any) => ({
                    ProdutoId: item.id,
                    Quantidade: item.quantidade,
                    PrecoUnitario: item.preco
                }))
            })
        })

        const auth = await resposta.json()

        if (!auth.isAuthenticated) {
            router.push('/login?redirect=checkout')
            return
        }

        if (resposta.ok) {
            limparCarrinho()
            router.push('/checkout/confirmacao')
        }
    }

    return (
        <div className="checkout-container">
            <div className="checkout-form">
                <div className="form-group">
                    <label>Primeiro Nome</label>
                    <input
                        type="text"
                        value={primeiroNome}
                        onChange={(e) => setPrimeiroNome(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Último Nome</label>
                    <input
                        type="text"
                        value={ultimoNome}
                        onChange={(e) => setUltimoNome(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Telemóvel</label>
                    <input
                        type="text"
                        value={telemovel}
                        onChange={(e) => setTelemovel(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Rua</label>
                    <input
                        type="text"
                        value={morada}
                        onChange={(e) => setMorada(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Localidade</label>
                    <input
                        type="text"
                        value={localidade}
                        onChange={(e) => setLocalidade(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>País</label>
                    <input
                        type="text"
                        value={pais}
                        onChange={(e) => setPais(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Código Postal</label>
                    <input
                        type="text"
                        value={codPostal}
                        onChange={(e) => setCodPostal(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Nº da Porta/Apartamento/Loja</label>
                    <input
                        type="text"
                        value={notas}
                        onChange={(e) => setNotas(e.target.value)}
                    />
                </div>
                <div className="pagamento-opcoes">
                    <h3 style={{ marginBottom: '1rem', fontFamily: 'Cormorant Garamond, serif', fontSize: '20px', fontWeight: 600, color: 'var(--navy)' }}>
                        Método de Pagamento
                    </h3>
                    {[
                        { value: 'mbway', label: 'MB Way', img: '/pagamento/mbway.png' },
                        { value: 'multibanco', label: 'Multibanco', img: '/pagamento/multibanco.png' },
                        { value: 'paypal', label: 'PayPal', img: '/pagamento/paypal.png' },
                        { value: 'cartao', label: 'Cartão de Crédito/Débito', img: '/pagamento/cartao.png' },
                    ].map((metodo) => (
                        <label
                            key={metodo.value}
                            className={`pagamento-card ${pagamento === metodo.value ? 'pagamento-card-ativo' : ''}`}
                            onClick={() => setPagamento(metodo.value)}
                        >
                            <input
                                type="radio"
                                name="pagamento"
                                value={metodo.value}
                                checked={pagamento === metodo.value}
                                onChange={(e) => setPagamento(e.target.value)}
                                style={{ display: 'none' }}
                            />
                            <img src={metodo.img} alt={metodo.label} style={{ height: '32px', objectFit: 'contain' }} />
                            <span>{metodo.label}</span>
                            <div className={`pagamento-check ${pagamento === metodo.value ? 'ativo' : ''}`} />
                        </label>
                    ))}
                </div>
                <div className="termos-check">
                    <input
                        type="checkbox"
                        checked={termos}
                        onChange={(e) => setTermos(e.target.checked)}
                    />
                    <label> Aceito os termos e condições</label>
                </div>
                <div className="final-btn">
                    <button className="btn-auth" onClick={confirmarEncomenda}>Finalizar Encomenda</button>
                </div>
            </div>
            <div className="checkout-resumo">
                <h2>Resumo da Encomenda</h2>
                {itens.map((item: any) => (
                    <div key={item.id} className="resumo-item">
                        <span>{item.nome} × {item.quantidade}</span>
                        <span>{(item.preco * item.quantidade).toFixed(2)} €</span>
                    </div>
                ))}
                <div className="resumo-total">
                    <span>Total</span>
                    <span>{total.toFixed(2)} €</span>
                </div>
            </div>
        </div>
    )
}