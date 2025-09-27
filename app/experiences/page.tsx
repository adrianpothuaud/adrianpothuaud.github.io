import type { Metadata } from 'next';

import "./experiences.css";

export async function generateStaticParams() {
  return {}
}

export const metadata: Metadata = {
  title: 'Adrian Pothuaud | Portfolio | Experiences',
  description: 'My Experiences',
};

export default function Experiences() {
  return (
    <>
      <header>
        <ul className="breadcrumb">
          <li><a href="/">Home</a></li>
          <li><a href="/experiences">Experiences</a></li>
        </ul>
      </header>

      <main>
        <div className="hero">
          <h1>My Experiences</h1>
        </div>
      </main>

      <footer>
        <p>Made with ❤️ by Adrian Pothuaud</p>
      </footer>
    </>
  );
}
