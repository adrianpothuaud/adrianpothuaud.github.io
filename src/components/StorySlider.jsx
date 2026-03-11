import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Smartphone, Monitor, Hexagon, AlertTriangle, Loader2 } from 'lucide-react';

const StorySlider = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const slidesCount = 3;

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slidesCount);
        }, 5000); // Change slide every 5 seconds
        return () => clearInterval(timer);
    }, []);

    return (
        <div style={{ width: '100%', maxWidth: '600px', margin: '0 auto', background: 'var(--color-bg-surface)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)', overflow: 'hidden', position: 'relative', minHeight: '350px' }}>

            {/* ProgressBar */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: 'rgba(255,255,255,0.1)', zIndex: 10 }}>
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
                        initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.5 }}
                        style={{ padding: '3rem 2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'center' }}
                    >
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '2rem', textAlign: 'center' }}>L'évolution du Numérique</h3>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', width: '100%', height: '220px' }}>
                            <div style={{ flex: 1, position: 'relative', borderRadius: '8px', overflow: 'hidden', border: '1px solid rgba(0,0,0,0.1)' }}>
                                <img src="/images/vintage.png" alt="1990s Web" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'rgba(0,0,0,0.7)', color: '#fff', fontSize: '0.8rem', padding: '4px', textAlign: 'center', fontWeight: 'bold' }}>Hier</div>
                            </div>
                            <div style={{ flex: 1, position: 'relative', borderRadius: '8px', overflow: 'hidden', border: '1px solid rgba(0,0,0,0.1)' }}>
                                <img src="/images/modern.png" alt="Modern SaaS" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'var(--color-accent-blue)', color: '#fff', fontSize: '0.8rem', padding: '4px', textAlign: 'center', fontWeight: 'bold' }}>Aujourd'hui</div>
                            </div>
                            <div style={{ flex: 1, position: 'relative', borderRadius: '8px', overflow: 'hidden', border: '1px solid rgba(0,0,0,0.1)' }}>
                                <img src="/images/future.png" alt="Future AR" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'var(--color-accent-purple)', color: '#fff', fontSize: '0.8rem', padding: '4px', textAlign: 'center', fontWeight: 'bold' }}>Demain</div>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* SLIDE 2: Crash */}
                {currentSlide === 1 && (
                    <motion.div
                        key="slide1"
                        initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.5 }}
                        style={{ padding: '3rem 2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'center', background: 'rgba(239, 68, 68, 0.05)' }}
                    >
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--color-accent-red)', textAlign: 'center' }}>Le coût de l'instabilité</h3>

                        <div style={{ background: '#1a1a24', width: '100%', borderRadius: '8px', border: '1px solid #333', overflow: 'hidden' }}>
                            <div style={{ background: '#252530', padding: '8px', display: 'flex', gap: '6px' }}>
                                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ff5f56' }} />
                                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ffbd2e' }} />
                                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#27c93f' }} />
                            </div>
                            <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', minHeight: '150px' }}>
                                <motion.div initial={{ opacity: 1 }} animate={{ opacity: 0 }} transition={{ delay: 1.5, duration: 0.2 }} style={{ position: 'absolute' }}>
                                    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}><Loader2 size={32} color="var(--color-accent-blue)" /></motion.div>
                                </motion.div>

                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6, duration: 0.2 }} style={{ position: 'absolute', textAlign: 'center' }}>
                                    <AlertTriangle size={40} color="var(--color-accent-red)" style={{ margin: '0 auto 0.5rem auto' }} />
                                    <div style={{ color: 'var(--color-accent-red)', fontWeight: 'bold' }}>FATAL ERROR 500</div>
                                    <div style={{ fontSize: '0.8rem', color: '#ffaaaa', fontFamily: 'monospace', marginTop: '0.5rem' }}>Uncaught TypeError</div>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* SLIDE 3: Solution */}
                {currentSlide === 2 && (
                    <motion.div
                        key="slide2"
                        initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.5 }}
                        style={{ padding: '3rem 2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'center' }}
                    >
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', textAlign: 'center' }}>La Qualité, votre bouclier</h3>
                        <div style={{ textAlign: 'center' }}>
                            <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.1rem', lineHeight: 1.6 }}>
                                L'automatisation des tests n'est plus un luxe. C'est l'assurance vie de vos applications et de votre image de marque.
                            </p>
                            <motion.div
                                initial={{ scale: 0.9 }} animate={{ scale: 1 }} transition={{ repeat: Infinity, repeatType: 'reverse', duration: 2 }}
                                style={{ marginTop: '2rem', fontSize: '1.2rem', fontWeight: 600, color: 'var(--color-accent-green)' }}
                            >
                                100% de sérénité au déploiement
                            </motion.div>
                        </div>
                    </motion.div>
                )}

            </AnimatePresence>

            {/* Controls */}
            <div style={{ position: 'absolute', bottom: '1rem', left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
                {[0, 1, 2].map(idx => (
                    <button
                        key={idx}
                        onClick={() => setCurrentSlide(idx)}
                        style={{
                            width: '10px', height: '10px', borderRadius: '50%',
                            background: currentSlide === idx ? '#fff' : 'rgba(255,255,255,0.3)',
                            padding: 0
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default StorySlider;
