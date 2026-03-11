import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { loadMarkdownContent } from '../utils/markdown';

const Testimonials = () => {
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchContent = async () => {
            const globResult = import.meta.glob('../content/testimonials/*.md', { query: '?raw', import: 'default' });
            const posts = await loadMarkdownContent(globResult);
            setTestimonials(posts.sort((a, b) => a.order - b.order));
            setLoading(false);
        };
        fetchContent();
    }, []);

    if (loading || testimonials.length === 0) return null;

    return (
        <section id="testimonials" style={{ padding: 'var(--space-2xl) 0', background: 'var(--color-bg-surface-solid)', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}>
            <div className="container">
                <div className="section-header">
                    <span className="section-label">Témoignages</span>
                    <h2>Ce qu&apos;ils disent <span className="text-gradient">de mes formations</span></h2>
                </div>

                <div className="testimonials-grid">
                    {testimonials.map((testi, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-50px' }}
                            transition={{ duration: 0.45, delay: idx * 0.1 }}
                            className="glass-panel"
                            style={{ padding: '1.75rem', position: 'relative', background: '#ffffff' }}
                        >
                            <Quote size={32} style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', opacity: 0.08, color: 'var(--color-accent-blue)' }} />

                            <div style={{ fontSize: '0.975rem', color: 'var(--color-text-secondary)', fontStyle: 'italic', marginBottom: '1.5rem', lineHeight: 1.7, position: 'relative', zIndex: 1 }} className="markdown-content">
                                <ReactMarkdown>{testi.content}</ReactMarkdown>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', paddingTop: '1.25rem', borderTop: '1px solid var(--color-border)' }}>
                                <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'var(--gradient-primary)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.9rem', flexShrink: 0 }}>
                                    {testi.name ? testi.name.charAt(0) : '?'}
                                </div>
                                <div>
                                    <p style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--color-text-primary)', marginBottom: 0 }}>{testi.name}</p>
                                    <span style={{ fontSize: '0.8rem', color: 'var(--color-accent-purple)' }}>{testi.role}</span>
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
