import type { Metadata } from 'next';

import "./index.css";

export async function generateStaticParams() {
  return {}
}

export const metadata: Metadata = {
  title: 'Adrian Pothuaud | Portfolio | Home',
  description: 'My Portfolio',
};

export default function Index() {
  return (
    <>
      <header>
        <ul className="breadcrumb">
          <li><a href="/">Home</a></li>
        </ul>
      </header>

      <main>

        <div className="hero">
          <h1>Hi! I'm Adrian!</h1>
          <p>Welcome to my Personal Website.</p>
          <p>Feel free to explore...</p>
        </div>

        <ul className="links">
          <li><a href="/experiences">Experiences</a></li>
          <li><a href="/missions">Missions</a></li>
          <li><a href="/projects">Projects</a></li>
          <li><a href="/articles">Articles</a></li>
          <li><a href="/templates">Templates</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>

      </main>

      <footer>
        <p>Made with ❤️ by Adrian Pothuaud</p>
      </footer>
    </>
  );
}
