import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import LandingPage from './routes/landingpage';
import App from './App';
import ErrorBoundary from './components/ErrorBoundary';

const routes = [
    {
        path: '/',
        element: <LandingPage />,
    },
    {
        path: 'sentry',
        element: <App />,
    },
];

const AppRouter = () => (
    <Router>
        <Routes>
            {routes.map(({ path, element }) => (
                <Route key={path} path={path} element={element} />
            ))}
        </Routes>
    </Router>
);

createRoot(document.getElementById('root')).render(
    <HelmetProvider>
        <ErrorBoundary>
            <AppRouter />
        </ErrorBoundary>
    </HelmetProvider>
);
