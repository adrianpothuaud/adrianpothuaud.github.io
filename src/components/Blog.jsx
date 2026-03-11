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
        </section>
    );
};

export default Blog;
