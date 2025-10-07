import React from "react";
import { Link } from "gatsby";

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, title }) => {
  return (
    <>
      <nav className="container-fluid">
        <ul>
          <li>
            <Link to="/" style={{ textDecoration: "none" }}>
              <strong>Adrian Pothuaud</strong>
            </Link>
          </li>
        </ul>
        <ul>
          <li>
            <Link to="/blog" style={{ textDecoration: "none" }}>
              Blog
            </Link>
          </li>
          <li>
            <Link to="/projects" style={{ textDecoration: "none" }}>
              Projets
            </Link>
          </li>
        </ul>
      </nav>

      <main className="container">
        {title && (
          <header>
            <h1>{title}</h1>
          </header>
        )}
        {children}
      </main>

      <footer className="container">
        <hr />
        <div style={{ textAlign: "center", padding: "1rem 0" }}>
          <p>
            © {new Date().getFullYear()} Adrian Pothuaud. 
            <span style={{ margin: "0 1rem" }}>|</span>
            <a href="https://github.com/adrianpothuaud" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            <span style={{ margin: "0 1rem" }}>|</span>
            <a href="https://linkedin.com/in/adrian-pothuaud" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          </p>
        </div>
      </footer>
    </>
  );
};

export default Layout;