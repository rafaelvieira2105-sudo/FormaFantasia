export default function NotFound() {
  return (
    <main>
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        minHeight: '60vh',
        textAlign: 'center',
        padding: '2rem'
      }}>
        <h1 style={{ 
          fontFamily: 'Cormorant Garamond, serif', 
          fontSize: '120px', 
          fontWeight: 600, 
          color: 'var(--navy)', 
          opacity: .1,
          lineHeight: 1
        }}>
          404
        </h1>
        <h2 style={{ 
          fontFamily: 'Cormorant Garamond, serif', 
          fontSize: '32px', 
          fontWeight: 600, 
          color: 'var(--navy)',
          marginTop: '-2rem',
          marginBottom: '1rem'
        }}>
          Página não encontrada
        </h2>
        <p style={{ 
          fontSize: '15px', 
          color: 'var(--text-secondary)', 
          maxWidth: '400px',
          lineHeight: 1.7,
          marginBottom: '2rem'
        }}>
          A página que procuras não existe ou foi movida. Verifica o endereço ou volta ao início.
        </p>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <a href="/" className="btn-auth">Ir para o início</a>
          <a href="/catalogo/papel-de-parede" style={{ 
            padding: '.875rem 1.5rem',
            border: '1px solid var(--border)',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: 600,
            color: 'var(--text-secondary)'
          }}>
            Ver Catálogo
          </a>
        </div>
      </div>
    </main>
  )
}