import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from "react-router";

import './globals.css';

import ErrorBoundary from './components/ErrorBoundary';
import Experiences from './pages/experiences/page';
import Index from './pages/index/page';
import Loading from './pages/loading/loading';
import NotFound from './pages/not-found/not-found';
import TestError from './pages/test-error/page';

import './i18n/config';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <Suspense fallback={<Loading />}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/experiences" element={<Experiences />} />
            <Route path="/test-error" element={<TestError />} />
            {/* Route catch-all pour les pages 404 - doit être la dernière */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </Suspense>
    </ErrorBoundary>
  </StrictMode>,
)
