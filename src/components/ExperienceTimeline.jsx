import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { loadMarkdownContent } from '../utils/markdown';

const ExperienceTimeline = () => {
    const [experiences, setExperiences] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchContent = async () => {
            const globResult = import.meta.glob('../content/experience/*.md', { query: '?raw', import: 'default' });
            const posts = await loadMarkdownContent(globResult);
            setExperiences(posts.sort((a, b) => a.order - b.order));
            setLoading(false);
        };
        fetchContent();
    }, []);

    if (loading) return null;

    return (
        <section id="experience" style={{ padding: 'var(--space-2xl) 0', position: 'relative' }}>
            <div className="section-header">
                <span className="section-label">Parcours</span>
                <h2>Mon expérience</h2>
            </div>

            <div className="timeline-wrapper">
                <div className="timeline-line" />

                {experiences.map((exp, idx) => (
                    <motion.div
                        key={idx}
                        className="timeline-item"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.45, delay: idx * 0.1 }}
                    >
                        <div className="timeline-dot" />

                        <div className="glass-panel" style={{ padding: '1.5rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.25rem' }}>
                                <h3 style={{ fontSize: '1.1rem', color: 'var(--color-text-primary)', marginBottom: 0 }}>{exp.role}</h3>
                                <span style={{ fontSize: '0.8rem', color: 'var(--color-accent-purple)', fontWeight: 500, background: 'var(--color-accent-purple-light)', padding: '0.2rem 0.6rem', borderRadius: 'var(--radius-full)', whiteSpace: 'nowrap' }}>{exp.period}</span>
                            </div>
                            <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', marginBottom: '0.75rem', fontWeight: 500 }}>{exp.company}</p>
                            <div style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }} className="markdown-content">
                                <ReactMarkdown>{exp.content}</ReactMarkdown>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default ExperienceTimeline;
