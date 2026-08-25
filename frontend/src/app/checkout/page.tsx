'use client'

import { useState, useEffect } from 'react'
import { useCart } from '@/context/CartContext'
import { useRouter } from 'next/navigation'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js'
import FormularioCartao from '@/components/FormularioCartao'

const stripePromise = loadStripe('pk_test_51U7MxMEkqJXuZRLLzV93eaPRk4ygB6QnKyBoIcmIwOhIkfQe229eUYi2FtoSqdOl82HRFBfw0K3VytxPMn9KZdgH00bHBr5JSI')  // a tua publishable key

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
    const [transportadora, setTransportadora] = useState('')
    const [envio, setEnvio] = useState('')
    const [montado, setMontado] = useState(false)
    const [stripeClientSecret, setStripeClientSecret] = useState('')
    const [encomendaId, setEncomendaId] = useState<number>(0)

    const { itens, total, limparCarrinho } = useCart()

    const router = useRouter()

    useEffect(() => {
        setMontado(true)
    }, [])

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
        // Verificar autenticação primeiro
        const authRes = await fetch('/api/Utilizadores/auth', { credentials: 'include' })
        const auth = await authRes.json()
        if (!auth.isAuthenticated) {
            router.push('/login?redirect=checkout')
            return
        }

        if (!email || !primeiroNome || !ultimoNome || !morada || !localidade || !codPostal || !pais || !telemovel) {
            alert('Preencha os campos obrigatórios!')
            return
        }

        if (!termos) {
            alert('Confirme os termos e condições')
            return
        }

        if (!transportadora) {
            alert('Selecciona uma transportadora!')
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
                MetodoEnvio: transportadora,
                MetodoPagamento: pagamento,
                CustoEnvio: transportadora === 'loja' ? 0 : transportadora === 'especial' ? 65 : 8.90,
                Itens: itens.map((item: any) => ({
                    ProdutoId: item.id,
                    Quantidade: item.quantidade,
                    PrecoUnitario: item.preco
                }))
            })
        })

        if (resposta.ok) {
            const dados = await resposta.json()

            if (pagamento === 'cartao' && dados.stripeClientSecret) {
                setEncomendaId(dados.id)
                setStripeClientSecret(dados.stripeClientSecret)
                return
            }

            limparCarrinho()
            router.push(`/checkout/confirmacao?id=${dados.id}`)
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
                        { value: 'cartao', label: 'Cartão de Crédito/Débito', img: '/pagamento/visa_mastercard.png', height: '24px' },
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
                            <img src={metodo.img} alt={metodo.label} style={{ height: metodo.height || '32px', width: 'auto', objectFit: 'contain' }} />
                            <span>{metodo.label}</span>
                            <div className={`pagamento-check ${pagamento === metodo.value ? 'ativo' : ''}`} />
                        </label>
                    ))}
                </div>
                <div className="pagamento-opcoes">
                    <h3 style={{ marginBottom: '1rem', fontFamily: 'Cormorant Garamond, serif', fontSize: '20px', fontWeight: 600, color: 'var(--navy)' }}>
                        Transportadora
                    </h3>
                    {[
                        { value: 'ctt_envialia', label: 'CTT / Envialia', preco: '8,90 €', prazo: 'Portugal Continental', img: '/pagamento/ctt.png' },
                        { value: 'loja', label: 'Levantar em Loja', preco: 'Grátis', prazo: 'Figueira da Foz', img: '/pagamento/ff.png' },
                        { value: 'especial', label: 'Transporte Especial', preco: '65,00€', prazo: 'Grandes encomendas ou medidas grandes', img: '/pagamento/transporte.png' }
                    ].map((t) => (
                        <label
                            key={t.value}
                            className={`pagamento-card ${transportadora === t.value ? 'pagamento-card-ativo' : ''}`}
                            onClick={() => setTransportadora(t.value)}
                        >
                            <input
                                type="radio"
                                name="transportadora"
                                value={t.value}
                                checked={transportadora === t.value}
                                onChange={(e) => setTransportadora(e.target.value)}
                                style={{ display: 'none' }}
                            />
                            {t.img && <img src={t.img} alt={t.label} style={{ height: '32px', width: 'auto', objectFit: 'contain' }} />}
                            <div style={{ flex: 1 }}>
                                <span style={{ fontWeight: 600, fontSize: '14px' }}>{t.label}</span>
                                <span style={{ display: 'block', fontSize: '12px', color: 'var(--text-muted)' }}>{t.prazo}</span>
                            </div>
                            <span style={{ fontWeight: 600, color: 'var(--navy)' }}>{t.preco}</span>
                            <div className={`pagamento-check ${transportadora === t.value ? 'ativo' : ''}`} />
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
                {stripeClientSecret && (
                    <Elements stripe={stripePromise} options={{ clientSecret: stripeClientSecret }}>
                        <FormularioCartao encomendaId={encomendaId} />
                    </Elements>
                )}
            </div>
            <div className="checkout-resumo">
                <h2>Resumo da Encomenda</h2>
                {montado && itens.map((item: any) => (
                    <div key={item.id} className="resumo-item">
                        <span>{item.nome} × {item.quantidade}</span>
                        <span>{(item.preco * item.quantidade).toFixed(2)} €</span>
                    </div>
                ))}
                {montado && transportadora && (
                    <div className="resumo-item">
                        <span>Envio ({transportadora === 'loja' ? 'Levantar em Loja' : transportadora === 'especial' ? 'Transporte Especial' : 'CTT / Envialia'})</span>
                        <span>{transportadora === 'loja' ? 'Grátis' : transportadora === 'especial' ? '65,00 €' : '8,90 €'}</span>
                    </div>
                )}
                <div className="resumo-total">
                    <span>Total</span>
                    <span>{(montado ? (total + (transportadora === 'loja' ? 0 : transportadora === 'especial' ? 65 : transportadora ? 8.90 : 0)) : 0).toFixed(2)} €</span>
                </div>
            </div>
        </div>
    )
}