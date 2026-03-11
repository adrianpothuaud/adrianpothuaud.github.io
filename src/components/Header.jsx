import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Linkedin, BookOpen } from 'lucide-react';
import { APP_CONFIG } from '../config';
import OpenToWorkBadge from './OpenToWorkBadge';
import { Link } from 'react-router-dom';

const Header = () => {
    const [scrolled, setScrolled] = useState(false);

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Empêcher le scroll du body quand le menu mobile est ouvert
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isMenuOpen]);

    const navLinks = [
        { name: "Formations", href: "/#services" },
        { name: "Parcours", href: "/#experience" },
        { name: "Avis", href: "/#testimonials" },
        { name: "Blog", href: "/blog", isRoute: true }
    ];

    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 40,
                padding: '1rem 0',
                background: scrolled && !isMenuOpen ? 'rgba(255, 255, 255, 0.8)' : 'transparent',
                backdropFilter: scrolled && !isMenuOpen ? 'blur(12px)' : 'none',
                borderBottom: scrolled && !isMenuOpen ? '1px solid rgba(0, 0, 0, 0.05)' : '1px solid transparent',
                transition: 'all 0.3s ease'
            }}
        >
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', zIndex: 50 }}>
                    <Link to="/" onClick={() => setIsMenuOpen(false)} style={{ fontSize: '1.25rem', fontWeight: 700, fontFamily: 'var(--font-display)' }}>
                        A<span className="text-gradient">.Pothuaud</span>
                    </Link>
                    {APP_CONFIG.OPEN_TO_WORK && <div className="responsive-badge"><OpenToWorkBadge /></div>}
                </div>

                {/* Hamburger Button (Mobile) */}
                <button
                    className="mobile-menu-btn"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Menu"
                >
                    {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>

                {/* Desktop Navigation */}
                <nav className="desktop-nav">
                    <ul style={{ display: 'flex', gap: '2rem', margin: 0, alignItems: 'center' }}>
                        {navLinks.map((link, idx) => (
                            <li key={idx}>
                                {link.isRoute ?
                                    <Link to={link.href} style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--color-text-secondary)' }}>{link.name}</Link> :
                                    <a href={link.href} style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--color-text-secondary)' }}>{link.name}</a>
                                }
                            </li>
                        ))}
                        <li>
                            <a href="https://www.linkedin.com/in/adrian-pothuaud/" target="_blank" rel="noopener noreferrer" title="LinkedIn" style={{ color: 'var(--color-text-secondary)', display: 'flex', alignItems: 'center' }}>
                                <Linkedin size={18} />
                            </a>
                        </li>
                        <li>
                            <a href="https://medium.com/@adrianpothuaud" target="_blank" rel="noopener noreferrer" title="Blog Medium" style={{ color: 'var(--color-text-secondary)', display: 'flex', alignItems: 'center' }}>
                                <BookOpen size={18} />
                            </a>
                        </li>
                        <li>
                            <a href="/#contact" style={{
                                fontSize: '0.9rem',
                                fontWeight: 600,
                                color: 'var(--color-accent-blue)',
                                background: 'transparent',
                                padding: '0.5rem 1rem',
                                borderRadius: '100px',
                                border: '1px solid var(--color-accent-blue)'
                            }}>
                                Me contacter
                            </a>
                        </li>
                    </ul>
                </nav>

                {/* Mobile Navigation Overlay */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.nav
                            className="mobile-nav-overlay"
                            initial={{ opacity: 0, y: '-100%' }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: '-100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        >
                            <ul className="mobile-nav-links">
                                {navLinks.map((link, idx) => (
                                    <motion.li
                                        key={idx}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 * (idx + 1) }}
                                    >
                                        {link.isRoute ?
                                            <Link to={link.href} onClick={() => setIsMenuOpen(false)} style={{ fontWeight: 600, color: 'var(--color-text-primary)' }}>{link.name}</Link> :
                                            <a href={link.href} onClick={() => setIsMenuOpen(false)} style={{ fontWeight: 600, color: 'var(--color-text-primary)' }}>{link.name}</a>
                                        }
                                    </motion.li>
                                ))}
                                <motion.li
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 }}
                                    style={{ marginTop: '2rem' }}
                                >
                                    <a href="/#contact" onClick={() => setIsMenuOpen(false)} style={{
                                        fontSize: '1.1rem',
                                        fontWeight: 600,
                                        color: '#fff',
                                        background: 'var(--gradient-primary)',
                                        padding: '0.8rem 2rem',
                                        borderRadius: '100px',
                                        display: 'inline-block'
                                    }}>
                                        Me contacter
                                    </a>
                                </motion.li>
                            </ul>
                        </motion.nav>
                    )}
                </AnimatePresence>
            </div>
        </motion.header>
    );
};

export default Header;
