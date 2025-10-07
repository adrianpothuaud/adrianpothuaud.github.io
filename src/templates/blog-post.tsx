import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import { Link, graphql } from "gatsby";
import Layout from "../components/Layout";

interface BlogPostProps extends PageProps {
  data: {
    markdownRemark: {
      html: string;
      frontmatter: {
        title: string;
        date: string;
        description?: string;
        tags?: string[];
      };
      timeToRead: number;
    };
  };
}

const BlogPostTemplate: React.FC<BlogPostProps> = ({ data }) => {
  const post = data.markdownRemark;

  return (
    <Layout>
      <article className="blog-post">
        <header className="post-header">
          <h1>{post.frontmatter.title}</h1>
          <div className="post-meta">
            <time>{post.frontmatter.date}</time>
            <span>•</span>
            <span>{post.timeToRead} min de lecture</span>
          </div>
          {post.frontmatter.tags && (
            <div className="post-tags">
              {post.frontmatter.tags.map((tag) => (
                <span key={tag} className="tag">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>
        
        <div 
          className="post-content"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
        
        <footer className="post-footer">
          <Link to="/blog">← Retour au blog</Link>
        </footer>
      </article>
    </Layout>
  );
};

export default BlogPostTemplate;

export const Head: HeadFC<BlogPostProps["data"]> = ({ data }) => (
  <>
    <title>{data.markdownRemark.frontmatter.title} - Adrian Pothuaud</title>
    <meta 
      name="description" 
      content={data.markdownRemark.frontmatter.description || `Article de blog sur ${data.markdownRemark.frontmatter.title}`} 
    />
  </>
);

export const query = graphql`
  query($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        date(formatString: "DD MMMM YYYY", locale: "fr")
        description
        tags
      }
      timeToRead
    }
  }
`;