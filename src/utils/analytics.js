// Utilitaire Google Analytics pour le suivi SPA (Single Page Application)

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

/**
 * Envoie un événement page_view à Google Analytics lors d'un changement de route.
 */
export function trackPageView(path, title) {
    if (!GA_MEASUREMENT_ID || typeof window.gtag !== 'function') return;

    window.gtag('config', GA_MEASUREMENT_ID, {
        page_path: path,
        page_title: title,
    });
}

/**
 * Envoie un événement personnalisé à Google Analytics.
 */
export function trackEvent(eventName, params = {}) {
    if (!GA_MEASUREMENT_ID || typeof window.gtag !== 'function') return;

    window.gtag('event', eventName, params);
}
