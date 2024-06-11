/**
 * The main entry point for the React application.
 *
 * This file sets up the React Router and renders the application with the necessary providers and error handling.
 *
 * The main routes are defined in the `routes` array, which maps paths to their corresponding components.
 *
 * The `AppRouter` component wraps the routes and renders them within the `Router` component from `react-router-dom`.
 *
 * The application is then rendered using `createRoot` from `react-dom/client`, with the `HelmetProvider` and `ErrorBoundary` components providing additional functionality.
 */

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
