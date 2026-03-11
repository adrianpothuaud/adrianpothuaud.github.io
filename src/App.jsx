import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import IntroSequence from './components/IntroSequence';
import Header from './components/Header';

import Home from './pages/Home';
import BlogList from './pages/BlogList';
import BlogPost from './pages/BlogPost';

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
              </Routes>
            </div>

            <footer style={{ textAlign: 'center', padding: 'var(--space-xl) 0', borderTop: '1px solid rgba(0,0,0,0.05)', color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>
              <div className="container">
                <p>© {new Date().getFullYear()} Adrian Pothuaud. Tous droits réservés.</p>
                <p style={{ marginTop: '0.5rem', opacity: 0.7 }}>Conçu avec Vite, React & Framer Motion.</p>
              </div>
            </footer>
          </main>
        )}
      </AnimatePresence>
    </>
  );
}

export default App;
