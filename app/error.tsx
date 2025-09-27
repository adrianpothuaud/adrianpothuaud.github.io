'use client'

import Link from 'next/link'
import { useEffect } from 'react'
import './error-pages.css'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        console.error('Application error:', error)
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
                            {error.message || "We're working to fix this issue."}
                        </p>

                        <div className="error-actions">
                            <button
                                onClick={reset}
                                className="error-button primary"
                            >
                                Try Again
                            </button>
                            <Link href="/" className="error-button secondary">
                                Go Home
                            </Link>
                        </div>

                        <div className="error-details">
                            <details>
                                <summary>Technical Details</summary>
                                <pre>
                                    <code>{error.stack}</code>
                                </pre>
                            </details>
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