import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

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
                background: scrolled ? 'rgba(10, 10, 15, 0.8)' : 'transparent',
                backdropFilter: scrolled ? 'blur(12px)' : 'none',
                borderBottom: scrolled ? '1px solid rgba(255, 255, 255, 0.05)' : '1px solid transparent',
                transition: 'all 0.3s ease'
            }}
        >
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <a href="#" style={{ fontSize: '1.25rem', fontWeight: 700, fontFamily: 'var(--font-display)' }}>
                    A<span className="text-gradient">.Pothuaud</span>
                </a>

                <nav>
                    <ul style={{ display: 'flex', gap: '2rem', margin: 0 }}>
                        <li><a href="#services" style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--color-text-secondary)' }}>Formations</a></li>
                        <li><a href="#experience" style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--color-text-secondary)' }}>Parcours</a></li>
                        <li><a href="#testimonials" style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--color-text-secondary)' }}>Avis</a></li>
                        <li><a href="#blog" style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--color-text-secondary)' }}>Blog</a></li>
                        <li>
                            <a href="#contact" style={{
                                fontSize: '0.9rem',
                                fontWeight: 600,
                                color: '#fff',
                                background: 'rgba(255,255,255,0.1)',
                                padding: '0.5rem 1rem',
                                borderRadius: '100px',
                                border: '1px solid rgba(255,255,255,0.1)'
                            }}>
                                Me contacter
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </motion.header>
    );
};

export default Header;
