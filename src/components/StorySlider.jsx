import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Loader2 } from 'lucide-react';

const StorySlider = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const slidesCount = 3;

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slidesCount);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div style={{
            width: '100%',
            maxWidth: '560px',
            margin: '0 auto',
            background: 'var(--color-bg-surface-solid)',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid var(--color-border)',
            overflow: 'hidden',
            position: 'relative',
            minHeight: '320px',
            boxShadow: 'var(--shadow-lg)'
        }}>
            {/* ProgressBar */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'rgba(0,0,0,0.06)', zIndex: 10 }}>
                <motion.div
                    key={currentSlide}
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 5, ease: 'linear' }}
                    style={{ height: '100%', background: 'var(--gradient-primary)' }}
                />
            </div>

            <AnimatePresence mode="wait">

                {/* SLIDE 1: Evolution */}
                {currentSlide === 0 && (
                    <motion.div
                        key="slide0"
                        initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.4 }}
                        style={{ padding: '2.5rem 2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'center' }}
                    >
                        <h3 style={{ fontSize: '1.1rem', marginBottom: '1.5rem', textAlign: 'center', color: 'var(--color-text-primary)' }}>L&apos;évolution du Numérique</h3>
                        <div className="story-slider-images">
                            <div style={{ flex: 1, position: 'relative', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--color-border)' }}>
                                <img src="/images/vintage.png" alt="1990s Web" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'rgba(0,0,0,0.65)', color: '#fff', fontSize: '0.75rem', padding: '4px', textAlign: 'center', fontWeight: 600 }}>Hier</div>
                            </div>
                            <div style={{ flex: 1, position: 'relative', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--color-border)' }}>
                                <img src="/images/modern.png" alt="Modern SaaS" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'var(--color-accent-blue)', color: '#fff', fontSize: '0.75rem', padding: '4px', textAlign: 'center', fontWeight: 600 }}>Aujourd&apos;hui</div>
                            </div>
                            <div style={{ flex: 1, position: 'relative', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--color-border)' }}>
                                <img src="/images/future.png" alt="Future AR" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'var(--color-accent-purple)', color: '#fff', fontSize: '0.75rem', padding: '4px', textAlign: 'center', fontWeight: 600 }}>Demain</div>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* SLIDE 2: Crash */}
                {currentSlide === 1 && (
                    <motion.div
                        key="slide1"
                        initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.4 }}
                        style={{ padding: '2.5rem 2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'center', background: 'rgba(239, 68, 68, 0.03)' }}
                    >
                        <h3 style={{ fontSize: '1.1rem', marginBottom: '1.25rem', color: 'var(--color-accent-red)', textAlign: 'center' }}>Le coût de l&apos;instabilité</h3>

                        <div style={{ background: '#1a1a24', width: '100%', borderRadius: '10px', border: '1px solid #2d2d3a', overflow: 'hidden' }}>
                            <div style={{ background: '#252530', padding: '8px 12px', display: 'flex', gap: '6px', alignItems: 'center' }}>
                                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ff5f56' }} />
                                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ffbd2e' }} />
                                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#27c93f' }} />
                            </div>
                            <div style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', minHeight: '120px' }}>
                                <motion.div initial={{ opacity: 1 }} animate={{ opacity: 0 }} transition={{ delay: 1.5, duration: 0.2 }} style={{ position: 'absolute' }}>
                                    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}><Loader2 size={28} color="var(--color-accent-blue)" /></motion.div>
                                </motion.div>

                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6, duration: 0.2 }} style={{ position: 'absolute', textAlign: 'center' }}>
                                    <AlertTriangle size={36} color="var(--color-accent-red)" style={{ margin: '0 auto 0.5rem auto' }} />
                                    <div style={{ color: 'var(--color-accent-red)', fontWeight: 700, fontSize: '0.9rem' }}>FATAL ERROR 500</div>
                                    <div style={{ fontSize: '0.75rem', color: '#ffaaaa', fontFamily: 'monospace', marginTop: '0.4rem' }}>Uncaught TypeError</div>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* SLIDE 3: Solution */}
                {currentSlide === 2 && (
                    <motion.div
                        key="slide2"
                        initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.4 }}
                        style={{ padding: '2.5rem 2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'center' }}
                    >
                        <h3 style={{ fontSize: '1.1rem', marginBottom: '1.25rem', textAlign: 'center', color: 'var(--color-text-primary)' }}>La Qualité, votre bouclier</h3>
                        <div style={{ textAlign: 'center' }}>
                            <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem', lineHeight: 1.7 }}>
                                L&apos;automatisation des tests n&apos;est plus un luxe. C&apos;est l&apos;assurance vie de vos applications et de votre image de marque.
                            </p>
                            <motion.div
                                initial={{ scale: 0.95 }} animate={{ scale: 1 }} transition={{ repeat: Infinity, repeatType: 'reverse', duration: 2 }}
                                style={{ marginTop: '1.5rem', fontSize: '1.05rem', fontWeight: 700, color: 'var(--color-accent-green)', background: 'var(--color-accent-green-light)', padding: '0.6rem 1.25rem', borderRadius: 'var(--radius-full)', display: 'inline-block' }}
                            >
                                100% de sérénité au déploiement
                            </motion.div>
                        </div>
                    </motion.div>
                )}

            </AnimatePresence>

            {/* Controls */}
            <div style={{ position: 'absolute', bottom: '1rem', left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: '0.4rem' }}>
                {[0, 1, 2].map(idx => (
                    <button
                        key={idx}
                        onClick={() => setCurrentSlide(idx)}
                        aria-label={`Slide ${idx + 1}`}
                        style={{
                            width: currentSlide === idx ? '20px' : '8px',
                            height: '8px',
                            borderRadius: currentSlide === idx ? '4px' : '50%',
                            background: currentSlide === idx ? 'var(--color-accent-blue)' : 'rgba(0,0,0,0.2)',
                            padding: 0,
                            transition: 'all 0.3s ease',
                            cursor: 'pointer'
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default StorySlider;
