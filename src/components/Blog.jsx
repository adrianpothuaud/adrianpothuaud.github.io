import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Calendar, Clock } from 'lucide-react';
import { loadMarkdownContent } from '../utils/markdown';
import { Link } from 'react-router-dom';

const Blog = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchContent = async () => {
            const globResult = import.meta.glob('../content/blog/*.md', { query: '?raw', import: 'default' });
            const posts = await loadMarkdownContent(globResult);
            setArticles(posts.slice(0, 3));
            setLoading(false);
        };
        fetchContent();
    }, []);

    if (loading || articles.length === 0) return null;

    return (
        <section id="blog" style={{ padding: 'var(--space-2xl) 0', position: 'relative' }}>
            <div className="section-header">
                <span className="section-label">Blog</span>
                <h2>Derniers <span className="text-gradient">Articles</span></h2>
                <p>
                    Guides pratiques et réflexions sur la QA moderne. <Link to="/blog" style={{ color: 'var(--color-accent-blue)', fontWeight: 500 }}>Voir tous les articles →</Link>
                </p>
            </div>

            <div className="blog-grid">
                {articles.map((article, idx) => (
                    <Link to={`/blog/${article.slug}`} key={idx} style={{ textDecoration: 'none', display: 'flex' }}>
                        <motion.article
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-50px' }}
                            transition={{ duration: 0.45, delay: idx * 0.1 }}
                            className="glass-panel"
                            style={{
                                padding: '1.75rem',
                                display: 'flex',
                                flexDirection: 'column',
                                cursor: 'pointer',
                                width: '100%'
                            }}
                            whileHover={{ y: -5 }}
                        >
                            {article.tags && article.tags.length > 0 && (
                                <div style={{ marginBottom: '0.875rem' }}>
                                    <span style={{ fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--color-accent-blue)', background: 'var(--color-accent-blue-light)', padding: '0.25rem 0.6rem', borderRadius: 'var(--radius-full)' }}>
                                        {article.tags[0]}
                                    </span>
                                </div>
                            )}

                            <h3 style={{ fontSize: '1.1rem', color: 'var(--color-text-primary)', marginBottom: '0.75rem', lineHeight: 1.4, letterSpacing: '-0.01em' }}>
                                {article.title}
                            </h3>

                            <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.65, marginBottom: '1.25rem', flexGrow: 1, fontSize: '0.9rem' }}>
                                {article.excerpt}
                            </p>

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1rem', borderTop: '1px solid var(--color-border)' }}>
                                <div style={{ display: 'flex', gap: '1rem', color: 'var(--color-text-muted)', fontSize: '0.8rem' }}>
                                    {article.date && <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}><Calendar size={13} /> {article.date}</span>}
                                    {article.readTime && <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}><Clock size={13} /> {article.readTime}</span>}
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--color-accent-blue)', fontWeight: 600, fontSize: '0.82rem' }}>
                                    Lire <ChevronRight size={14} />
                                </div>
                            </div>
                        </motion.article>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default Blog;
