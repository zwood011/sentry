import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

// Custom Boundary
import ErrorBoundary from './components/ErrorBoundary';

// Custom Routes
import LandingPage from './routes/landingpage.jsx';
import Sentry from '../src/routes/Sentry.jsx';
import Error404 from './routes/Error404';

// MUI
import '@mui/material/styles';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const App = () => {
    useEffect(() => {
        const noscriptElement = document.querySelector('noscript');
        if (noscriptElement) {
            noscriptElement.remove();
        }
    }, []);

    return (
        <Router>
            <HelmetProvider>
                <ErrorBoundary>
                    <Routes>
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/sentry" element={<Sentry />} />
                        <Route path="*" element={<Error404 />} />
                    </Routes>
                </ErrorBoundary>
            </HelmetProvider>
        </Router>
    );
};

createRoot(document.getElementById('root')).render(<App />);