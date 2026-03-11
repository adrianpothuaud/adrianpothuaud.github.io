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
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', width: '100%' }}>
                            <div style={{ flex: 1, padding: '1rem', background: '#0a0a0a', border: '1px solid #333', borderRadius: '8px', textAlign: 'center' }}>
                                <Code size={24} color="#888" style={{ marginBottom: '0.5rem' }} />
                                <div style={{ fontSize: '0.8rem', color: '#888' }}>Hier</div>
                                <div style={{ fontSize: '0.7rem', color: '#0f0', fontFamily: 'monospace', marginTop: '0.5rem' }}>&lt;html&gt;</div>
                            </div>
                            <div style={{ flex: 1, padding: '1rem', background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.3)', borderRadius: '8px', textAlign: 'center' }}>
                                <Smartphone size={24} color="var(--color-accent-blue)" style={{ marginBottom: '0.5rem' }} />
                                <div style={{ fontSize: '0.8rem', color: 'var(--color-accent-blue)' }}>Aujourd'hui</div>
                            </div>
                            <div style={{ flex: 1, padding: '1rem', background: 'rgba(139, 92, 246, 0.1)', border: '1px solid rgba(139, 92, 246, 0.3)', borderRadius: '8px', textAlign: 'center' }}>
                                <motion.div animate={{ y: [-2, 2, -2] }} transition={{ repeat: Infinity, duration: 2 }}><Hexagon size={24} color="var(--color-accent-purple)" style={{ marginBottom: '0.5rem' }} /></motion.div>
                                <div style={{ fontSize: '0.8rem', color: 'var(--color-accent-purple)' }}>Demain</div>
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
