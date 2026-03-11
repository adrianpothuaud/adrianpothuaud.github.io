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
            // Take only the 3 latest posts for the home section
            setArticles(posts.slice(0, 3));
            setLoading(false);
        };
        fetchContent();
    }, []);

    if (loading || articles.length === 0) return null;

    return (
        <section id="blog" style={{ padding: 'var(--space-2xl) 0', position: 'relative' }}>
            <div style={{ textAlign: 'center', marginBottom: 'var(--space-xl)' }}>
                <h2 style={{ fontSize: '2.5rem' }}>Derniers <span className="text-gradient">Articles</span></h2>
                <p style={{ color: 'var(--color-text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
                    Consultez l'ensemble de nos guides ou <Link to="/blog" style={{ color: 'var(--color-accent-blue)', textDecoration: 'underline' }}>lancez une recherche</Link>.
                </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
                {articles.map((article, idx) => (
                    <Link to={`/blog/${article.slug}`} key={idx} style={{ textDecoration: 'none', display: 'flex' }}>
                        <motion.article
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
                                transition: 'transform 0.3s, border-color 0.3s',
                                width: '100%'
                            }}
                            whileHover={{ y: -5, borderColor: 'var(--color-accent-blue)' }}
                        >
                            <div style={{ display: 'flex', gap: '1.5rem', color: 'var(--color-text-secondary)', fontSize: '0.85rem', marginBottom: '1rem' }}>
                                {article.date && <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Calendar size={14} /> {article.date}</span>}
                                {article.readTime && <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Clock size={14} /> {article.readTime}</span>}
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
                    </Link>
                ))}
            </div>

            <div style={{ textAlign: 'center', marginTop: '3rem' }}>
                <Link to="/blog" style={{
                    display: 'inline-block',
                    padding: '12px 24px',
                    background: 'var(--color-bg-surface)',
                    border: '1px solid var(--color-accent-blue)',
                    borderRadius: 'var(--radius-md)',
                    color: 'var(--color-text-primary)',
                    fontWeight: 600
                }}>
                    Voir tous les articles
                </Link>
            </div>
        </section>
    );
};

export default Blog;
