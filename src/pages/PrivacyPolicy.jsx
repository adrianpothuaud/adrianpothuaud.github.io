import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { APP_CONFIG } from '../config';

const PrivacyPolicy = () => {
    const lastUpdated = '12 mars 2026';

    return (
        <div className="container" style={{ paddingTop: '110px', paddingBottom: 'var(--space-2xl)', minHeight: '80vh' }}>
            <SEO
                title="Politique de Confidentialité"
                description="Politique de confidentialité du site adrianpothuaud.github.io : collecte de données, cookies, publicités Google AdSense et droits des utilisateurs."
                url="/privacy"
            />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ maxWidth: '760px', margin: '0 auto' }}
            >
                <span className="section-label">Légal</span>
                <h1 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>
                    Politique de <span className="text-gradient">Confidentialité</span>
                </h1>
                <p style={{ color: 'var(--color-text-muted)', marginBottom: 'var(--space-xl)', fontSize: '0.9rem' }}>
                    Dernière mise à jour : {lastUpdated}
                </p>

                <div className="glass-panel" style={{ padding: 'var(--space-xl)', lineHeight: 1.75, color: 'var(--color-text-secondary)' }}>

                    {/* Introduction */}
                    <section style={{ marginBottom: 'var(--space-lg)' }}>
                        <h2 style={{ color: 'var(--color-text-primary)', fontSize: '1.2rem', marginBottom: '0.75rem' }}>1. Introduction</h2>
                        <p>
                            Bienvenue sur le site d&apos;<strong style={{ color: 'var(--color-text-primary)' }}>{APP_CONFIG.AUTHOR_NAME}</strong> ({APP_CONFIG.SITE_URL}).
                            La présente Politique de Confidentialité décrit comment vos données personnelles sont collectées,
                            utilisées et protégées lorsque vous visitez ce site.
                        </p>
                        <p style={{ marginTop: '0.75rem' }}>
                            En utilisant ce site, vous acceptez les pratiques décrites dans cette politique.
                        </p>
                    </section>

                    {/* Données collectées */}
                    <section style={{ marginBottom: 'var(--space-lg)' }}>
                        <h2 style={{ color: 'var(--color-text-primary)', fontSize: '1.2rem', marginBottom: '0.75rem' }}>2. Données collectées</h2>

                        <h3 style={{ color: 'var(--color-text-primary)', fontSize: '1rem', margin: '0.75rem 0 0.5rem' }}>Formulaire de contact</h3>
                        <p>
                            Lorsque vous utilisez le formulaire de contact, les données suivantes sont collectées :
                        </p>
                        <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
                            <li>Nom complet</li>
                            <li>Adresse e-mail</li>
                            <li>Contenu du message</li>
                        </ul>
                        <p style={{ marginTop: '0.75rem' }}>
                            Ces informations sont utilisées uniquement pour répondre à votre demande et ne sont pas
                            stockées sur ce site. Elles sont transmises via le service tiers EmailJS.
                        </p>

                        <h3 style={{ color: 'var(--color-text-primary)', fontSize: '1rem', margin: '1rem 0 0.5rem' }}>Données de navigation</h3>
                        <p>
                            Comme la plupart des sites web, ce site peut collecter automatiquement certaines informations
                            techniques via les cookies et technologies similaires, notamment :
                        </p>
                        <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
                            <li>Adresse IP</li>
                            <li>Type de navigateur et version</li>
                            <li>Pages visitées et durée de visite</li>
                            <li>Source du trafic (référent)</li>
                        </ul>
                    </section>

                    {/* Cookies */}
                    <section style={{ marginBottom: 'var(--space-lg)' }}>
                        <h2 style={{ color: 'var(--color-text-primary)', fontSize: '1.2rem', marginBottom: '0.75rem' }}>3. Cookies</h2>
                        <p>
                            Ce site utilise des cookies afin d&apos;améliorer votre expérience de navigation et de diffuser
                            des publicités pertinentes. Un cookie est un petit fichier texte stocké sur votre appareil.
                        </p>

                        <h3 style={{ color: 'var(--color-text-primary)', fontSize: '1rem', margin: '1rem 0 0.5rem' }}>Cookies publicitaires (Google AdSense)</h3>
                        <p>
                            Ce site utilise <strong style={{ color: 'var(--color-text-primary)' }}>Google AdSense</strong>, un service de publicité
                            fourni par Google LLC. Google AdSense utilise des cookies pour afficher des annonces
                            personnalisées basées sur vos visites sur ce site et d&apos;autres sites internet.
                        </p>
                        <p style={{ marginTop: '0.75rem' }}>
                            Google utilise le cookie DoubleClick pour diffuser des annonces pertinentes à travers son réseau
                            de partenaires publicitaires. Vous pouvez consulter la{' '}
                            <a
                                href="https://policies.google.com/privacy"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ color: 'var(--color-accent-blue)' }}
                            >
                                Politique de Confidentialité de Google
                            </a>{' '}
                            et désactiver la personnalisation des annonces via les{' '}
                            <a
                                href="https://www.google.com/settings/ads"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ color: 'var(--color-accent-blue)' }}
                            >
                                Paramètres des annonces Google
                            </a>.
                        </p>

                        <h3 style={{ color: 'var(--color-text-primary)', fontSize: '1rem', margin: '1rem 0 0.5rem' }}>Gestion des cookies</h3>
                        <p>
                            Vous pouvez contrôler et/ou supprimer les cookies à tout moment depuis les paramètres de
                            votre navigateur. Désactiver les cookies peut limiter certaines fonctionnalités du site.
                            Pour plus d&apos;informations, consultez{' '}
                            <a
                                href="https://www.aboutcookies.org"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ color: 'var(--color-accent-blue)' }}
                            >
                                aboutcookies.org
                            </a>.
                        </p>
                    </section>

                    {/* Services tiers */}
                    <section style={{ marginBottom: 'var(--space-lg)' }}>
                        <h2 style={{ color: 'var(--color-text-primary)', fontSize: '1.2rem', marginBottom: '0.75rem' }}>4. Services tiers</h2>
                        <p>Ce site fait appel aux services tiers suivants :</p>
                        <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
                            <li>
                                <strong style={{ color: 'var(--color-text-primary)' }}>Google AdSense</strong> — diffusion d&apos;annonces publicitaires.{' '}
                                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-accent-blue)' }}>
                                    Politique de confidentialité
                                </a>
                            </li>
                            <li style={{ marginTop: '0.5rem' }}>
                                <strong style={{ color: 'var(--color-text-primary)' }}>EmailJS</strong> — envoi du formulaire de contact par e-mail.{' '}
                                <a href="https://www.emailjs.com/legal/privacy-policy/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-accent-blue)' }}>
                                    Politique de confidentialité
                                </a>
                            </li>
                            <li style={{ marginTop: '0.5rem' }}>
                                <strong style={{ color: 'var(--color-text-primary)' }}>GitHub Pages</strong> — hébergement du site.{' '}
                                <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-accent-blue)' }}>
                                    Politique de confidentialité
                                </a>
                            </li>
                        </ul>
                        <p style={{ marginTop: '0.75rem' }}>
                            Ces services tiers sont soumis à leurs propres politiques de confidentialité. Ce site ne
                            contrôle pas et n&apos;est pas responsable de leurs pratiques en matière de données.
                        </p>
                    </section>

                    {/* Droits des utilisateurs */}
                    <section style={{ marginBottom: 'var(--space-lg)' }}>
                        <h2 style={{ color: 'var(--color-text-primary)', fontSize: '1.2rem', marginBottom: '0.75rem' }}>5. Vos droits (RGPD)</h2>
                        <p>
                            Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez des
                            droits suivants concernant vos données personnelles :
                        </p>
                        <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
                            <li><strong style={{ color: 'var(--color-text-primary)' }}>Droit d&apos;accès</strong> — obtenir une copie de vos données</li>
                            <li style={{ marginTop: '0.35rem' }}><strong style={{ color: 'var(--color-text-primary)' }}>Droit de rectification</strong> — corriger des données inexactes</li>
                            <li style={{ marginTop: '0.35rem' }}><strong style={{ color: 'var(--color-text-primary)' }}>Droit à l&apos;effacement</strong> — demander la suppression de vos données</li>
                            <li style={{ marginTop: '0.35rem' }}><strong style={{ color: 'var(--color-text-primary)' }}>Droit d&apos;opposition</strong> — vous opposer au traitement de vos données</li>
                        </ul>
                        <p style={{ marginTop: '0.75rem' }}>
                            Pour exercer ces droits, contactez-moi via le{' '}
                            <a href="/#contact" style={{ color: 'var(--color-accent-blue)' }}>formulaire de contact</a>.
                        </p>
                    </section>

                    {/* Modifications */}
                    <section style={{ marginBottom: 'var(--space-lg)' }}>
                        <h2 style={{ color: 'var(--color-text-primary)', fontSize: '1.2rem', marginBottom: '0.75rem' }}>6. Modifications</h2>
                        <p>
                            Cette politique de confidentialité peut être mise à jour à tout moment. La date de dernière
                            mise à jour est indiquée en haut de cette page. Il vous est conseillé de la consulter
                            régulièrement.
                        </p>
                    </section>

                    {/* Contact */}
                    <section>
                        <h2 style={{ color: 'var(--color-text-primary)', fontSize: '1.2rem', marginBottom: '0.75rem' }}>7. Contact</h2>
                        <p>
                            Pour toute question relative à cette politique de confidentialité, vous pouvez me contacter :
                        </p>
                        <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
                            <li>Via le <a href="/#contact" style={{ color: 'var(--color-accent-blue)' }}>formulaire de contact</a></li>
                            <li style={{ marginTop: '0.35rem' }}>
                                Via{' '}
                                <a
                                    href="https://www.linkedin.com/in/adrianpothuaud/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ color: 'var(--color-accent-blue)' }}
                                >
                                    LinkedIn
                                </a>
                            </li>
                        </ul>
                    </section>

                </div>

                <div style={{ marginTop: 'var(--space-lg)', textAlign: 'center' }}>
                    <Link to="/" className="btn-secondary" style={{ display: 'inline-block' }}>
                        ← Retour à l&apos;accueil
                    </Link>
                </div>
            </motion.div>
        </div>
    );
};

export default PrivacyPolicy;
