import "./missions.css";

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
