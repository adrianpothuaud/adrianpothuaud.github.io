import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import IntroSequence from './components/IntroSequence';
import Header from './components/Header';

import Home from './pages/Home';
import BlogList from './pages/BlogList';
import BlogPost from './pages/BlogPost';
import PrivacyPolicy from './pages/PrivacyPolicy';

function App() {
  const [showIntro, setShowIntro] = useState(() => {
    // Detecter les robots d'indexation (SEO)
    const isBot = /bot|googlebot|crawler|spider|robot|crawling|lighthouse/i.test(navigator.userAgent);
    if (isBot) return false;

    // Si l'utilisateur est déjà venu, on ne montre plus l'intro
    return localStorage.getItem('introSeen') !== 'true';
  });

  const handleIntroComplete = () => {
    localStorage.setItem('introSeen', 'true');
    setShowIntro(false);
    window.scrollTo(0, 0);
  };

  return (
    <>
      <div className="bg-glow"></div>

      <AnimatePresence mode="wait">
        {showIntro ? (
          <IntroSequence key="intro" onComplete={handleIntroComplete} />
        ) : (
          <main key="main-content" style={{ opacity: 1, transition: 'opacity 1s ease-in', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Header />

            <div style={{ flexGrow: 1 }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/blog" element={<BlogList />} />
                <Route path="/blog/:slug" element={<BlogPost />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />
              </Routes>
            </div>

            <footer className="footer">
              <div className="container">
                <div className="footer-inner">
                  <div>
                    <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.05rem', marginBottom: '0.25rem' }}>
                      A<span className="text-gradient">.Pothuaud</span>
                    </p>
                    <p className="footer-copy">© {new Date().getFullYear()} Adrian Pothuaud · Senior QA Engineer & Formateur</p>
                  </div>
                  <div className="footer-links">
                    <a href="/#services" className="footer-link">Formations</a>
                    <a href="/#experience" className="footer-link">Parcours</a>
                    <a href="/blog" className="footer-link">Blog</a>
                    <a href="/#contact" className="footer-link">Contact</a>
                    <a href="https://www.linkedin.com/in/adrianpothuaud/" target="_blank" rel="noopener noreferrer" className="footer-link">LinkedIn</a>
                    <a href="/privacy" className="footer-link">Confidentialité</a>
                  </div>
                </div>
              </div>
            </footer>
          </main>
        )}
      </AnimatePresence>
    </>
  );
}

export default App;
