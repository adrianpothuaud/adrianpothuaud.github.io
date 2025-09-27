"use client"

import Link from 'next/link'

import './error-pages.css'

export default function NotFound() {
  return (
    <>
      <header>
        <ul className="breadcrumb">
          <li><a href="/">Home</a></li>
          <li>404 - Page Not Found</li>
        </ul>
      </header>

      <main>
        <div className="error-container">
          <div className="error-animation">
            <div className="error-number">404</div>
            <div className="error-icon">🔍</div>
          </div>

          <div className="error-content">
            <h1>Page Not Found</h1>
            <p>
              Oops! The page you're looking for doesn't exist or has been moved.
            </p>
            <p className="error-subtitle">
              Don't worry, let's get you back on track.
            </p>

            <div className="error-actions">
              <Link href="/" className="error-button primary">
                Go Home
              </Link>
              <button
                onClick={() => window.history.back()}
                className="error-button secondary"
              >
                Go Back
              </button>
            </div>

            <div className="error-suggestions">
              <h3>You might be looking for:</h3>
              <ul>
                <li><Link href="/experiences">Experiences</Link></li>
                <li><Link href="/missions">Missions</Link></li>
                <li><Link href="/projects">Projects</Link></li>
                <li><Link href="/articles">Articles</Link></li>
                <li><Link href="/templates">Templates</Link></li>
                <li><Link href="/contact">Contact</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      <footer>
        <p>Made with ❤️ by Adrian Pothuaud</p>
      </footer>
    </>
  )
}