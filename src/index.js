import React, { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import ErrorBoundary from './components/ErrorBoundary';
import LandingPage from './routes/landingpage'; // Import the landing page component directly

const routes = [
    {
        path: '/',
        element: <LandingPage />,
    },
    {
        path: 'sentry',
        element: React.lazy(() => import('./App')),
    },
];

const AppRouter = () => (
    <Router>
        <Suspense fallback={<div>Loading...</div>}>
            <HelmetProvider>
                <ErrorBoundary>
                    <Routes>
                        {routes.map(({ path, element }) => (
                            <Route key={path} path={path} element={element} />
                        ))}
                    </Routes>
                </ErrorBoundary>
            </HelmetProvider>
        </Suspense>
    </Router>
);

createRoot(document.getElementById('root')).render(
    <HelmetProvider>
        <ErrorBoundary>
            <AppRouter />
        </ErrorBoundary>
    </HelmetProvider>
);
