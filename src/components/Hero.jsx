import { motion } from 'framer-motion';
import { Terminal, ShieldCheck, Zap, Code2 } from 'lucide-react';

const Hero = () => {
    return (
        <section
            style={{
                minHeight: '80vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 'var(--space-2xl) 0'
            }}
        >
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                style={{ textAlign: 'center', maxWidth: '800px' }}
            >
                <div style={{ display: 'inline-block', padding: '0.5rem 1rem', background: 'var(--color-bg-surface)', borderRadius: 'var(--radius-full)', border: '1px solid rgba(255,255,255,0.1)', marginBottom: 'var(--space-md)' }}>
                    <span style={{ color: 'var(--color-accent-blue)', fontWeight: 600, fontSize: '0.9rem' }}>
                        Expert QA & Automatisation
                    </span>
                </div>

                <h1 style={{ fontSize: '3.5rem', marginBottom: 'var(--space-md)', lineHeight: 1.1 }}>
                    Sécurisez vos déploiements avec <br />
                    <span className="text-gradient">Adrian Pothuaud</span>
                </h1>

                <p style={{ fontSize: '1.25rem', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xl)', lineHeight: 1.6 }}>
                    J'aide les équipes de développement à livrer plus vite et avec confiance grâce
                    à des stratégies de test automatisées robustes. Formation, coaching et intégration.
                </p>

                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                    <button style={{
                        background: 'var(--color-accent-blue)',
                        color: '#fff',
                        padding: '0.75rem 1.5rem',
                        borderRadius: 'var(--radius-sm)',
                        fontWeight: 600,
                        transition: 'background 0.2s'
                    }}
                        onMouseEnter={(e) => e.target.style.background = '#2563eb'}
                        onMouseLeave={(e) => e.target.style.background = 'var(--color-accent-blue)'}
                    >
                        Voir mes formations
                    </button>

                    <button style={{
                        background: 'transparent',
                        color: 'var(--color-text-primary)',
                        border: '1px solid var(--color-text-secondary)',
                        padding: '0.75rem 1.5rem',
                        borderRadius: 'var(--radius-sm)',
                        fontWeight: 500,
                        transition: 'all 0.2s'
                    }}
                        onMouseEnter={(e) => { e.target.style.borderColor = 'var(--color-accent-blue)'; e.target.style.color = 'var(--color-accent-blue)' }}
                        onMouseLeave={(e) => { e.target.style.borderColor = 'var(--color-text-secondary)'; e.target.style.color = 'var(--color-text-primary)' }}
                    >
                        Me contacter
                    </button>
                </div>
            </motion.div>

            {/* Tech Stack Banner */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
                style={{ marginTop: 'var(--space-2xl)', display: 'flex', gap: '3rem', flexWrap: 'wrap', justifyContent: 'center', opacity: 0.7 }}
            >
                {[
                    { icon: Terminal, name: 'Cypress' },
                    { icon: ShieldCheck, name: 'Playwright' },
                    { icon: Code2, name: 'Selenium' },
                    { icon: Zap, name: 'WebdriverIO' }
                ].map((tech, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-secondary)' }}>
                        <tech.icon size={24} />
                        <span style={{ fontWeight: 500 }}>{tech.name}</span>
                    </div>
                ))}
            </motion.div>
        </section>
    );
};

export default Hero;
