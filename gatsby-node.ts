import type { GatsbyNode } from "gatsby";
import path from "path";

export const createSchemaCustomization: GatsbyNode["createSchemaCustomization"] = ({ actions }) => {
  const { createTypes } = actions;

  createTypes(`
    type MarkdownRemarkFrontmatter {
      title: String
      date: Date @dateformat
      description: String
      tags: [String]
      technologies: [String]
      status: String
      link: String
      github: String
    }
  `);
};

export const createPages: GatsbyNode["createPages"] = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  // Templates
  const blogPostTemplate = path.resolve(`./src/templates/blog-post.tsx`);
  const projectTemplate = path.resolve(`./src/templates/project.tsx`);

  // Blog posts
  const blogResult = await graphql(`
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
          }
        }
      }
    }
  `);

  if (blogResult.errors) {
    reporter.panicOnBuild(`There was an error loading your blog posts`, blogResult.errors);
    return;
  }

  const posts = (blogResult.data as any)?.allMarkdownRemark.nodes;

  if (posts && posts.length > 0) {
    posts.forEach((post: any) => {
      createPage({
        path: `/blog${post.fields.slug}`,
        component: blogPostTemplate,
        context: {
          id: post.id,
        },
      });
    });
  }

  // Projects
  const projectsResult = await graphql(`
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
          }
        }
      }
    }
  `);

  if (projectsResult.errors) {
    reporter.panicOnBuild(`There was an error loading your projects`, projectsResult.errors);
    return;
  }

  const projects = (projectsResult.data as any)?.allMarkdownRemark.nodes;

  if (projects && projects.length > 0) {
    projects.forEach((project: any) => {
      createPage({
        path: `/projects${project.fields.slug}`,
        component: projectTemplate,
        context: {
          id: project.id,
        },
      });
    });
  }
};

export const onCreateNode: GatsbyNode["onCreateNode"] = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    const parent = node.parent ? getNode(node.parent) : null;
    if (parent && 'name' in parent) {
      const slug = `/${parent.name}/`;
      createNodeField({
        node,
        name: `slug`,
        value: slug,
      });
    }
  }
};