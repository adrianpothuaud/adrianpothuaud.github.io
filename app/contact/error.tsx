'use client'

import { useEffect } from 'react'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        console.error('Erreur dans le formulaire de contact:', error)
    }, [error])

    return (
        <div className="message error">
            <h2>Oops! Une erreur s'est produite</h2>
            <p>{error.message || 'Une erreur inattendue s\'est produite lors de l\'envoi de votre message.'}</p>
            <button
                onClick={() => reset()}
                style={{
                    marginTop: '1rem',
                    padding: '0.5rem 1rem',
                    background: '#495057',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer'
                }}
            >
                Réessayer
            </button>
        </div>
    )
}