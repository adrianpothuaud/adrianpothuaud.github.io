import { useEffect } from 'react'
import { Link } from 'react-router'
import './error-pages.css'

interface ErrorProps {
    error?: Error & { digest?: string }
    reset?: () => void
}

export default function Error({ error, reset }: ErrorProps) {
    useEffect(() => {
        if (error) {
            console.error('Application error:', error)
        }
    }, [error])

    return (
        <>
            <header>
                <ul className="breadcrumb">
                    <li><a href="/">Home</a></li>
                    <li>Error</li>
                </ul>
            </header>

            <main>
                <div className="error-container">
                    <div className="error-animation">
                        <div className="error-number">500</div>
                        <div className="error-icon">⚠️</div>
                    </div>

                    <div className="error-content">
                        <h1>Something went wrong</h1>
                        <p>
                            An unexpected error occurred while processing your request.
                        </p>
                        <p className="error-subtitle">
                            {error?.message || "We're working to fix this issue."}
                        </p>

                        <div className="error-actions">
                            <button
                                onClick={reset}
                                className="error-button primary"
                            >
                                Try Again
                            </button>
                            <Link to="/" className="error-button secondary">
                                Go Home
                            </Link>
                        </div>

                        {error && (
                            <div className="error-details">
                                <details>
                                    <summary>Technical Details</summary>
                                    <pre>
                                        <code>{error.stack}</code>
                                    </pre>
                                </details>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            <footer>
                <p>Made with ❤️ by Adrian Pothuaud</p>
            </footer>
        </>
    )
}