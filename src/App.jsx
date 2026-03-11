import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import IntroSequence from './components/IntroSequence';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import ExperienceTimeline from './components/ExperienceTimeline';
import Testimonials from './components/Testimonials';
import Blog from './components/Blog';
import Contact from './components/Contact';

function App() {
  const [showIntro, setShowIntro] = useState(true);

  const handleIntroComplete = () => {
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
          <main key="main-content" style={{ opacity: 1, transition: 'opacity 1s ease-in' }}>
            <Header />
            <div className="container">
              <Hero />
              <Services />
              <ExperienceTimeline />
            </div>
            <Testimonials />
            <div className="container">
              <Blog />
              <Contact />
            </div>

            <footer style={{ textAlign: 'center', padding: 'var(--space-xl) 0', borderTop: '1px solid rgba(255,255,255,0.05)', color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>
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
