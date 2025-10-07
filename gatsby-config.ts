import type { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {
  siteMetadata: {
    title: `Adrian Pothuaud`,
    description: `Développeur Full-Stack passionné par les technologies web modernes et l'expérience utilisateur`,
    siteUrl: `https://adrianpothuaud.github.io`,
    author: `Adrian Pothuaud`,
    social: {
      twitter: `@adrianpothuaud`,
      linkedin: `adrian-pothuaud`,
      github: `adrianpothuaud`
    }
  },
  plugins: [
    `gatsby-plugin-sass`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 800,
            },
          },
        ],
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        "name": "images",
        "path": "./src/images/"
      },
      __key: "images"
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        "name": "pages",
        "path": "./src/pages/"
      },
      __key: "pages"
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        "name": "blog",
        "path": "./content/blog/"
      },
      __key: "blog"
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        "name": "projects",
        "path": "./content/projects/"
      },
      __key: "projects"
    }
  ]
};

export default config;
