'use client'

import { useState, useEffect } from 'react'

export default function Newsletter() {

    const [email, setEmail] = useState('')

    function subscribeNewsletter() {
        console.log(email)
    }

    return (
        <section className="promo-banner">
            <div className="container">
                <h2>Subscreve a nossa <em>newsletter</em></h2>
                <p>Recebe novidades, coleções exclusivas e ofertas especiais diretamente no teu email.</p>
                <div className="newsletter-form">
                    <input
                        type="email"
                        placeholder="O teu email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <button type="button" onClick={subscribeNewsletter}>
                        <svg viewBox="0 0 24 24" style={{ width: '14px', height: '14px', stroke: 'currentColor', fill: 'none', strokeWidth: 2.5 }}>
                            <path strokeLinecap="round" strokeLinejoin="round"
                                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        Subscrever
                    </button>
                </div>
                <p className="newsletter-note">Sem spam. Podes cancelar a qualquer momento.</p>
            </div>
        </section>
    )
}