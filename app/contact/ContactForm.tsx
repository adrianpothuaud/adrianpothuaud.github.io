'use client'

import { useFormStatus } from 'react-dom'
import { submitContactForm } from './actions'

function SubmitButton() {
    const { pending } = useFormStatus()

    return (
        <button type="submit" disabled={pending}>
            {pending ? 'Envoi en cours...' : 'Envoyer'}
        </button>
    )
}

export default function ContactForm() {
    return (
        <form action={submitContactForm}>
            <label htmlFor="name">Nom :</label>
            <input
                type="text"
                id="name"
                name="name"
                required
                minLength={2}
                maxLength={100}
                placeholder="Votre nom complet"
            />

            <label htmlFor="email">Email :</label>
            <input
                type="email"
                id="email"
                name="email"
                required
                placeholder="votre.email@exemple.com"
            />

            <label htmlFor="message">Message :</label>
            <textarea
                id="message"
                name="message"
                rows={5}
                required
                minLength={10}
                maxLength={1000}
                placeholder="Votre message..."
            />

            <SubmitButton />
        </form>
    )
}