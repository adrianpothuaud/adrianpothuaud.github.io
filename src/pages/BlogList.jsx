import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, Calendar, Clock, ChevronRight, Tag } from 'lucide-react';
import { loadMarkdownContent } from '../utils/markdown';

import SEO from '../components/SEO';

const BlogList = () => {
    const [articles, setArticles] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTag, setActiveTag] = useState(null);
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

    const allTags = useMemo(() => {
        const tagSet = new Set();
        articles.forEach(a => (a.tags || []).forEach(t => tagSet.add(t)));
        return Array.from(tagSet);
    }, [articles]);

    const filteredArticles = articles.filter(article => {
        const term = searchQuery.toLowerCase();
        const matchesSearch = !term || (
            (article.title && article.title.toLowerCase().includes(term)) ||
            (article.excerpt && article.excerpt.toLowerCase().includes(term)) ||
            (article.tags && article.tags.some(tag => tag.toLowerCase().includes(term)))
        );
        const matchesTag = !activeTag || (article.tags && article.tags.includes(activeTag));
        return matchesSearch && matchesTag;
    });

    const resetFilters = () => {
        setSearchQuery('');
        setActiveTag(null);
    };

    return (
        <div className="container" style={{ paddingTop: '110px', paddingBottom: 'var(--space-2xl)', minHeight: '80vh' }}>
            <SEO title="Blog Technique" description="Articles et réflexions sur la Qualité Logicielle, l'automatisation de tests et le tooling." url="/blog" />
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ textAlign: 'center', marginBottom: 'var(--space-xl)' }}
            >
                <span className="section-label">Blog</span>
                <h1 style={{ fontSize: 'clamp(2rem, 5vw, 2.75rem)', marginBottom: '0.75rem', letterSpacing: '-0.02em' }}>
                    Journal <span className="text-gradient">Technique</span>
                </h1>
                <p style={{ color: 'var(--color-text-secondary)', maxWidth: '520px', margin: '0 auto', fontSize: '1.05rem', lineHeight: 1.65 }}>
                    Réflexions sur la QA, l&apos;automatisation, et l&apos;ingénierie logicielle.
                </p>

                <div style={{ marginTop: '1.75rem', maxWidth: '520px', margin: '1.75rem auto 0 auto', position: 'relative' }}>
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
                            transition: 'border-color 0.2s, box-shadow 0.2s',
                            boxSizing: 'border-box'
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

            {allTags.length > 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="blog-tag-filters"
                >
                    <Tag size={14} style={{ color: 'var(--color-text-muted)', flexShrink: 0 }} />
                    <button
                        className={`blog-tag-pill${!activeTag ? ' blog-tag-pill--active' : ''}`}
                        onClick={() => setActiveTag(null)}
                    >
                        Tous
                    </button>
                    {allTags.map(tag => (
                        <button
                            key={tag}
                            className={`blog-tag-pill${activeTag === tag ? ' blog-tag-pill--active' : ''}`}
                            onClick={() => setActiveTag(tag)}
                        >
                            {tag}
                        </button>
                    ))}
                </motion.div>
            )}

            {loading ? (
                <div style={{ textAlign: 'center', color: 'var(--color-text-secondary)', padding: '4rem 0' }}>Chargement des articles...</div>
            ) : filteredArticles.length > 0 ? (
                <>
                    <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
                        {filteredArticles.length} article{filteredArticles.length > 1 ? 's' : ''}
                        {(activeTag || searchQuery) ? ' correspondent à votre recherche' : ' au total'}
                    </p>
                    <div className="blog-grid">
                        {filteredArticles.map((article, idx) => (
                            <Link to={`/blog/${article.slug}`} key={idx} style={{ textDecoration: 'none', display: 'flex' }}>
                                <motion.article
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.45, delay: idx * 0.06 }}
                                    className="glass-panel blog-card"
                                    whileHover={{ y: -4 }}
                                >
                                    {article.tags && article.tags.length > 0 && (
                                        <div className="blog-card-tags">
                                            {article.tags.slice(0, 2).map(tag => (
                                                <span key={tag} className="blog-card-tag">{tag}</span>
                                            ))}
                                        </div>
                                    )}

                                    <h3 className="blog-card-title">{article.title}</h3>

                                    <p className="blog-card-excerpt">{article.excerpt}</p>

                                    <div className="blog-card-footer">
                                        <div className="blog-card-meta">
                                            {article.date && <span><Calendar size={13} /> {article.date}</span>}
                                            {article.readTime && <span><Clock size={13} /> {article.readTime}</span>}
                                        </div>
                                        <div className="blog-card-read">
                                            Lire <ChevronRight size={14} />
                                        </div>
                                    </div>
                                </motion.article>
                            </Link>
                        ))}
                    </div>
                </>
            ) : (
                <div style={{ textAlign: 'center', color: 'var(--color-text-secondary)', padding: '4rem 1rem' }}>
                    <p style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>Aucun article ne correspond à votre recherche.</p>
                    <button
                        onClick={resetFilters}
                        className="btn-secondary"
                        style={{ margin: '0 auto' }}
                    >
                        Réinitialiser les filtres
                    </button>
                </div>
            )}
        </div>
    );
};

export default BlogList;
