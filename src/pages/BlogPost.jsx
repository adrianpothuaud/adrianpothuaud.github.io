import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { ArrowLeft, Calendar, Clock, User, ExternalLink } from 'lucide-react';
import { loadMarkdownContent } from '../utils/markdown';
import SEO from '../components/SEO';

const BlogPost = () => {
    const { slug } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const globResult = import.meta.glob('../content/blog/*.md', { query: '?raw', import: 'default' });
                const posts = await loadMarkdownContent(globResult);

                const foundPost = posts.find(p => p.slug === slug);
                if (foundPost) {
                    setPost(foundPost);
                } else {
                    setError(true);
                }
            } catch (err) {
                console.error(err);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchContent();
        window.scrollTo(0, 0);
    }, [slug]);

    if (loading) {
        return <div style={{ paddingTop: '150px', textAlign: 'center', minHeight: '60vh', color: 'var(--color-text-secondary)' }}>Chargement de l'article...</div>;
    }

    if (error || !post) {
        return (
            <div style={{ paddingTop: '150px', textAlign: 'center', minHeight: '60vh' }}>
                <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Article introuvable</h1>
                <Link to="/blog" style={{ color: 'var(--color-accent-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                    <ArrowLeft size={16} /> Retour au blog
                </Link>
            </div>
        );
    }

    return (
        <article className="container" style={{ paddingTop: '120px', paddingBottom: 'var(--space-2xl)', maxWidth: '800px' }}>
            <SEO
                title={post.title}
                description={post.excerpt}
                url={`/blog/${post.slug}`}
                isBlogPost={true}
            />

            <Link to="/blog" style={{ color: 'var(--color-text-secondary)', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', fontSize: '0.9rem', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = 'var(--color-accent-blue)'} onMouseLeave={(e) => e.target.style.color = 'var(--color-text-secondary)'}>
                <ArrowLeft size={16} /> Retour aux articles
            </Link>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', lineHeight: 1.2, marginBottom: '1.5rem', color: 'var(--color-text-primary)' }}>
                    {post.title}
                </h1>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', color: 'var(--color-text-secondary)', fontSize: '0.95rem', marginBottom: '3rem', paddingBottom: '2rem', borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
                    {post.date && <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Calendar size={16} /> {post.date}</div>}
                    {post.readTime && <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Clock size={16} /> {post.readTime}</div>}
                    {post.author && <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><User size={16} /> {post.author}</div>}
                </div>

                <div className="markdown-content" style={{ fontSize: '1.1rem', lineHeight: 1.8, color: 'var(--color-text-secondary)' }}>
                    <ReactMarkdown>{post.content}</ReactMarkdown>
                </div>

                {post.tags && (
                    <div style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid rgba(0,0,0,0.1)', display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
                        <span style={{ fontSize: '0.9rem', color: 'var(--color-text-primary)', fontWeight: 600, marginRight: '0.5rem', display: 'flex', alignItems: 'center' }}>Tags :</span>
                        {post.tags.map(tag => (
                            <span key={tag} style={{ fontSize: '0.85rem', padding: '6px 14px', background: 'var(--color-bg-surface)', border: '1px solid rgba(0,0,0,0.1)', color: 'var(--color-text-secondary)', borderRadius: '100px' }}>
                                {tag}
                            </span>
                        ))}
                    </div>
                )}

                {post.mediumUrl && (
                    <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                        <a
                            href={post.mediumUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                color: 'var(--color-text-secondary)',
                                fontSize: '0.9rem',
                                padding: '0.6rem 1.2rem',
                                border: '1px solid rgba(0,0,0,0.15)',
                                borderRadius: 'var(--radius-full)',
                                transition: 'color 0.2s, border-color 0.2s'
                            }}
                        >
                            <ExternalLink size={14} /> Lire l'article original sur Medium
                        </a>
                    </div>
                )}
            </motion.div>
        </article>
    );
};

export default BlogPost;
