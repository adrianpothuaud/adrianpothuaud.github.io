# Copilot Instructions

## Project Overview

This is the personal portfolio website for **Adrian Pothuaud** — a Senior QA Engineer with 10 years of experience and expert trainer in test automation (Cypress, Playwright, WebdriverIO, Appium). The site is deployed to GitHub Pages at [adrianpothuaud.github.io](https://adrianpothuaud.github.io).

## Tech Stack

- **Framework**: React 19 (JSX)
- **Build tool**: Vite with `@vitejs/plugin-react-swc`
- **Routing**: React Router DOM v7
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Blog/content**: Markdown files parsed with `front-matter` and rendered with `react-markdown`
- **SEO**: `react-helmet-async`
- **Linting**: ESLint 9 with `eslint-plugin-react-hooks` and `eslint-plugin-react-refresh`
- **Deployment**: GitHub Actions → GitHub Pages

## Project Structure

```
src/
├── components/       # Reusable UI components (Hero, Header, Blog, Services, etc.)
├── pages/            # Top-level route pages (Home, BlogList, BlogPost)
├── content/          # Markdown content files (blog, experience, services, testimonials)
│   ├── blog/         # Blog posts as .md files with front-matter
│   ├── experience/
│   ├── services/
│   └── testimonials/
├── styles/           # Global CSS files (variables.css, index.css, components.css)
├── utils/            # Utility functions (markdown.js for parsing markdown)
├── config.js         # Global app configuration (APP_CONFIG)
├── App.jsx           # Root component with routing and intro sequence
└── main.jsx          # React entry point
```

## Key Configuration

Global app settings (e.g. `OPEN_TO_WORK` flag, `SITE_URL`, author info) live in `src/config.js` and are exported as `APP_CONFIG`.

## Common Commands

```bash
npm run dev       # Start Vite dev server
npm run build     # Production build (outputs to dist/)
npm run lint      # Run ESLint
npm run preview   # Preview production build locally
```

## Content Conventions

- Blog posts are Markdown files in `src/content/blog/` with front-matter fields: `title`, `excerpt`, `date`, `readTime`, `author`, `tags`, `mediumUrl`.
- Blog post filenames use a numeric prefix for ordering (e.g. `1-post-slug.md`), but slugs are derived from the full filename without `.md`.
- Markdown content is loaded at runtime via Vite's `import.meta.glob` and parsed using `src/utils/markdown.js`.

## Code Style

- Use **JSX** for all React components.
- Styling is done with **plain CSS** using CSS custom properties (defined in `src/styles/variables.css`); avoid adding CSS-in-JS or utility frameworks.
- Follow existing ESLint rules: `no-unused-vars` allows `UPPER_CASE` names (for constants).
- No test framework is currently set up; do not add one unless explicitly requested.
- Some comments and UI content are written in **French** — maintain the existing language in those areas when making changes.

## Deployment

The site is deployed automatically via `.github/workflows/deploy.yml` when changes are pushed to `main`. The workflow builds with Vite and uploads `dist/` as the GitHub Pages artifact. Deployment only runs on `main` branch pushes (not on PRs).
