import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, Calendar, Clock, ChevronRight } from 'lucide-react';
import { loadMarkdownContent } from '../utils/markdown';

import SEO from '../components/SEO';

const BlogList = () => {
    const [articles, setArticles] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchContent = async () => {
            const globResult = import.meta.glob('../content/blog/*.md', { query: '?raw', import: 'default' });
            const posts = await loadMarkdownContent(globResult);
            setArticles(posts);
            setLoading(false);
        };
        fetchContent();
    }, []);

    const filteredArticles = articles.filter(article => {
        const term = searchQuery.toLowerCase();
        return (
            (article.title && article.title.toLowerCase().includes(term)) ||
            (article.excerpt && article.excerpt.toLowerCase().includes(term)) ||
            (article.tags && article.tags.some(tag => tag.toLowerCase().includes(term)))
        );
    });

    return (
        <div className="container" style={{ paddingTop: '110px', paddingBottom: 'var(--space-2xl)', minHeight: '80vh' }}>
            <SEO title="Blog Technique" description="Articles et réflexions sur la Qualité Logicielle, l'automatisation de tests et le tooling." url="/blog" />
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ textAlign: 'center', marginBottom: 'var(--space-2xl)' }}
            >
                <span className="section-label">Blog</span>
                <h1 style={{ fontSize: 'clamp(2rem, 5vw, 2.75rem)', marginBottom: '0.75rem', letterSpacing: '-0.02em' }}>
                    Journal <span className="text-gradient">Technique</span>
                </h1>
                <p style={{ color: 'var(--color-text-secondary)', maxWidth: '520px', margin: '0 auto', fontSize: '1.05rem', lineHeight: 1.65 }}>
                    Réflexions sur la QA, l&apos;automatisation, et l&apos;ingénierie logicielle.
                </p>

                <div style={{ marginTop: '2rem', maxWidth: '520px', margin: '2rem auto 0 auto', position: 'relative' }}>
                    <Search style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)', pointerEvents: 'none' }} size={18} />
                    <input
                        type="text"
                        placeholder="Rechercher par titre, tag ou contenu..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '0.875rem 1rem 0.875rem 2.75rem',
                            borderRadius: 'var(--radius-full)',
                            border: '1.5px solid var(--color-border)',
                            background: '#ffffff',
                            color: 'var(--color-text-primary)',
                            fontSize: '0.95rem',
                            outline: 'none',
                            boxShadow: 'var(--shadow-sm)',
                            transition: 'border-color 0.2s, box-shadow 0.2s'
                        }}
                        onFocus={(e) => {
                            e.target.style.borderColor = 'var(--color-accent-blue)';
                            e.target.style.boxShadow = '0 0 0 3px rgba(37,99,235,0.1)';
                        }}
                        onBlur={(e) => {
                            e.target.style.borderColor = 'var(--color-border)';
                            e.target.style.boxShadow = 'var(--shadow-sm)';
                        }}
                    />
                </div>
            </motion.div>

            {loading ? (
                <div style={{ textAlign: 'center', color: 'var(--color-text-secondary)', padding: '4rem 0' }}>Chargement des articles...</div>
            ) : filteredArticles.length > 0 ? (
                <div className="blog-grid">
                    {filteredArticles.map((article, idx) => (
                        <Link to={`/blog/${article.slug}`} key={idx} style={{ textDecoration: 'none', display: 'flex' }}>
                            <motion.article
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.45, delay: idx * 0.08 }}
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

                                <h3 style={{ fontSize: '1.1rem', color: 'var(--color-text-primary)', marginBottom: '0.625rem', lineHeight: 1.4, letterSpacing: '-0.01em' }}>
                                    {article.title}
                                </h3>

                                <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.65, marginBottom: '1.25rem', flexGrow: 1, fontSize: '0.9rem' }}>
                                    {article.excerpt}
                                </p>

                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.875rem', borderTop: '1px solid var(--color-border)' }}>
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
            ) : (
                <div style={{ textAlign: 'center', color: 'var(--color-text-secondary)', padding: '4rem 1rem' }}>
                    <p style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>Aucun article ne correspond à votre recherche.</p>
                    <button
                        onClick={() => setSearchQuery('')}
                        className="btn-secondary"
                        style={{ margin: '0 auto' }}
                    >
                        Réinitialiser la recherche
                    </button>
                </div>
            )}
        </div>
    );
};

export default BlogList;
