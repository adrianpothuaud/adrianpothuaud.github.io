import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const testimonials = [
    {
        name: "Julie M.",
        role: "Développeuse Front-end",
        text: "La formation Playwright a complètement changé notre façon de voir les tests. Adrian vulgarise les concepts avancés avec une facilité déconcertante. Notre couverture de test a doublé en 2 mois.",
    },
    {
        name: "Thomas D.",
        role: "Lead QA",
        text: "Nous avions une suite lente sous Selenium. Le coaching d'Adrian pour migrer vers Cypress a été un investissement rentabilisé dès le premier mois. Ses bonnes pratiques sont désormais notre standard.",
    },
    {
        name: "Sarah L.",
        role: "CTO",
        text: "Adrian ne vend pas juste de la formation, il installe une culture de la qualité. Son expertise sur l'ensemble de l'écosystème JS (WDIO, Cypress, Playwright) est rare sur le marché.",
    }
];

const Testimonials = () => {
    return (
        <section id="testimonials" style={{ padding: 'var(--space-2xl) 0', background: 'rgba(0,0,0,0.2)', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: 'var(--space-xl)' }}>
                    <h2 style={{ fontSize: '2.5rem' }}>Ce qu'ils disent <span className="text-gradient">de mes formations</span></h2>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
                    {testimonials.map((testi, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            className="glass-panel"
                            style={{ padding: '2rem', position: 'relative' }}
                        >
                            <Quote size={40} style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', opacity: 0.1, color: 'var(--color-accent-blue)' }} />

                            <p style={{ fontSize: '1.1rem', color: 'var(--color-text-secondary)', fontStyle: 'italic', marginBottom: '1.5rem', lineHeight: 1.6, position: 'relative', zIndex: 1 }}>
                                "{testi.text}"
                            </p>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(45deg, var(--color-accent-blue), var(--color-accent-purple))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                                    {testi.name.charAt(0)}
                                </div>
                                <div>
                                    <h4 style={{ fontWeight: 600, fontSize: '1rem', color: 'var(--color-text-primary)' }}>{testi.name}</h4>
                                    <span style={{ fontSize: '0.85rem', color: 'var(--color-accent-purple)' }}>{testi.role}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
