import { Helmet } from 'react-helmet-async';
import { APP_CONFIG } from '../config';

// eslint-disable-next-line react/prop-types
const SEO = ({ title, description, url = '', isBlogPost = false, author = 'Adrian Pothuaud', image = '/screenshot.png', date, tags }) => {
    const siteUrl = APP_CONFIG.SITE_URL || 'https://adrianpothuaud.github.io';
    const fullUrl = `${siteUrl}${url}`;
    const fullTitle = title ? `${title} | Adrian Pothuaud` : 'Adrian Pothuaud | Qualité Logicielle & Automatisation';
    const metaDescription = description || APP_CONFIG.META_DESCRIPTION;
    const fullImage = `${siteUrl}${image}`;

    // JSON-LD (Schema.org) pour les modèles d'IA et Google Knowledge Graph
    const baseSchema = {
        "@context": "https://schema.org",
        "@type": isBlogPost ? "BlogPosting" : "Person",
        "name": "Adrian Pothuaud",
        "url": fullUrl,
        "image": fullImage,
    };

    if (isBlogPost) {
        baseSchema.headline = title;
        baseSchema.description = metaDescription;
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
        if (date) {
            baseSchema.datePublished = date;
            baseSchema.dateModified = date;
        }
        if (tags && tags.length > 0) {
            baseSchema.keywords = tags.join(', ');
        }
    } else {
        baseSchema.jobTitle = "Consultant & Formateur Automatisation de Tests";
        baseSchema.description = "Expertise en Selenium, Cypress, Playwright, WebdriverIO.";
        baseSchema.sameAs = [
            "https://www.linkedin.com/in/adrianpothuaud/",
            "https://medium.com/@adrianpothuaud",
            "https://github.com/adrianpothuaud"
        ];
    }

    return (
        <Helmet>
            {/* Standard metadata tags */}
            <title>{fullTitle}</title>
            <meta name="description" content={metaDescription} />
            <link rel="canonical" href={fullUrl} />
            {tags && tags.length > 0 && (
                <meta name="keywords" content={tags.join(', ')} />
            )}

            {/* OpenGraph tags (Pour LinkedIn, Facebook, Discord, etc.) */}
            <meta property="og:locale" content="fr_FR" />
            <meta property="og:site_name" content="Adrian Pothuaud" />
            <meta property="og:url" content={fullUrl} />
            <meta property="og:type" content={isBlogPost ? 'article' : 'website'} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={metaDescription} />
            <meta property="og:image" content={fullImage} />
            <meta property="og:image:alt" content={title || 'Adrian Pothuaud | Qualité Logicielle & Automatisation'} />
            {isBlogPost && date && (
                <meta property="article:published_time" content={date} />
            )}
            {isBlogPost && tags && tags.map(tag => (
                <meta key={tag} property="article:tag" content={tag} />
            ))}

            {/* Twitter Card tags */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={metaDescription} />
            <meta name="twitter:image" content={fullImage} />
            <meta name="twitter:image:alt" content={title || 'Adrian Pothuaud | Qualité Logicielle & Automatisation'} />

            {/* Structured data JSON-LD (Pour le SEO IA et Google) */}
            <script type="application/ld+json">
                {JSON.stringify(baseSchema)}
            </script>
        </Helmet>
    );
};

export default SEO;
