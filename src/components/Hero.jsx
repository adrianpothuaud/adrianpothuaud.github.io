import { motion } from 'framer-motion';
import { Terminal, ShieldCheck, Zap, Code2, Smartphone } from 'lucide-react';
import StorySlider from './StorySlider';
import OpenToWorkBadge from './OpenToWorkBadge';
import { APP_CONFIG } from '../config';

const Hero = () => {
    return (
        <section
            style={{
                minHeight: '90vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 'var(--space-2xl) 0',
                paddingTop: '100px'
            }}
        >
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '4rem', alignItems: 'center', width: '100%' }}>
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    style={{ textAlign: 'left' }}
                >
                    <div style={{ marginBottom: 'var(--space-md)' }}>
                        {APP_CONFIG.OPEN_TO_WORK ? (
                            <OpenToWorkBadge />
                        ) : (
                            <div style={{ display: 'inline-block', padding: '0.5rem 1rem', background: 'var(--color-bg-surface)', borderRadius: 'var(--radius-full)', border: '1px solid rgba(0,0,0,0.1)' }}>
                                <span style={{ color: 'var(--color-accent-blue)', fontWeight: 600, fontSize: '0.9rem' }}>
                                    Senior QA Engineer & Formateur · 10 ans XP
                                </span>
                            </div>
                        )}
                    </div>

                    <h1 style={{ fontSize: 'clamp(2.2rem, 6vw, 3.5rem)', marginBottom: 'var(--space-md)', lineHeight: 1.1 }}>
                        Crashes, bugs, régressions : <br />
                        <span className="text-gradient">Stoppez l'hémorragie.</span>
                    </h1>

                    <p style={{ fontSize: '1.15rem', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xl)', lineHeight: 1.6 }}>
                        <b>10 ans d'expérience</b> en tant que QA Lead dans des startups et scale-ups (Paymium, happn, October, Trusk…).<br /><br />
                        J'interviens en entreprise pour former vos équipes sur <b>Playwright, Cypress, WebdriverIO</b> et vous aider à construire une stratégie de test solide — en intégrant les apports de l'IA pour des tests encore plus stables.
                    </p>

                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <a href="/#services" style={{
                            background: 'var(--color-accent-blue)',
                            color: '#fff',
                            padding: '0.75rem 1.5rem',
                            borderRadius: 'var(--radius-sm)',
                            fontWeight: 600,
                            display: 'inline-block'
                        }}>
                            Découvrir les Formations
                        </a>

                        <a href="/#contact" style={{
                            background: 'transparent',
                            color: 'var(--color-text-primary)',
                            border: '1px solid var(--color-text-secondary)',
                            padding: '0.75rem 1.5rem',
                            borderRadius: 'var(--radius-sm)',
                            fontWeight: 500,
                            display: 'inline-block'
                        }}>
                            Discuter d'un projet
                        </a>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <StorySlider />
                </motion.div>
            </div>

            {/* Tech Stack Banner */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 1 }}
                style={{ marginTop: 'var(--space-2xl)', display: 'flex', gap: '3rem', flexWrap: 'wrap', justifyContent: 'center', opacity: 0.7, width: '100%' }}
            >
                {[
                    { icon: Terminal, name: 'Cypress' },
                    { icon: ShieldCheck, name: 'Playwright' },
                    { icon: Code2, name: 'Selenium' },
                    { icon: Zap, name: 'WebdriverIO' },
                    { icon: Smartphone, name: 'Appium' }
                ].map((tech, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-secondary)' }}>
                        <tech.icon size={24} />
                        <span style={{ fontWeight: 500 }}>{tech.name}</span>
                    </div>
                ))}
            </motion.div>
        </section>
    );
};

export default Hero;
