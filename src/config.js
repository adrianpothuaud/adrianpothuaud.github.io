// src/config.js

export const APP_CONFIG = {
    // Toggle this flag to show/hide the "Open to work" badge
    OPEN_TO_WORK: false,

    // SEO Variables
    SITE_URL: "https://adrianpothuaud.github.io",
    META_DESCRIPTION: "Adrian Pothuaud - Senior QA Engineer (10 ans d'expérience) & Formateur Expert en Automatisation de Tests (Cypress, Playwright, WebdriverIO, Appium). Articles Medium sur l'IA appliquée aux tests.",

    // You can add more global configs here if needed
    AUTHOR_NAME: "Adrian Pothuaud",
    AUTHOR_ROLE: "Senior QA Engineer & Formateur (10 ans XP)",

    // EmailJS configuration (values provided via VITE_ environment variables)
    EMAILJS_SERVICE_ID: import.meta.env.VITE_EMAILJS_SERVICE_ID,
    EMAILJS_TEMPLATE_ID: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
    EMAILJS_PUBLIC_KEY: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,

    // Google Analytics
    GA_MEASUREMENT_ID: import.meta.env.VITE_GA_MEASUREMENT_ID,

    // Google AdSense
    ADSENSE_PUB_ID: import.meta.env.VITE_ADSENSE_PUB_ID,

    // Google Search Console
    GOOGLE_SITE_VERIFICATION: import.meta.env.VITE_GOOGLE_SITE_VERIFICATION,
};

if (import.meta.env.DEV) {
    const missing = [
        'VITE_EMAILJS_SERVICE_ID', 'VITE_EMAILJS_TEMPLATE_ID', 'VITE_EMAILJS_PUBLIC_KEY',
        'VITE_GA_MEASUREMENT_ID', 'VITE_ADSENSE_PUB_ID', 'VITE_GOOGLE_SITE_VERIFICATION',
    ].filter((key) => !import.meta.env[key]);
    if (missing.length > 0) {
        console.warn(`[Config] Variables d'environnement manquantes : ${missing.join(', ')}. Copiez .env.example en .env et renseignez vos valeurs.`);
    }
}
