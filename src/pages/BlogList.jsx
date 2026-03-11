import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, Calendar, Clock, ChevronRight } from 'lucide-react';
import { loadMarkdownContent } from '../utils/markdown';

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
        <div className="container" style={{ paddingTop: '120px', paddingBottom: 'var(--space-2xl)', minHeight: '80vh' }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ textAlign: 'center', marginBottom: 'var(--space-2xl)' }}
            >
                <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Journal <span className="text-gradient">Technique</span></h1>
                <p style={{ color: 'var(--color-text-secondary)', maxWidth: '600px', margin: '0 auto', fontSize: '1.2rem' }}>
                    Réflexions sur la QA, l'automatisation, et l'ingénierie logicielle.
                </p>

                <div style={{ marginTop: '2.5rem', maxWidth: '600px', margin: '2.5rem auto 0 auto', position: 'relative' }}>
                    <Search style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-secondary)' }} size={20} />
                    <input
                        type="text"
                        placeholder="Rechercher par titre, tag ou contenu..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '1rem 1rem 1rem 3rem',
                            borderRadius: 'var(--radius-full)',
                            border: '1px solid rgba(0,0,0,0.1)',
                            background: 'var(--color-bg-surface)',
                            color: 'var(--color-text-primary)',
                            fontSize: '1rem',
                            outline: 'none',
                            boxShadow: 'var(--shadow-sm)'
                        }}
                    />
                </div>
            </motion.div>

            {loading ? (
                <div style={{ textAlign: 'center', color: 'var(--color-text-secondary)' }}>Chargement des articles...</div>
            ) : filteredArticles.length > 0 ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
                    {filteredArticles.map((article, idx) => (
                        <Link to={`/blog/${article.slug}`} key={idx} style={{ textDecoration: 'none', display: 'flex' }}>
                            <motion.article
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
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

                                <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem', flexGrow: 1 }}>
                                    {article.excerpt}
                                </p>

                                {article.tags && (
                                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
                                        {article.tags.map(tag => (
                                            <span key={tag} style={{ fontSize: '0.75rem', padding: '4px 10px', background: 'rgba(59, 130, 246, 0.1)', color: 'var(--color-accent-blue)', borderRadius: '100px' }}>
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                )}

                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-accent-blue)', fontWeight: 600, fontSize: '0.9rem', marginTop: 'auto' }}>
                                    Lire l'article <ChevronRight size={16} />
                                </div>
                            </motion.article>
                        </Link>
                    ))}
                </div>
            ) : (
                <div style={{ textAlign: 'center', color: 'var(--color-text-secondary)', padding: '3rem' }}>
                    <p style={{ fontSize: '1.2rem' }}>Aucun article ne correspond à votre recherche.</p>
                    <button
                        onClick={() => setSearchQuery('')}
                        style={{ marginTop: '1rem', color: 'var(--color-accent-blue)', textDecoration: 'underline' }}
                    >
                        Réinitialiser la recherche
                    </button>
                </div>
            )}
        </div>
    );
};

export default BlogList;
