import { motion } from 'framer-motion';
import { Terminal, ShieldCheck, Zap, Code2, Smartphone } from 'lucide-react';
import StorySlider from './StorySlider';
import OpenToWorkBadge from './OpenToWorkBadge';
import { APP_CONFIG } from '../config';

const Hero = () => {
    return (
        <section
            style={{
                minHeight: '92vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 'var(--space-2xl) 0',
                paddingTop: '110px'
            }}
        >
            <div className="hero-grid">
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7 }}
                    style={{ textAlign: 'left' }}
                >
                    <div style={{ marginBottom: 'var(--space-lg)' }}>
                        {APP_CONFIG.OPEN_TO_WORK ? (
                            <OpenToWorkBadge />
                        ) : (
                            <span className="section-label">
                                Senior QA Engineer &amp; Formateur · 10 ans XP
                            </span>
                        )}
                    </div>

                    <h1 style={{ fontSize: 'clamp(2.2rem, 5.5vw, 3.5rem)', marginBottom: 'var(--space-lg)', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
                        Crashes, bugs, régressions :<br />
                        <span className="text-gradient">Stoppez l&apos;hémorragie.</span>
                    </h1>

                    <p style={{ fontSize: '1.05rem', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xl)', lineHeight: 1.7, maxWidth: '520px' }}>
                        <strong>10 ans d&apos;expérience</strong> en QA Lead dans des startups et scale-ups (Paymium, happn, October, Trusk…).<br /><br />
                        J&apos;interviens en entreprise pour former vos équipes sur <strong>Playwright, Cypress, WebdriverIO</strong> et construire une stratégie de test solide — avec les apports de l&apos;IA.
                    </p>

                    <div className="hero-cta-group">
                        <a href="/#services" className="btn-primary">
                            Découvrir les formations
                        </a>
                        <a href="/#contact" className="btn-secondary">
                            Discuter d&apos;un projet
                        </a>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7, delay: 0.15 }}
                >
                    <StorySlider />
                </motion.div>
            </div>

            {/* Tech Stack Banner */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="hero-tech-stack"
            >
                {[
                    { icon: Terminal, name: 'Cypress' },
                    { icon: ShieldCheck, name: 'Playwright' },
                    { icon: Code2, name: 'Selenium' },
                    { icon: Zap, name: 'WebdriverIO' },
                    { icon: Smartphone, name: 'Appium' }
                ].map((tech, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
                        <tech.icon size={18} />
                        <span style={{ fontWeight: 500 }}>{tech.name}</span>
                    </div>
                ))}
            </motion.div>
        </section>
    );
};

export default Hero;
