export default function Loading() {
    return (
        <>
            <header>
                <ul className="breadcrumb">
                    <li><a href="/">Home</a></li>
                    <li>Loading...</li>
                </ul>
            </header>

            <main>
                <div className="error-container">
                    <div className="loading-animation">
                        <div className="loading-spinner"></div>
                        <div className="loading-dots">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>

                    <div className="error-content">
                        <h1>Loading</h1>
                        <p>Please wait while we load the content...</p>
                    </div>
                </div>
            </main>

            <footer>
                <p>Made with ❤️ by Adrian Pothuaud</p>
            </footer>
        </>
    )
}