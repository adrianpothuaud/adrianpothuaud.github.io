import "./projects.css";

export default function Projects() {
  return (
    <>
      <header>
        <ul className="breadcrumb">
          <li><a href="/">Home</a></li>
          <li><a href="/projects">Projects</a></li>
        </ul>
      </header>

      <main>
        <div className="hero">
          <h1>My Projects</h1>
        </div>
      </main>

      <footer>
        <p>Made with ❤️ by Adrian Pothuaud</p>
      </footer>
    </>
  );
}
