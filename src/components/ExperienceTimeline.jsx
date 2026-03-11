import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { loadMarkdownContent } from '../utils/markdown';

const ExperienceTimeline = () => {
    const [experiences, setExperiences] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expandedItems, setExpandedItems] = useState(new Set([0]));

    const toggleItem = (idx) => {
        setExpandedItems(prev => {
            const next = new Set(prev);
            if (next.has(idx)) {
                next.delete(idx);
            } else {
                next.add(idx);
            }
            return next;
        });
    };

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
                        transition={{ duration: 0.45, delay: idx * 0.07 }}
                    >
                        <div className={`timeline-dot${expandedItems.has(idx) ? ' timeline-dot--active' : ''}`} />

                        <div className="glass-panel timeline-card">
                            <button
                                className="timeline-card-header"
                                onClick={() => toggleItem(idx)}
                                aria-expanded={expandedItems.has(idx)}
                            >
                                <div className="timeline-card-header-info">
                                    <h3 className="timeline-card-role">{exp.role}</h3>
                                    <p className="timeline-card-company">{exp.company}</p>
                                </div>
                                <div className="timeline-card-header-meta">
                                    <span className="timeline-period-badge">{exp.period}</span>
                                    <ChevronDown
                                        size={18}
                                        className={`timeline-chevron${expandedItems.has(idx) ? ' timeline-chevron--open' : ''}`}
                                    />
                                </div>
                            </button>

                            <AnimatePresence initial={false}>
                                {expandedItems.has(idx) && (
                                    <motion.div
                                        key="content"
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                                        style={{ overflow: 'hidden' }}
                                    >
                                        <div className="timeline-card-body markdown-content">
                                            <ReactMarkdown>{exp.content}</ReactMarkdown>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default ExperienceTimeline;
