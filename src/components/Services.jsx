import { motion } from 'framer-motion';

const services = [
    {
        title: "Formation Cypress",
        description: "Maîtrisez les tests End-to-End modernes. De la configuration initiale aux tests de composants, devenez autonome sur Cypress.",
        color: "var(--color-accent-green)",
        features: ["Setup & Architecture", "Custom Commands", "Tests API & UI", "CI/CD Integration"]
    },
    {
        title: "Masterclass Playwright",
        description: "Exploitez toute la puissance de l'outil nouvelle génération de Microsoft. Multi-browser, rapidité, et robustesse.",
        color: "var(--color-accent-purple)",
        features: ["Auto-waiting avancé", "Fixtures", "Trace Viewer", "Parallelization"]
    },
    {
        title: "Coaching Selenium & WDIO",
        description: "Mise à l'échelle de vos suites historiques ou architecture de nouveaux frameworks sur mesure avec le standard W3C.",
        color: "var(--color-accent-blue)",
        features: ["Page Object Model", "Grid & Cloud", "Appium (Mobile)", "Reporting"]
    }
];

const Services = () => {
    return (
        <section id="services" style={{ padding: 'var(--space-2xl) 0' }}>
            <div style={{ textAlign: 'center', marginBottom: 'var(--space-xl)' }}>
                <h2 style={{ fontSize: '2.5rem' }}>Mes Formations & Expertise</h2>
                <p style={{ color: 'var(--color-text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
                    J'interviens dans votre entreprise pour monter en compétence vos équipes QA et développeurs sur les meilleurs outils du marché.
                </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                {services.map((service, idx) => (
                    <motion.div
                        key={idx}
                        className="glass-panel"
                        whileHover={{ y: -10, borderColor: service.color }}
                        style={{ padding: '2rem', transition: 'border-color 0.3s' }}
                    >
                        <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: `${service.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                            <div style={{ width: '24px', height: '24px', background: service.color, borderRadius: '50%' }}></div>
                        </div>

                        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{service.title}</h3>
                        <p style={{ color: 'var(--color-text-secondary)', marginBottom: '1.5rem', lineHeight: 1.6 }}>{service.description}</p>

                        <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            {service.features.map((feature, fIdx) => (
                                <li key={fIdx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: '#ccc' }}>
                                    <span style={{ color: service.color }}>✓</span> {feature}
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Services;
