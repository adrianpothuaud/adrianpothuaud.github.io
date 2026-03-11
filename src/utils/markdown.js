import fm from 'front-matter';

/**
 * Parses a raw markdown string with front-matter
 * @param {string} rawContent 
 * @returns {object} { attributes: object, body: string }
 */
export const parseMarkdown = (rawContent) => {
    try {
        const parsed = fm(rawContent);
        return {
            attributes: parsed.attributes || {},
            body: parsed.body || '',
        };
    } catch (error) {
        console.error("Failed to parse markdown:", error);
        return { attributes: {}, body: rawContent };
    }
};

/**
 * Loads all markdown files from a Vite import.meta.glob result
 * @param {Record<string, () => Promise<string>>} globResult 
 * @returns {Promise<Array>}
 */
export const loadMarkdownContent = async (globResult) => {
    const allPosts = [];

    for (const path in globResult) {
        const rawContent = await globResult[path]();

        // Extract a slug from the path (e.g., '/src/content/blog/my-post.md' -> 'my-post')
        const pathParts = path.split('/');
        const filename = pathParts[pathParts.length - 1];
        const slug = filename.replace('.md', '');

        const { attributes, body } = parseMarkdown(rawContent);

        allPosts.push({
            slug,
            ...attributes,
            content: body
        });
    }

    // Sort by date if available, or just return them
    return allPosts.sort((a, b) => {
        if (a.date && b.date) {
            return new Date(b.date) - new Date(a.date);
        }
        return 0;
    });
};
