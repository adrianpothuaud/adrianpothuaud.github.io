import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import { Link, graphql } from "gatsby";
import Layout from "../components/Layout";

import "./index.scss";

interface IndexPageProps extends PageProps {
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
        };
        excerpt: string;
      }>;
    };
    site: {
      siteMetadata: {
        title: string;
        description: string;
      };
    };
  };
}

const IndexPage: React.FC<IndexPageProps> = ({ data }) => {
  const recentPosts = data.allMarkdownRemark.nodes.slice(0, 3);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="hero">
        <div className="grid">
          <div>
            <h1>Bonjour, je suis Adrian Pothuaud</h1>
            <p className="lead">
              QA Full-Stack et passionné par les technologies web et mobiles modernes, 
              l'automatisation des tests, et la création d'expériences utilisateur exceptionnelles.
            </p>
            <p>
              Spécialisé en <strong>Node.js</strong>, <strong>TypeScript</strong> 
              et <strong>WebDriver.io</strong>. J'aide les équipes à créer des applications robustes 
              et bien testées.
            </p>
            <div className="button-group">
              <Link to="/projects" role="button">
                Voir mes projets
              </Link>
              <Link to="/blog" role="button" className="secondary">
                Lire le blog
              </Link>
            </div>
          </div>
          <div>
            <div className="profile-card">
              <h3>Compétences</h3>
              <ul>
                <li>🚀 Développement Full-Stack (React, Node.js)</li>
                <li>🔧 TypeScript & JavaScript moderne</li>
                <li>🧪 Tests automatisés (WebDriver.io, Jest)</li>
                <li>☁️ Déploiement & DevOps</li>
                <li>📱 Applications web progressives</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Blog Posts */}
      {recentPosts.length > 0 && (
        <section>
          <h2>Articles récents</h2>
          <div className="grid">
            {recentPosts.map((post) => (
              <article key={post.id} className="blog-card">
                <h3>
                  <Link to={`/blog${post.fields.slug}`}>
                    {post.frontmatter.title}
                  </Link>
                </h3>
                <small>{post.frontmatter.date}</small>
                <p>{post.frontmatter.description || post.excerpt}</p>
                <Link to={`/blog${post.fields.slug}`}>
                  Lire la suite →
                </Link>
              </article>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: "2rem" }}>
            <Link to="/blog" role="button" className="outline">
              Voir tous les articles
            </Link>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="cta-section">
        <div style={{ textAlign: "center" }}>
          <h2>Travaillons ensemble</h2>
          <p>
            Vous avez un projet en tête ? Je serais ravi d'en discuter avec vous.
          </p>
          <a href="mailto:adrian@example.com" role="button">
            Me contacter
          </a>
        </div>
      </section>
    </Layout>
  );
};

export default IndexPage;

export const Head: HeadFC = ({ data }: any) => (
  <>
    <title>{data.site.siteMetadata.title}</title>
    <meta name="description" content={data.site.siteMetadata.description} />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </>
);

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
        description
      }
    }
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/content/blog/" } }
      sort: { frontmatter: { date: DESC } }
      limit: 3
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
        }
        excerpt(pruneLength: 150)
      }
    }
  }
`;
