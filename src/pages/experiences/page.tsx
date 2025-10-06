import { Helmet } from 'react-helmet';

import "./experiences.css";

export default function Experiences() {
  return (
    <>
      <Helmet>
        <title>Adrian Pothuaud | Portfolio | Experiences</title>
        <meta name="description" content="My Experiences" />
      </Helmet>
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
