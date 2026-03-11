import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, MapPin } from 'lucide-react';

const Contact = () => {
    const [formState, setFormState] = useState({ name: '', email: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate form submission
        setTimeout(() => {
            alert("Ce formulaire est une démonstration pour le moment.");
            setIsSubmitting(false);
            setFormState({ name: '', email: '', message: '' });
        }, 1500);
    };

    return (
        <section id="contact" style={{ padding: 'var(--space-2xl) 0' }}>
            <div style={{ textAlign: 'center', marginBottom: 'var(--space-xl)' }}>
                <h2 style={{ fontSize: 'clamp(2rem, 5vw, 2.5rem)' }}>Prêt à <span className="text-gradient">accélérer</span> ?</h2>
                <p style={{ color: 'var(--color-text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
                    Discutons de vos besoins en formation pour vos équipes QA et développement.
                </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 2fr', gap: '3rem', maxWidth: '1000px', margin: '0 auto' }}>

                {/* Contact Info */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="glass-panel"
                    style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}
                >
                    <div>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Informations</h3>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--color-text-secondary)' }}>
                            <div style={{ padding: '10px', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '50%', color: 'var(--color-accent-blue)' }}>
                                <MapPin size={20} />
                            </div>
                            <span style={{ fontSize: '1rem' }}>Indépendant / Remote France</span>
                        </div>
                    </div>
                </motion.div>

                {/* Contact Form */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                >
                    <form onSubmit={handleSubmit} className="glass-panel" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <label htmlFor="name" style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>Nom complet</label>
                                <input
                                    type="text"
                                    id="name"
                                    required
                                    value={formState.name}
                                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                                    style={{
                                        padding: '1rem',
                                        background: 'rgba(0,0,0,0.1)',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        borderRadius: 'var(--radius-md)',
                                        color: '#fff',
                                        fontFamily: 'inherit',
                                        outline: 'none',
                                        transition: 'border-color 0.2s'
                                    }}
                                    onFocus={(e) => e.target.style.borderColor = 'var(--color-accent-blue)'}
                                    onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                                />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <label htmlFor="email" style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    required
                                    value={formState.email}
                                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                                    style={{
                                        padding: '1rem',
                                        background: 'rgba(0,0,0,0.1)',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        borderRadius: 'var(--radius-md)',
                                        color: '#fff',
                                        fontFamily: 'inherit',
                                        outline: 'none',
                                        transition: 'border-color 0.2s'
                                    }}
                                    onFocus={(e) => e.target.style.borderColor = 'var(--color-accent-blue)'}
                                    onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                                />
                            </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <label htmlFor="message" style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>Message</label>
                            <textarea
                                id="message"
                                required
                                rows="5"
                                value={formState.message}
                                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                                style={{
                                    padding: '1rem',
                                    background: 'rgba(0,0,0,0.1)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    borderRadius: 'var(--radius-md)',
                                    color: '#fff',
                                    fontFamily: 'inherit',
                                    outline: 'none',
                                    resize: 'vertical',
                                    transition: 'border-color 0.2s'
                                }}
                                onFocus={(e) => e.target.style.borderColor = 'var(--color-accent-blue)'}
                                onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            style={{
                                background: isSubmitting ? 'rgba(59, 130, 246, 0.5)' : 'var(--gradient-primary)',
                                color: '#fff',
                                padding: '1rem',
                                borderRadius: 'var(--radius-md)',
                                fontWeight: 600,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '0.5rem',
                                border: 'none',
                                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                                transition: 'opacity 0.2s'
                            }}
                            onMouseEnter={(e) => !isSubmitting && (e.target.style.opacity = 0.9)}
                            onMouseLeave={(e) => !isSubmitting && (e.target.style.opacity = 1)}
                        >
                            {isSubmitting ? 'Envoi en cours...' : (
                                <>
                                    Envoyer le message
                                    <Send size={18} />
                                </>
                            )}
                        </button>
                    </form>
                </motion.div>
            </div>
        </section>
    );
};

export default Contact;
