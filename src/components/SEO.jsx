import { Helmet } from 'react-helmet-async';
import { APP_CONFIG } from '../config';

// eslint-disable-next-line react/prop-types
const SEO = ({ title, description, url = '', isBlogPost = false, author = 'Adrian Pothuaud', image = '/screenshot.png' }) => {
    const siteUrl = APP_CONFIG.SITE_URL || 'https://adrianpothuaud.github.io';
    const fullUrl = `${siteUrl}${url}`;

    // JSON-LD (Schema.org) pour les modèles d'IA et Google Knowledge Graph
    const baseSchema = {
        "@context": "https://schema.org",
        "@type": isBlogPost ? "BlogPosting" : "Person",
        "name": "Adrian Pothuaud",
        "url": fullUrl,
        "image": `${siteUrl}${image}`,
    };

    if (isBlogPost) {
        baseSchema.headline = title;
        baseSchema.description = description;
        baseSchema.author = {
            "@type": "Person",
            "name": author
        };
        baseSchema.publisher = {
            "@type": "Organization",
            "name": "Adrian Pothuaud",
            "logo": {
                "@type": "ImageObject",
                "url": `${siteUrl}/vite.svg`
            }
        };
    } else {
        baseSchema.jobTitle = "Consultant & Formateur Automatisation de Tests";
        baseSchema.description = "Expertise en Selenium, Cypress, Playwright, WebdriverIO.";
        baseSchema.sameAs = [
            "https://www.linkedin.com/in/adrian-pothuaud-174888102/"
        ];
    }

    return (
        <Helmet>
            {/* Standard metadata tags */}
            <title>{title ? `${title} | Adrian Pothuaud` : 'Adrian Pothuaud | Qualité Logicielle & Automatisation'}</title>
            <meta name="description" content={description || APP_CONFIG.META_DESCRIPTION} />
            <link rel="canonical" href={fullUrl} />

            {/* OpenGraph tags (Pour LinkedIn, Facebook, Discord, etc.) */}
            <meta property="og:url" content={fullUrl} />
            <meta property="og:type" content={isBlogPost ? 'article' : 'website'} />
            <meta property="og:title" content={title || 'Adrian Pothuaud | Qualité Logicielle'} />
            <meta property="og:description" content={description || APP_CONFIG.META_DESCRIPTION} />
            <meta property="og:image" content={`${siteUrl}${image}`} />

            {/* Twitter Card tags */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title || 'Adrian Pothuaud | Qualité Logicielle'} />
            <meta name="twitter:description" content={description || APP_CONFIG.META_DESCRIPTION} />
            <meta name="twitter:image" content={`${siteUrl}${image}`} />

            {/* Structured data JSON-LD (Pour le SEO IA et Google) */}
            <script type="application/ld+json">
                {JSON.stringify(baseSchema)}
            </script>
        </Helmet>
    );
};

export default SEO;
