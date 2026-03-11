import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { loadMarkdownContent } from '../utils/markdown';

const Services = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchContent = async () => {
            const globResult = import.meta.glob('../content/services/*.md', { query: '?raw', import: 'default' });
            const posts = await loadMarkdownContent(globResult);
            setServices(posts.sort((a, b) => a.order - b.order));
            setLoading(false);
        };
        fetchContent();
    }, []);

    if (loading) return null;

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
                        <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: `${service.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', boxShadow: 'var(--shadow-sm)' }}>
                            <div style={{ width: '24px', height: '24px', background: service.color, borderRadius: '50%' }}></div>
                        </div>

                        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{service.title}</h3>
                        <div style={{ color: 'var(--color-text-secondary)', marginBottom: '1.5rem', lineHeight: 1.6 }} className="markdown-content">
                            <ReactMarkdown>{service.content}</ReactMarkdown>
                        </div>

                        {service.features && (
                            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                {service.features.map((feature, fIdx) => (
                                    <li key={fIdx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>
                                        <span style={{ color: service.color, fontWeight: 'bold' }}>✓</span> {feature}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Services;
