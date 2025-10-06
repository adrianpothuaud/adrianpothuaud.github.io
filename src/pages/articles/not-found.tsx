import { Link } from 'react-router'
import '../error-pages.css'

export default function ArticleNotFound() {
    return (
        <>
            <header>
                <ul className="breadcrumb">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/articles">Articles</Link></li>
                    <li>Article Not Found</li>
                </ul>
            </header>

            <main>
                <div className="error-container">
                    <div className="error-animation">
                        <div className="error-number">📄</div>
                        <div className="error-icon">🔍</div>
                    </div>

                    <div className="error-content">
                        <h1>Article Not Found</h1>
                        <p>
                            The article you're looking for doesn't exist or may have been moved.
                        </p>
                        <p className="error-subtitle">
                            It might have been removed, renamed, or you may have mistyped the URL.
                        </p>

                        <div className="error-actions">
                            <Link to="/articles" className="error-button primary">
                                Browse All Articles
                            </Link>
                            <Link to="/" className="error-button secondary">
                                Go Home
                            </Link>
                        </div>

                        <div className="error-suggestions">
                            <h3>Explore other sections:</h3>
                            <ul>
                                <li><Link to="/projects">Projects</Link></li>
                                <li><Link to="/experiences">Experiences</Link></li>
                                <li><Link to="/missions">Missions</Link></li>
                                <li><Link to="/contact">Contact</Link></li>
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