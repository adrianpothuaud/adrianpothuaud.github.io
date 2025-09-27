'use client'

import Link from 'next/link'
import { useEffect } from 'react'
import '../error-pages.css'

export default function ArticlesError({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        console.error('Articles error:', error)
    }, [error])

    return (
        <>
            <header>
                <ul className="breadcrumb">
                    <li><Link href="/">Home</Link></li>
                    <li><Link href="/articles">Articles</Link></li>
                    <li>Error</li>
                </ul>
            </header>

            <main>
                <div className="error-container">
                    <div className="error-animation">
                        <div className="error-number">📚</div>
                        <div className="error-icon">❌</div>
                    </div>

                    <div className="error-content">
                        <h1>Article Loading Error</h1>
                        <p>
                            We encountered an issue while loading the articles.
                        </p>
                        <p className="error-subtitle">
                            This might be a temporary issue with the content or file system.
                        </p>

                        <div className="error-actions">
                            <button
                                onClick={reset}
                                className="error-button primary"
                            >
                                Retry Loading
                            </button>
                            <Link href="/articles" className="error-button secondary">
                                Back to Articles
                            </Link>
                        </div>

                        <div className="error-suggestions">
                            <h3>While you're here, check out:</h3>
                            <ul>
                                <li><Link href="/projects">My Projects</Link></li>
                                <li><Link href="/experiences">My Experiences</Link></li>
                                <li><Link href="/contact">Contact Me</Link></li>
                                <li><Link href="/">Homepage</Link></li>
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