import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import { Link, graphql } from "gatsby";
import Layout from "../components/Layout";

interface BlogPageProps extends PageProps {
  data: {
    allMarkdownRemark: {
      nodes: Array<{
        id: string;
        fields: {
          slug: string;
        };
        frontmatter: {
          title: string;
          date: string;
          description?: string;
          tags?: string[];
        };
        excerpt: string;
      }>;
    };
  };
}

const BlogPage: React.FC<BlogPageProps> = ({ data }) => {
  const posts = data.allMarkdownRemark.nodes;

  return (
    <Layout title="Blog">
      <p>
        Découvrez mes réflexions sur le développement web, les bonnes pratiques, 
        et les technologies que j'explore.
      </p>

      {posts.length > 0 ? (
        <div className="blog-list">
          {posts.map((post) => (
            <article key={post.id} className="blog-post-preview">
              <h2>
                <Link to={`/blog${post.fields.slug}`}>
                  {post.frontmatter.title}
                </Link>
              </h2>
              <div className="meta">
                <small>{post.frontmatter.date}</small>
                {post.frontmatter.tags && (
                  <div className="tags">
                    {post.frontmatter.tags.map((tag) => (
                      <span key={tag} className="tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <p>{post.frontmatter.description || post.excerpt}</p>
              <Link to={`/blog${post.fields.slug}`} className="read-more">
                Lire la suite →
              </Link>
            </article>
          ))}
        </div>
      ) : (
        <div style={{ textAlign: "center", padding: "3rem 0" }}>
          <p>Aucun article pour le moment. Revenez bientôt !</p>
        </div>
      )}
    </Layout>
  );
};

export default BlogPage;

export const Head: HeadFC = () => (
  <>
    <title>Blog - Adrian Pothuaud</title>
    <meta name="description" content="Articles sur le développement web, les bonnes pratiques et les technologies modernes." />
  </>
);

export const query = graphql`
  query {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/content/blog/" } }
      sort: { frontmatter: { date: DESC } }
    ) {
      nodes {
        id
        fields {
          slug
        }
        frontmatter {
          title
          date(formatString: "DD MMMM YYYY", locale: "fr")
          description
          tags
        }
        excerpt(pruneLength: 200)
      }
    }
  }
`;