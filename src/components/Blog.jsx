import { motion } from 'framer-motion';
import { ChevronRight, Calendar, Clock } from 'lucide-react';

const articles = [
    {
        title: "Pourquoi Playwright devance Cypress en 2026",
        excerpt: "Analyse des performances, gestion de l'auto-waiting natif et des fixtures qui rendent l'outil de Microsoft incontournable.",
        date: "12 Mars 2026",
        readTime: "5 min"
    },
    {
        title: "Comment stabiliser vos tests E2E ?",
        excerpt: "Les anti-patterns classiques de l'automatisation : pourquoi vos tests sont lents et « flaky », et comment y remédier radicalement.",
        date: "28 Fevrier 2026",
        readTime: "8 min"
    },
    {
        title: "L'art du Page Object Model revisité",
        excerpt: "Le POM est mort, vive le POM ! Comment l'adapter aux applications React et Vue.js modernes avec WDIO.",
        date: "10 Janvier 2026",
        readTime: "6 min"
    }
];

const Blog = () => {
    return (
        <section id="blog" style={{ padding: 'var(--space-2xl) 0', position: 'relative' }}>
            <div style={{ textAlign: 'center', marginBottom: 'var(--space-xl)' }}>
                <h2 style={{ fontSize: '2.5rem' }}>Derniers <span className="text-gradient">Articles</span></h2>
                <p style={{ color: 'var(--color-text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
                    Réflexions, guides techniques et analyses sur l'écosystème de l'automatisation QA.
                </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
                {articles.map((article, idx) => (
                    <motion.article
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: idx * 0.1 }}
                        className="glass-panel"
                        style={{
                            padding: '2rem',
                            display: 'flex',
                            flexDirection: 'column',
                            cursor: 'pointer',
                            transition: 'transform 0.3s, border-color 0.3s'
                        }}
                        whileHover={{ y: -5, borderColor: 'var(--color-accent-blue)' }}
                    >
                        <div style={{ display: 'flex', gap: '1.5rem', color: 'var(--color-text-secondary)', fontSize: '0.85rem', marginBottom: '1rem' }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Calendar size={14} /> {article.date}</span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Clock size={14} /> {article.readTime}</span>
                        </div>

                        <h3 style={{ fontSize: '1.4rem', color: 'var(--color-text-primary)', marginBottom: '1rem', lineHeight: 1.3 }}>
                            {article.title}
                        </h3>

                        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.6, marginBottom: '2rem', flexGrow: 1 }}>
                            {article.excerpt}
                        </p>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-accent-blue)', fontWeight: 600, fontSize: '0.9rem', marginTop: 'auto' }}>
                            Lire l'article <ChevronRight size={16} />
                        </div>
                    </motion.article>
                ))}
            </div>
        </section>
    );
};

export default Blog;
