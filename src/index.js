/*
!       Design cards futher with UX in mind- the cards need clarification

TODO:   Add a question mark button (?) that renders a popup

?       Add animation to cards when .Button-Load (Load More) is clicked

*       Add a couple more filter options

*       The large asteroid name still has irregular sizing

TODO:   Add a github repo and possibly contact info to the footer of sentry and landing

TODO:   Finish off meta tags(and seo), aria, favicon implementation, etc in index.html
*/

import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import ErrorBoundary from './components/ErrorBoundary';
import LandingPage from '../src/landingpage';

import Sentry from '../src/routes/Sentry.jsx';
import Error404 from './routes/Error404'; // Assume NotFound component is created

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