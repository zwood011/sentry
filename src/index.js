/*
!       Add some more clarity in the Cards, show what the data means

TODO:   Complete and design the question mark button (?) that renders a popup
*       ^ Clarify filters, make it useful

*       The large asteroid name still has irregular sizing
*/

import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';

import store from './redux/store.js';

import ErrorBoundary from './components/ErrorBoundary';
import LandingPage from '../src/landingpage';

import Sentry from '../src/routes/Sentry.jsx';
import Error404 from './routes/Error404';

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
                    <Provider store={store}>
                        <Routes>
                            <Route path="/" element={<LandingPage />} />
                            <Route path="/sentry" element={<Sentry />} />
                            <Route path="*" element={<Error404 />} />
                        </Routes>
                    </Provider>
                </ErrorBoundary>
            </HelmetProvider>
        </Router>
    );
};

createRoot(document.getElementById('root')).render(<App />);