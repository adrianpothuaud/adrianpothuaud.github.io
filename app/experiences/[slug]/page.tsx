import getArticlesMetadata from "@/getArticlesMetadata";
import getArticleContent from "@/getArticleContent";
import ReactMarkdown from "react-markdown";
import { notFound } from "next/navigation";

export const generateStaticParams = async () => {
	const articles = getArticlesMetadata();
	return articles.map(article => ({ 
        year: article.year,
        month: article.month,
        slug: article.slug 
    }));
};

interface Params {
    year: string;
    month: string;
    slug: string;
}

interface Props {
    params: Params;
}

const ArticlePage = async ({ params }: Props) => {
    const { year, month, slug } = params;
    
    // Validate that all required params are present
    if (!year || !month || !slug) {
        notFound();
    }
    
    try {
        // Get the article content
        const matterResult = getArticleContent(year, month, slug);
        const { data: frontmatter, content } = matterResult;
        
        return (
            <article>
                <header>
                    <h1>{frontmatter.title || 'Untitled'}</h1>
                    {frontmatter.bio && (
                        <p>{frontmatter.bio}</p>
                    )}
                    {frontmatter.date && (
                        <time>
                            {new Date(frontmatter.date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </time>
                    )}
                    {frontmatter.tags && Array.isArray(frontmatter.tags) && (
                        <div>
                            {frontmatter.tags.map((tag: string, index: number) => (
                                <span 
                                    key={index}
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}
                </header>
                <div>
                    <ReactMarkdown>{content}</ReactMarkdown>
                </div>
            </article>
        );
    } catch (error) {
        console.error('Error loading article:', error);
        notFound();
    }
};

export default ArticlePage;