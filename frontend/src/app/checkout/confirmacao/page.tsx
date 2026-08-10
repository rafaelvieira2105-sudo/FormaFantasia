'use client'

export default function Confirmacao() {

    return (
        <div className="delivery-confirmation">
            <h1>Confirmação de Encomenda</h1>
            <p>A sua encomenda foi efetuada com Sucesso!</p>
            <p>Receberá um email com confirmação da sua encomenda</p>
            <a href="/conta/encomendas" className="btn-auth">Ver encomendas</a>
            <a href="/" className="btn-auth">Voltar à página inicial</a>
        </div>
    )
}