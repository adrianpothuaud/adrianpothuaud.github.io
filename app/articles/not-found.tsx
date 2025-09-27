import Link from 'next/link'
import '../error-pages.css'

export default function ArticleNotFound() {
    return (
        <>
            <header>
                <ul className="breadcrumb">
                    <li><Link href="/">Home</Link></li>
                    <li><Link href="/articles">Articles</Link></li>
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
                            <Link href="/articles" className="error-button primary">
                                Browse All Articles
                            </Link>
                            <Link href="/" className="error-button secondary">
                                Go Home
                            </Link>
                        </div>

                        <div className="error-suggestions">
                            <h3>Explore other sections:</h3>
                            <ul>
                                <li><Link href="/projects">Projects</Link></li>
                                <li><Link href="/experiences">Experiences</Link></li>
                                <li><Link href="/missions">Missions</Link></li>
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