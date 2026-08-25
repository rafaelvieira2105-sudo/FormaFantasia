'use client'

import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCart } from '@/context/CartContext'

export default function FormularioCartao({ encomendaId }: { encomendaId: number }) {
  const stripe = useStripe()
  const elements = useElements()
  const router = useRouter()
  const { limparCarrinho } = useCart()
  const [loading, setLoading] = useState(false)
  const [erro, setErro] = useState('')

  async function handleSubmit() {
    if (!stripe || !elements) return

    setLoading(true)
    setErro('')

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/checkout/confirmacao?id=${encomendaId}`,
      },
      redirect: 'if_required'
    })

    if (result.error) {
      setErro(result.error.message || 'Erro no pagamento.')
      setLoading(false)
    } else {
      limparCarrinho()
      router.push(`/checkout/confirmacao?id=${encomendaId}`)
    }
  }

  return (
    <div style={{ marginTop: '1.5rem', padding: '1.5rem', border: '1px solid var(--border)', borderRadius: '10px', background: 'var(--white)' }}>
      <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '20px', fontWeight: 600, color: 'var(--navy)', marginBottom: '1rem' }}>
        Dados do Cartão
      </h3>
      <PaymentElement />
      {erro && <p style={{ color: '#c0392b', fontSize: '13px', marginTop: '.75rem' }}>{erro}</p>}
      <button
        className="btn-auth"
        onClick={handleSubmit}
        disabled={loading}
        style={{ marginTop: '1rem', width: '100%', opacity: loading ? .7 : 1 }}
      >
        {loading ? 'A processar...' : 'Pagar com Cartão'}
      </button>
    </div>
  )
}