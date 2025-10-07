import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import { Link, graphql } from "gatsby";
import Layout from "../components/Layout";

interface ProjectsPageProps extends PageProps {
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
          technologies?: string[];
          status?: string;
          link?: string;
          github?: string;
        };
        excerpt: string;
      }>;
    };
  };
}

const ProjectsPage: React.FC<ProjectsPageProps> = ({ data }) => {
  const projects = data.allMarkdownRemark.nodes;

  return (
    <Layout title="Mes Projets">
      <p>
        Voici une sélection de mes projets récents, allant d'applications web 
        aux outils de développement et ressources éducatives.
      </p>

      {projects.length > 0 ? (
        <div className="projects-grid">
          {projects.map((project) => (
            <article key={project.id} className="project-card">
              <div className="project-header">
                <h3>
                  <Link to={`/projects${project.fields.slug}`}>
                    {project.frontmatter.title}
                  </Link>
                </h3>
                {project.frontmatter.status && (
                  <span className={`status status-${project.frontmatter.status.toLowerCase()}`}>
                    {project.frontmatter.status}
                  </span>
                )}
              </div>
              
              <p>{project.frontmatter.description || project.excerpt}</p>
              
              {project.frontmatter.technologies && (
                <div className="technologies">
                  {project.frontmatter.technologies.map((tech) => (
                    <span key={tech} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>
              )}
              
              <div className="project-links">
                <Link to={`/projects${project.fields.slug}`} className="primary-link">
                  En savoir plus
                </Link>
                {project.frontmatter.link && (
                  <a 
                    href={project.frontmatter.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="external-link"
                  >
                    Voir le projet ↗
                  </a>
                )}
                {project.frontmatter.github && (
                  <a 
                    href={project.frontmatter.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="github-link"
                  >
                    GitHub ↗
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div style={{ textAlign: "center", padding: "3rem 0" }}>
          <p>Aucun projet pour le moment. Revenez bientôt !</p>
        </div>
      )}
    </Layout>
  );
};

export default ProjectsPage;

export const Head: HeadFC = () => (
  <>
    <title>Projets - Adrian Pothuaud</title>
    <meta name="description" content="Découvrez mes projets de développement web, applications et outils." />
  </>
);

export const query = graphql`
  query {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/content/projects/" } }
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
          technologies
          status
          link
          github
        }
        excerpt(pruneLength: 150)
      }
    }
  }
`;