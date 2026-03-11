import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { APP_CONFIG } from '../config';
import OpenToWorkBadge from './OpenToWorkBadge';
import { Link } from 'react-router-dom';

const Header = () => {
    const [scrolled, setScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 40);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

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
                padding: '0.875rem 0',
                background: scrolled && !isMenuOpen ? 'rgba(255, 255, 255, 0.85)' : 'transparent',
                backdropFilter: scrolled && !isMenuOpen ? 'blur(16px)' : 'none',
                WebkitBackdropFilter: scrolled && !isMenuOpen ? 'blur(16px)' : 'none',
                borderBottom: scrolled && !isMenuOpen ? '1px solid var(--color-border)' : '1px solid transparent',
                transition: 'background 0.3s ease, border-color 0.3s ease'
            }}
        >
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', zIndex: 50 }}>
                    <Link
                        to="/"
                        onClick={() => setIsMenuOpen(false)}
                        style={{ fontSize: '1.15rem', fontWeight: 700, fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}
                    >
                        A<span className="text-gradient">.Pothuaud</span>
                    </Link>
                    {APP_CONFIG.OPEN_TO_WORK && <div className="responsive-badge"><OpenToWorkBadge /></div>}
                </div>

                {/* Hamburger Button (Mobile) */}
                <button
                    className="mobile-menu-btn"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
                >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                {/* Desktop Navigation */}
                <nav className="desktop-nav">
                    <ul style={{ display: 'flex', gap: '0.25rem', margin: 0, alignItems: 'center' }}>
                        {navLinks.map((link, idx) => (
                            <li key={idx}>
                                {link.isRoute ?
                                    <Link to={link.href} className="nav-link" style={{ padding: '0.4rem 0.75rem', display: 'block' }}>{link.name}</Link> :
                                    <a href={link.href} className="nav-link" style={{ padding: '0.4rem 0.75rem', display: 'block' }}>{link.name}</a>
                                }
                            </li>
                        ))}
                        <li style={{ marginLeft: '0.5rem' }}>
                            <a href="/#contact" className="btn-primary" style={{ padding: '0.5rem 1.1rem', fontSize: '0.875rem', borderRadius: 'var(--radius-full)' }}>
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
                                        transition={{ delay: 0.08 * (idx + 1) }}
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
                                    transition={{ delay: 0.4 }}
                                    style={{ marginTop: '1.5rem' }}
                                >
                                    <a href="/#contact" onClick={() => setIsMenuOpen(false)} className="btn-primary" style={{
                                        fontSize: '1.1rem',
                                        padding: '0.9rem 2.5rem',
                                        borderRadius: 'var(--radius-full)',
                                        background: 'var(--gradient-primary)'
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
