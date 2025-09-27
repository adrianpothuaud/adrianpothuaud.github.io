import type { Metadata } from 'next';

import "./missions.css";

export async function generateStaticParams() {
  return {}
}

export const metadata: Metadata = {
  title: 'Adrian Pothuaud | Portfolio | Missions',
  description: 'My Missions',
};

export default function Missions() {
  return (
    <>
      <header>
        <ul className="breadcrumb">
          <li><a href="/">Home</a></li>
          <li><a href="/missions">Missions</a></li>
        </ul>
      </header>

      <main>
        <div className="hero">
          <h1>My Missions</h1>
        </div>
      </main>

      <footer>
        <p>Made with ❤️ by Adrian Pothuaud</p>
      </footer>
    </>
  );
}
