import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import { Link, graphql } from "gatsby";
import Layout from "../components/Layout";

interface ProjectProps extends PageProps {
  data: {
    markdownRemark: {
      html: string;
      frontmatter: {
        title: string;
        date: string;
        description?: string;
        technologies?: string[];
        status?: string;
        link?: string;
        github?: string;
      };
    };
  };
}

const ProjectTemplate: React.FC<ProjectProps> = ({ data }) => {
  const project = data.markdownRemark;

  return (
    <Layout>
      <article className="project-detail">
        <header className="project-header">
          <div className="project-title-section">
            <h1>{project.frontmatter.title}</h1>
            {project.frontmatter.status && (
              <span className={`status status-${project.frontmatter.status.toLowerCase()}`}>
                {project.frontmatter.status}
              </span>
            )}
          </div>
          
          {project.frontmatter.description && (
            <p className="project-description">{project.frontmatter.description}</p>
          )}
          
          <div className="project-meta">
            <time>Créé le {project.frontmatter.date}</time>
            
            {project.frontmatter.technologies && (
              <div className="technologies">
                <strong>Technologies:</strong>
                {project.frontmatter.technologies.map((tech) => (
                  <span key={tech} className="tech-tag">
                    {tech}
                  </span>
                ))}
              </div>
            )}
          </div>
          
          <div className="project-actions">
            {project.frontmatter.link && (
              <a 
                href={project.frontmatter.link} 
                target="_blank" 
                rel="noopener noreferrer"
                role="button"
              >
                Voir le projet ↗
              </a>
            )}
            {project.frontmatter.github && (
              <a 
                href={project.frontmatter.github} 
                target="_blank" 
                rel="noopener noreferrer"
                role="button"
                className="secondary"
              >
                GitHub ↗
              </a>
            )}
          </div>
        </header>
        
        <div 
          className="project-content"
          dangerouslySetInnerHTML={{ __html: project.html }}
        />
        
        <footer className="project-footer">
          <Link to="/projects">← Retour aux projets</Link>
        </footer>
      </article>
    </Layout>
  );
};

export default ProjectTemplate;

export const Head: HeadFC<ProjectProps["data"]> = ({ data }) => (
  <>
    <title>{data.markdownRemark.frontmatter.title} - Projets - Adrian Pothuaud</title>
    <meta 
      name="description" 
      content={data.markdownRemark.frontmatter.description || `Projet ${data.markdownRemark.frontmatter.title} par Adrian Pothuaud`} 
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
        technologies
        status
        link
        github
      }
    }
  }
`;