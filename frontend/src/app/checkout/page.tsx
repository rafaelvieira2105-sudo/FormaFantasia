'use client'

import { useState, useEffect } from 'react'
import { useCart } from '@/context/CartContext'
import { useRouter } from 'next/router'

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
        fetch(`/api/Utilizadores/me`, { credentials: 'include'})
            .then(res => res.json())
            .then(data => {
                if(data.email) {
                    setEmail(data.email)
                    setPrimeiroNome(data.nome || '')
                    setUltimoNome(data.apelido || '')
                    setMorada(data.morada || '')
                    setTelemovel(data.telemovel || '')
                }
            })
            .catch(() => {})
    }, [])

    function confirmarEncomenda() {
        if(!email || !primeiroNome || !ultimoNome || !morada || !localidade || !codPostal || !pais || !telemovel){
            alert('Preencha os campos obrigatórios!')
            return
        }

        if(!termos){
            alert('Confirme os termos e condições')
            return
        }

        fetch(`/api/Encomendas`, {
             method: 'POST',
             credentials: 'include',
             body: JSON.stringify({
                
             })
            })


    }
}