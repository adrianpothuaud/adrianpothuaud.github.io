'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function ContactMessage() {
    const searchParams = useSearchParams()
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

    useEffect(() => {
        const success = searchParams.get('success')
        const error = searchParams.get('error')

        if (success === 'true') {
            setMessage({
                type: 'success',
                text: 'Votre message a été envoyé avec succès ! Je vous répondrai bientôt.'
            })
        } else if (error) {
            setMessage({
                type: 'error',
                text: decodeURIComponent(error)
            })
        }

        // Effacer le message après 5 secondes
        if (success || error) {
            const timer = setTimeout(() => {
                setMessage(null)
                // Optionnel: nettoyer l'URL
                window.history.replaceState({}, '', '/contact')
            }, 5000)

            return () => clearTimeout(timer)
        }
    }, [searchParams])

    if (!message) return null

    return (
        <div className={`message ${message.type}`}>
            <p>{message.text}</p>
            <button
                onClick={() => setMessage(null)}
                className="message-close"
                aria-label="Fermer le message"
            >
                ✕
            </button>
        </div>
    )
}