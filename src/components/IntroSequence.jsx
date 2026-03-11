import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Smartphone, Monitor, Hexagon, AlertTriangle, Loader2, XCircle } from 'lucide-react';

// eslint-disable-next-line react/prop-types
const IntroSequence = ({ onComplete }) => {
    const [step, setStep] = useState(0);

    useEffect(() => {
        // Sequence timing logic - Ralenti suite feedback
        // Step 0: The Evolution (Hier, Aujourd'hui, Demain) - 0 to 7s
        // Step 1: The Crash (Realistic Error) - 7 to 14s
        // Step 2: The Solution (Quality) - 14 to 19s
        // Step 3: Finish - 19s+
        const timers = [
            setTimeout(() => setStep(1), 7000),
            setTimeout(() => setStep(2), 14000),
            setTimeout(() => setStep(3), 19000),
            setTimeout(onComplete, 20000)
        ];

        return () => timers.forEach(clearTimeout);
    }, [onComplete]);

    // Framer motion variants
    const wrapVariant = {
        initial: { opacity: 0 },
        animate: { opacity: 1, transition: { duration: 0.8 } },
        exit: { opacity: 0, scale: 0.95, transition: { duration: 0.5 } }
    };

    return (
        <motion.div
            className="intro-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 1 } }}
            style={{
                position: 'fixed',
                inset: 0,
                backgroundColor: 'var(--color-bg-base)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 50,
                padding: '2rem',
                textAlign: 'center',
                overflow: 'hidden'
            }}
        >
            <AnimatePresence mode="wait">

                {/* SCENE 1: L'ÉVOLUTION */}
                {step === 0 && (
                    <motion.div
                        key="evolution"
                        variants={wrapVariant}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        style={{ width: '100%', maxWidth: '1000px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                    >
                        <motion.h2
                            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
                            style={{ fontSize: 'clamp(1.8rem, 5vw, 2.5rem)', marginBottom: '4rem', fontWeight: 300, color: 'var(--color-text-primary)' }}
                        >
                            Notre monde évolue <span className="text-gradient" style={{ fontWeight: 600 }}>à toute vitesse</span>.
                        </motion.h2>

                        <div className="intro-evolution-grid">

                            {/* Hier */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.8 }}
                                className="intro-evolution-item"
                            >
                                <div style={{ position: 'absolute', top: '10px', left: '10px', background: 'rgba(0,0,0,0.8)', padding: '4px 12px', color: '#fff', fontWeight: 'bold', fontSize: '1rem', borderRadius: '4px', zIndex: 10 }}>
                                    HIER
                                </div>
                                <img src="/images/vintage.png" alt="1990s Web" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </motion.div>

                            {/* Aujourd'hui */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.5, duration: 0.8 }}
                                className="intro-evolution-item"
                            >
                                <div style={{ position: 'absolute', top: '10px', left: '10px', background: 'var(--color-accent-blue)', padding: '4px 12px', color: '#fff', fontWeight: 'bold', fontSize: '1rem', borderRadius: '4px', zIndex: 10 }}>
                                    AUJOURD'HUI
                                </div>
                                <img src="/images/modern.png" alt="Modern SaaS" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </motion.div>

                            {/* Demain */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.5, duration: 0.8 }}
                                className="intro-evolution-item"
                            >
                                <div style={{ position: 'absolute', top: '10px', left: '10px', background: 'var(--color-accent-purple)', padding: '4px 12px', color: '#fff', fontWeight: 'bold', fontSize: '1rem', borderRadius: '4px', zIndex: 10 }}>
                                    DEMAIN
                                </div>
                                <img src="/images/future.png" alt="Future AR" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </motion.div>
                        </div>
                    </motion.div>
                )}

                {/* SCENE 2: LE CRASH */}
                {step === 1 && (
                    <motion.div key="crash" variants={wrapVariant} initial="initial" animate="animate" exit="exit" style={{ width: '100%', maxWidth: '700px' }}>
                        <motion.h2
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}
                            style={{ fontSize: 'clamp(1.5rem, 5vw, 2.2rem)', fontWeight: 600, color: 'var(--color-accent-red)', marginBottom: '3rem' }}
                        >
                            Mais que se passe-t-il quand on précipite tout ?
                        </motion.h2>

                        {/* Fake Application Window */}
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0, y: 50 }} animate={{ scale: 1, opacity: 1, y: 0 }} transition={{ delay: 1, type: "spring", stiffness: 100 }}
                            style={{
                                background: '#1a1a24', borderRadius: '12px', border: '1px solid #333', overflow: 'hidden',
                                boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
                                position: 'relative'
                            }}
                        >
                            {/* Interface Header */}
                            <div style={{ display: 'flex', alignItems: 'center', padding: '12px 20px', background: '#252530', borderBottom: '1px solid #333' }}>
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f56' }} />
                                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e' }} />
                                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27c93f' }} />
                                </div>
                                <div style={{ margin: '0 auto', fontSize: '0.85rem', color: '#888', fontFamily: 'monospace', background: '#1a1a24', padding: '4px 80px', borderRadius: '4px' }}>
                                    app.production.net/checkout
                                </div>
                            </div>

                            {/* Application Content */}
                            <div style={{ height: '350px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', background: '#0a0a0f' }}>

                                {/* 1. Loader Phase */}
                                <motion.div
                                    initial={{ opacity: 1 }} animate={{ opacity: 0 }} transition={{ delay: 2.5, duration: 0.1 }}
                                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem', position: 'absolute' }}
                                >
                                    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}>
                                        <Loader2 size={48} color="var(--color-accent-blue)" />
                                    </motion.div>
                                    <div style={{ color: 'var(--color-text-secondary)', fontFamily: 'monospace', fontSize: '1.1rem' }}>Validation du paiement en cours...</div>
                                </motion.div>

                                {/* 2. Critical Error Phase */}
                                <motion.div
                                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.6, duration: 0 }}
                                    style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'rgba(239, 68, 68, 0.05)' }}
                                >
                                    <motion.div
                                        animate={{ x: [-10, 10, -10, 10, -5, 5, 0] }} transition={{ duration: 0.5 }}
                                        style={{ textAlign: 'center', padding: '2rem', background: 'rgba(20,0,0,0.8)', border: '1px solid var(--color-accent-red)', borderRadius: '8px', maxWidth: '80%' }}
                                    >
                                        <AlertTriangle size={50} color="var(--color-accent-red)" style={{ margin: '0 auto 1rem auto' }} />
                                        <h3 style={{ fontSize: '1.8rem', color: 'var(--color-accent-red)', fontWeight: 'bold', marginBottom: '0.5rem' }}>FATAL ERROR 500</h3>
                                        <p style={{ color: '#ffaaaa', marginTop: '0.5rem', fontFamily: 'monospace', fontSize: '0.9rem', textAlign: 'left', background: 'rgba(0,0,0,0.5)', padding: '1rem', borderRadius: '4px' }}>
                                            Uncaught TypeError: Cannot read properties of undefined (reading 'critical_data')<br />
                                            &nbsp;&nbsp;&nbsp;at checkoutController (main.js:4012:22)<br />
                                            &nbsp;&nbsp;&nbsp;at processPayment (api.js:842:9)
                                        </p>
                                    </motion.div>
                                </motion.div>

                                {/* 3. Intrusive Popups Simulating Frustration */}
                                <motion.div
                                    initial={{ opacity: 0, x: 50, scale: 0.8 }} animate={{ opacity: 1, x: 0, scale: 1 }} transition={{ delay: 3.2, type: "spring" }}
                                    style={{ position: 'absolute', bottom: '20px', right: '20px', background: '#2a1515', border: '1px solid #ff5f56', padding: '1rem 1.5rem', borderRadius: '8px', zIndex: 10, display: 'flex', alignItems: 'center', gap: '15px', boxShadow: '0 10px 25px rgba(255, 95, 86, 0.2)' }}
                                >
                                    <XCircle color="#ff5f56" size={28} />
                                    <div style={{ textAlign: 'left' }}>
                                        <div style={{ fontWeight: 'bold', color: '#fff', fontSize: '1rem', marginBottom: '4px' }}>Transaction annulée</div>
                                        <div style={{ color: '#ffaaaa', fontSize: '0.85rem' }}>Veuillez recharger la page.</div>
                                    </div>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, x: -50, scale: 0.8 }} animate={{ opacity: 1, x: 0, scale: 1 }} transition={{ delay: 3.8, type: "spring" }}
                                    style={{ position: 'absolute', top: '30px', left: '20px', background: '#252530', border: '1px solid #555', padding: '1rem 1.5rem', borderRadius: '8px', zIndex: 10, display: 'flex', alignItems: 'center', gap: '15px', boxShadow: '0 10px 25px rgba(0, 0, 0, 0.5)' }}
                                >
                                    <Code color="#aaa" size={24} />
                                    <div style={{ textAlign: 'left' }}>
                                        <div style={{ fontWeight: 'bold', color: '#fff', fontSize: '0.9rem', marginBottom: '2px' }}>Alerte Monitoring</div>
                                        <div style={{ color: '#aaa', fontSize: '0.8rem' }}>Pic d'erreurs détecté en production</div>
                                    </div>
                                </motion.div>

                            </div>
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 4.5 }}
                            style={{ fontSize: '1.4rem', marginTop: '3rem', color: 'var(--color-text-secondary)', fontWeight: 400 }}
                        >
                            L'insatisfaction utilisateur est <span style={{ color: 'var(--color-text-primary)', fontWeight: 600 }}>immédiate</span>.
                        </motion.p>

                    </motion.div>
                )}

                {/* SCENE 3: LA SOLUTION */}
                {step === 2 && (
                    <motion.div
                        key="resolution"
                        initial={{ opacity: 0, scale: 0.90, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0, transition: { duration: 1.2, ease: "easeOut" } }}
                        exit="exit"
                    >
                        <h2 style={{ fontSize: 'clamp(1.8rem, 5vw, 2.5rem)', fontWeight: 400, lineHeight: 1.4, color: 'var(--color-text-secondary)' }}>
                            La Qualité Logicielle n'est pas une option.
                            <br />
                            <motion.span
                                initial={{ filter: 'brightness(0.5)' }}
                                animate={{ filter: 'brightness(1.2)' }}
                                transition={{ delay: 1, duration: 1.5 }}
                                className="text-gradient"
                                style={{ fontWeight: 800, fontSize: 'clamp(2.5rem, 8vw, 4rem)', display: 'block', marginTop: '1.5rem', lineHeight: 1.1 }}
                            >
                                C'est un investissement<br />vital.
                            </motion.span>
                        </h2>
                    </motion.div>
                )}

            </AnimatePresence>

            <button
                onClick={onComplete}
                style={{
                    position: 'absolute',
                    bottom: '2rem',
                    right: '2rem',
                    color: 'var(--color-text-secondary)',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    padding: '8px 16px',
                    borderRadius: '20px',
                    fontSize: '0.875rem',
                    cursor: 'pointer',
                    opacity: 0.7,
                    transition: 'all 0.2s',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                }}
                onMouseEnter={(e) => { e.target.style.opacity = 1; e.target.style.background = 'rgba(255,255,255,0.1)'; }}
                onMouseLeave={(e) => { e.target.style.opacity = 0.7; e.target.style.background = 'rgba(255,255,255,0.05)'; }}
            >
                Passer l'introduction &rarr;
            </button>
        </motion.div>
    );
};

export default IntroSequence;
