import { motion } from 'framer-motion';

const experiences = [
    {
        role: "Lead QA Engineer",
        company: "Tech Solutions Inc.",
        period: "2021 - Présent",
        description: "Mise en place de l'industrialisation des tests avec Playwright. Réduction du temps de build CI de 45%.",
    },
    {
        role: "Consultant Automatisation",
        company: "E-commerce Group",
        period: "2018 - 2021",
        description: "Création d'un framework Cypress from scratch pour 5 équipes au sein d'une architecture micro-services.",
    },
    {
        role: "Analyste Test & Recette",
        company: "Bank Finance",
        period: "2015 - 2018",
        description: "Stratégie de test Selenium pour des parcours critiques bancaires.",
    }
];

const ExperienceTimeline = () => {
    return (
        <section id="experience" style={{ padding: 'var(--space-2xl) 0', position: 'relative' }}>
            <div style={{ textAlign: 'center', marginBottom: 'var(--space-xl)' }}>
                <h2 style={{ fontSize: '2.5rem' }}>Mon Parcours</h2>
            </div>

            <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative' }}>
                {/* Ligne verticale de la timeline */}
                <div style={{ position: 'absolute', left: '24px', top: '10px', bottom: '10px', width: '2px', background: 'rgba(255,255,255,0.1)' }}></div>

                {experiences.map((exp, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.5, delay: idx * 0.2 }}
                        style={{ position: 'relative', paddingLeft: '60px', marginBottom: '3rem' }}
                    >
                        {/* Point sur la timeline */}
                        <div style={{
                            position: 'absolute', left: '16px', top: '6px', width: '18px', height: '18px',
                            borderRadius: '50%', background: 'var(--color-bg-base)', border: '4px solid var(--color-accent-blue)'
                        }}></div>

                        <div className="glass-panel" style={{ padding: '1.5rem 2rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                <h3 style={{ fontSize: '1.25rem', color: 'var(--color-text-primary)' }}>{exp.role}</h3>
                                <span style={{ fontSize: '0.9rem', color: 'var(--color-accent-purple)', fontWeight: 500 }}>{exp.period}</span>
                            </div>
                            <h4 style={{ fontSize: '1rem', color: 'var(--color-text-secondary)', marginBottom: '1rem', fontWeight: 400 }}>{exp.company}</h4>
                            <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>{exp.description}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default ExperienceTimeline;
