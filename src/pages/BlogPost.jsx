import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { ArrowLeft, Calendar, Clock, User } from 'lucide-react';
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
        return <div style={{ paddingTop: '150px', textAlign: 'center', minHeight: '60vh', color: 'var(--color-text-secondary)' }}>Chargement de l&apos;article...</div>;
    }

    if (error || !post) {
        return (
            <div style={{ paddingTop: '150px', textAlign: 'center', minHeight: '60vh' }}>
                <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Article introuvable</h1>
                <Link to="/blog" style={{ color: 'var(--color-accent-blue)', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                    <ArrowLeft size={16} /> Retour au blog
                </Link>
            </div>
        );
    }

    return (
        <article style={{ paddingTop: '110px', paddingBottom: 'var(--space-2xl)' }}>
            <SEO
                title={post.title}
                description={post.excerpt}
                url={`/blog/${post.slug}`}
                isBlogPost={true}
            />

            <div style={{ maxWidth: '720px', margin: '0 auto', padding: '0 var(--space-xl)' }}>
                <Link
                    to="/blog"
                    style={{ color: 'var(--color-text-secondary)', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', marginBottom: '2.5rem', fontSize: '0.875rem', fontWeight: 500, transition: 'color 0.2s' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-accent-blue)'}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-secondary)'}
                >
                    <ArrowLeft size={15} /> Retour aux articles
                </Link>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                    {post.tags && post.tags.length > 0 && (
                        <div style={{ marginBottom: '1.25rem' }}>
                            <span style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--color-accent-blue)', background: 'var(--color-accent-blue-light)', padding: '0.3rem 0.75rem', borderRadius: 'var(--radius-full)' }}>
                                {post.tags[0]}
                            </span>
                        </div>
                    )}

                    <h1 style={{ fontSize: 'clamp(1.75rem, 5vw, 2.75rem)', lineHeight: 1.2, marginBottom: '1.5rem', letterSpacing: '-0.02em', color: 'var(--color-text-primary)' }}>
                        {post.title}
                    </h1>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.25rem', color: 'var(--color-text-muted)', fontSize: '0.875rem', marginBottom: '2.5rem', paddingBottom: '2rem', borderBottom: '1px solid var(--color-border)' }}>
                        {post.date && <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Calendar size={15} /> {post.date}</div>}
                        {post.readTime && <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Clock size={15} /> {post.readTime}</div>}
                        {post.author && <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><User size={15} /> {post.author}</div>}
                    </div>

                    <div className="markdown-content blog-post-content">
                        <ReactMarkdown>{post.content}</ReactMarkdown>
                    </div>

                    {post.tags && (
                        <div style={{ marginTop: '3.5rem', paddingTop: '1.75rem', borderTop: '1px solid var(--color-border)', display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
                            <span style={{ fontSize: '0.85rem', color: 'var(--color-text-primary)', fontWeight: 600, marginRight: '0.25rem' }}>Tags :</span>
                            {post.tags.map(tag => (
                                <span key={tag} style={{ fontSize: '0.8rem', padding: '0.3rem 0.75rem', background: 'var(--color-bg-surface-solid)', border: '1px solid var(--color-border)', color: 'var(--color-text-secondary)', borderRadius: 'var(--radius-full)' }}>
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}

                    <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid var(--color-border)' }}>
                        <Link to="/blog" className="btn-secondary" style={{ display: 'inline-flex' }}>
                            <ArrowLeft size={16} /> Retour aux articles
                        </Link>
                    </div>
                </motion.div>
            </div>
        </article>
    );
};

export default BlogPost;
