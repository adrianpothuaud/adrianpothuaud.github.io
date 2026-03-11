import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, MapPin, Linkedin, BookOpen } from 'lucide-react';

const Contact = () => {
    const [formState, setFormState] = useState({ name: '', email: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setTimeout(() => {
            alert("Ce formulaire est une démonstration pour le moment.");
            setIsSubmitting(false);
            setFormState({ name: '', email: '', message: '' });
        }, 1500);
    };

    const inputStyle = {
        width: '100%',
        padding: '0.875rem 1rem',
        background: '#ffffff',
        border: '1.5px solid var(--color-border)',
        borderRadius: 'var(--radius-md)',
        color: 'var(--color-text-primary)',
        fontFamily: 'inherit',
        fontSize: '0.95rem',
        outline: 'none',
        transition: 'border-color var(--transition-fast), box-shadow var(--transition-fast)',
    };

    const handleFocus = (e) => {
        e.target.style.borderColor = 'var(--color-accent-blue)';
        e.target.style.boxShadow = '0 0 0 3px rgba(37, 99, 235, 0.1)';
    };

    const handleBlur = (e) => {
        e.target.style.borderColor = 'var(--color-border)';
        e.target.style.boxShadow = 'none';
    };

    return (
        <section id="contact" style={{ padding: 'var(--space-2xl) 0' }}>
            <div className="section-header">
                <span className="section-label">Contact</span>
                <h2>Prêt à <span className="text-gradient">accélérer</span> ?</h2>
                <p>Discutons de vos besoins en formation pour vos équipes QA et développement.</p>
            </div>

            <div className="contact-grid">
                {/* Contact Info */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="glass-panel"
                    style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
                >
                    <h3 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>Informations</h3>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
                        <div style={{ padding: '8px', background: 'var(--color-accent-blue-light)', borderRadius: '8px', color: 'var(--color-accent-blue)', flexShrink: 0 }}>
                            <MapPin size={18} />
                        </div>
                        <span style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>Paris, Île-de-France · Remote France</span>
                    </div>

                    <a href="https://www.linkedin.com/in/adrianpothuaud/" target="_blank" rel="noopener noreferrer"
                        style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', textDecoration: 'none' }}
                        onMouseEnter={(e) => e.currentTarget.querySelector('span').style.color = 'var(--color-accent-blue)'}
                        onMouseLeave={(e) => e.currentTarget.querySelector('span').style.color = 'var(--color-text-secondary)'}
                    >
                        <div style={{ padding: '8px', background: 'var(--color-accent-blue-light)', borderRadius: '8px', color: 'var(--color-accent-blue)', flexShrink: 0 }}>
                            <Linkedin size={18} />
                        </div>
                        <span style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', transition: 'color var(--transition-fast)' }}>LinkedIn : Adrian Pothuaud</span>
                    </a>

                    <a href="https://medium.com/@adrianpothuaud" target="_blank" rel="noopener noreferrer"
                        style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', textDecoration: 'none' }}
                        onMouseEnter={(e) => e.currentTarget.querySelector('span').style.color = 'var(--color-accent-blue)'}
                        onMouseLeave={(e) => e.currentTarget.querySelector('span').style.color = 'var(--color-text-secondary)'}
                    >
                        <div style={{ padding: '8px', background: 'var(--color-accent-blue-light)', borderRadius: '8px', color: 'var(--color-accent-blue)', flexShrink: 0 }}>
                            <BookOpen size={18} />
                        </div>
                        <span style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', transition: 'color var(--transition-fast)' }}>Medium : @adrianpothuaud</span>
                    </a>
                </motion.div>

                {/* Contact Form */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                >
                    <form onSubmit={handleSubmit} className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem', background: '#ffffff' }}>
                        <div className="contact-form-row">
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', flex: 1 }}>
                                <label htmlFor="name" style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--color-text-primary)' }}>Nom complet</label>
                                <input
                                    type="text"
                                    id="name"
                                    required
                                    placeholder="Jean Dupont"
                                    value={formState.name}
                                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                                    style={inputStyle}
                                    onFocus={handleFocus}
                                    onBlur={handleBlur}
                                />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', flex: 1 }}>
                                <label htmlFor="email" style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--color-text-primary)' }}>Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    required
                                    placeholder="jean@exemple.fr"
                                    value={formState.email}
                                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                                    style={inputStyle}
                                    onFocus={handleFocus}
                                    onBlur={handleBlur}
                                />
                            </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                            <label htmlFor="message" style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--color-text-primary)' }}>Message</label>
                            <textarea
                                id="message"
                                required
                                rows="5"
                                placeholder="Décrivez votre besoin en formation..."
                                value={formState.message}
                                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                                style={{ ...inputStyle, resize: 'vertical' }}
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="btn-primary"
                            style={{
                                justifyContent: 'center',
                                opacity: isSubmitting ? 0.7 : 1,
                                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                                background: 'var(--gradient-primary)',
                                padding: '0.9rem',
                                borderRadius: 'var(--radius-md)',
                                fontSize: '0.95rem',
                            }}
                        >
                            {isSubmitting ? 'Envoi en cours...' : (
                                <>
                                    Envoyer le message
                                    <Send size={16} />
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
