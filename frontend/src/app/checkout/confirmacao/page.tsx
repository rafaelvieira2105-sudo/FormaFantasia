'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

function ConfirmacaoConteudo() {
  const [encomenda, setEncomenda] = useState<any>(null)
  const searchParams = useSearchParams()
  const id = searchParams.get('id')

  useEffect(() => {
    if (id) {
      fetch(`/api/Encomendas/${id}`, { credentials: 'include' })
        .then(res => res.json())
        .then(data => setEncomenda(data))
    }
  }, [id])

  return (
    <div className="delivery-confirmation">
      <h1>Confirmação de Encomenda</h1>
      <p>A sua encomenda foi efetuada com sucesso!</p>

      {encomenda?.metodoPagamento === 'multibanco' && (
        <div style={{ background: 'var(--cream-dark)', border: '1px solid var(--border)', borderRadius: '10px', padding: '1.5rem', margin: '1.5rem 0', textAlign: 'left' }}>
          <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '20px', marginBottom: '1rem' }}>Dados de Pagamento Multibanco</h3>
          <p><strong>Entidade:</strong> {encomenda.entidadeMultibanco}</p>
          <p><strong>Referência:</strong> {encomenda.referenciaMultibanco}</p>
          <p><strong>Valor:</strong> {encomenda.total} €</p>
          <p style={{ marginTop: '.75rem', fontSize: '13px', color: 'var(--text-muted)' }}>Tens 3 dias para efectuar o pagamento.</p>
        </div>
      )}

      {encomenda?.metodoPagamento === 'mbway' && (
        <div style={{ background: 'var(--cream-dark)', border: '1px solid var(--border)', borderRadius: '10px', padding: '1.5rem', margin: '1.5rem 0' }}>
          <p>Foi enviado um pedido de pagamento MB Way para o teu telemóvel. Confirma o pagamento na app MB Way.</p>
        </div>
      )}

      <p>Receberá um email com confirmação da sua encomenda.</p>
      <a href="/conta/encomendas" className="btn-auth">Ver encomendas</a>
      <a href="/" className="btn-auth">Voltar à página inicial</a>
    </div>
  )
}

export default function Confirmacao() {
  return (
    <Suspense fallback={<div style={{ padding: '2rem', textAlign: 'center' }}>A carregar...</div>}>
      <ConfirmacaoConteudo />
    </Suspense>
  )
}