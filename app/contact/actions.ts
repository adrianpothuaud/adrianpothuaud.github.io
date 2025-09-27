'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export interface ContactFormData {
  name: string
  email: string
  message: string
}

export async function submitContactForm(formData: FormData) {
  // Extraire les données du formulaire
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const message = formData.get('message') as string

  // Validation basique côté serveur
  if (!name || !email || !message) {
    throw new Error('Tous les champs sont requis')
  }

  // Validation de l'email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    throw new Error('Adresse email invalide')
  }

  // Validation de la longueur
  if (name.length < 2 || name.length > 100) {
    throw new Error('Le nom doit contenir entre 2 et 100 caractères')
  }

  if (message.length < 10 || message.length > 1000) {
    throw new Error('Le message doit contenir entre 10 et 1000 caractères')
  }

  const contactData: ContactFormData = {
    name: name.trim(),
    email: email.trim(),
    message: message.trim()
  }

  try {
    // Ici, vous pourriez :
    // 1. Envoyer un email via un service comme Resend, SendGrid, etc.
    // 2. Sauvegarder en base de données
    // 3. Envoyer vers un webhook
    
    // Pour l'instant, on simule le traitement
    console.log('Nouveau message de contact reçu:', contactData)
    
    // Simuler un délai de traitement
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Optionnel: Revalider le cache de la page
    revalidatePath('/contact')
    
    // Rediriger vers une page de succès ou la même page avec un paramètre
    redirect('/contact?success=true')
    
  } catch (error) {
    console.error('Erreur lors de l\'envoi du message:', error)
    throw new Error('Erreur lors de l\'envoi du message. Veuillez réessayer.')
  }
}