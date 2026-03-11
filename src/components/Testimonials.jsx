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
        <section id="testimonials" style={{ padding: 'var(--space-2xl) 0', background: 'rgba(0,0,0,0.02)', borderTop: '1px solid rgba(0,0,0,0.05)', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
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

                            <div style={{ fontSize: '1.1rem', color: 'var(--color-text-secondary)', fontStyle: 'italic', marginBottom: '1.5rem', lineHeight: 1.6, position: 'relative', zIndex: 1 }}>
                                <ReactMarkdown>{testi.content}</ReactMarkdown>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--gradient-primary)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                                    {testi.name ? testi.name.charAt(0) : '?'}
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
