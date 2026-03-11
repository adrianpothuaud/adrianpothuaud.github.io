import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { CheckCircle2 } from 'lucide-react';
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
            <div className="section-header">
                <span className="section-label">Formations &amp; Expertise</span>
                <h2>Des formations pour aller plus loin</h2>
                <p>
                    J&apos;interviens dans votre entreprise pour monter en compétence vos équipes QA et développeurs sur les meilleurs outils du marché.
                </p>
            </div>

            <div className="services-grid">
                {services.map((service, idx) => (
                    <motion.div
                        key={idx}
                        className="glass-panel"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-50px' }}
                        transition={{ duration: 0.4, delay: idx * 0.1 }}
                        whileHover={{ y: -6 }}
                        style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column' }}
                    >
                        <div style={{
                            width: '44px',
                            height: '44px',
                            borderRadius: '10px',
                            background: `${service.color}18`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: '1.25rem',
                            border: `1px solid ${service.color}30`
                        }}>
                            <div style={{ width: '20px', height: '20px', background: service.color, borderRadius: '50%' }}></div>
                        </div>

                        <h3 style={{ fontSize: '1.2rem', marginBottom: '0.75rem' }}>{service.title}</h3>
                        <div style={{ color: 'var(--color-text-secondary)', marginBottom: '1.25rem', fontSize: '0.95rem' }} className="markdown-content">
                            <ReactMarkdown>{service.content}</ReactMarkdown>
                        </div>

                        {service.features && (
                            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: 'auto' }}>
                                {service.features.map((feature, fIdx) => (
                                    <li key={fIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
                                        <CheckCircle2 size={15} style={{ color: service.color, flexShrink: 0, marginTop: '2px' }} />
                                        {feature}
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
