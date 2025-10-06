import { useState } from 'react'

export default function TestError() {
  const [shouldError, setShouldError] = useState(false)
  
  if (shouldError) {
    throw new Error('Erreur de test pour vérifier l\'ErrorBoundary')
  }
  
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Page de Test d'Erreur</h1>
      <p>Cette page permet de tester l'ErrorBoundary</p>
      <button 
        onClick={() => setShouldError(true)}
        style={{
          padding: '1rem 2rem',
          fontSize: '1rem',
          background: '#dc3545',
          color: 'white',
          border: 'none',
          borderRadius: '0.5rem',
          cursor: 'pointer'
        }}
      >
        Déclencher une erreur
      </button>
    </div>
  )
}