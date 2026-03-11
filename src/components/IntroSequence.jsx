import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// eslint-disable-next-line react/prop-types
const IntroSequence = ({ onComplete }) => {
    const [step, setStep] = useState(0);

    useEffect(() => {
        // Sequence timing logic
        // Step 0: "Notre monde..." (0s to 3s)
        // Step 1: "Mais sans contrôle..." (3s to 6s)
        // Step 2: "Les utilisateurs sont déçus..." (6s to 9s)
        // Step 3: "La qualité n'est pas une option..." (9s to 12s)
        // Step 4: Finish (Transitions out)
        const timers = [
            setTimeout(() => setStep(1), 3500),
            setTimeout(() => setStep(2), 6500),
            setTimeout(() => setStep(3), 9500),
            setTimeout(() => setStep(4), 13000),
            setTimeout(onComplete, 14000) // Call onComplete after transition
        ];

        return () => timers.forEach(clearTimeout);
    }, [onComplete]);

    // Framer motion variants
    const fadeUp = {
        initial: { opacity: 0, y: 30 },
        animate: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
        exit: { opacity: 0, y: -20, transition: { duration: 0.5 } }
    };

    const glitchParams = {
        initial: { opacity: 0, x: 0 },
        animate: {
            opacity: 1,
            x: [0, -5, 5, -2, 2, 0],
            transition: {
                x: { repeat: Infinity, repeatType: "mirror", duration: 0.2, repeatDelay: 2 },
                opacity: { duration: 0.5 }
            }
        },
        exit: { opacity: 0, scale: 0.9, transition: { duration: 0.3 } }
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
                textAlign: 'center'
            }}
        >
            <AnimatePresence mode="wait">

                {step === 0 && (
                    <motion.h2
                        key="step0"
                        variants={fadeUp}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        style={{ fontSize: '2rem', fontWeight: 300, color: 'var(--color-text-primary)' }}
                    >
                        Hier, aujourd'hui, demain...<br />
                        notre monde tourne grâce aux <span className="text-gradient" style={{ fontWeight: 600 }}>applications</span>.
                    </motion.h2>
                )}

                {step === 1 && (
                    <motion.h2
                        key="step1"
                        variants={glitchParams}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--color-accent-red)' }}
                    >
                        Mais sans procédures de contrôle...
                    </motion.h2>
                )}

                {step === 2 && (
                    <motion.div
                        key="step2"
                        variants={fadeUp}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                    >
                        <h2 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1rem', color: 'var(--color-text-secondary)' }}>
                            Bugs. Régressions. Crashes.
                        </h2>
                        <p style={{ fontSize: '1.5rem', color: 'var(--color-accent-red)' }}>
                            Les utilisateurs sont déçus.
                        </p>
                    </motion.div>
                )}

                {step === 3 && (
                    <motion.div
                        key="step3"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1, transition: { duration: 1.5, ease: "easeOut" } }}
                        exit="exit"
                    >
                        <h2 style={{ fontSize: '2.5rem', fontWeight: 500, lineHeight: 1.4 }}>
                            La Qualité Logicielle n'est pas une option.<br />
                            <span className="text-gradient" style={{ fontWeight: 800, fontSize: '3.5rem', display: 'block', marginTop: '1rem' }}>
                                C'est un investissement vital.
                            </span>
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
                    background: 'none',
                    border: 'none',
                    fontSize: '0.875rem',
                    cursor: 'pointer',
                    opacity: 0.6,
                    transition: 'opacity 0.2s',
                }}
                onMouseEnter={(e) => e.target.style.opacity = 1}
                onMouseLeave={(e) => e.target.style.opacity = 0.6}
            >
                Passer l'introduction &rarr;
            </button>
        </motion.div>
    );
};

export default IntroSequence;
