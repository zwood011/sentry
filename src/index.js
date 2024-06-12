import React, { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import ErrorBoundary from './components/ErrorBoundary';

const routes = [
    {
        path: '/',
        element: import('./routes/landingpage'),
    },
    {
        path: 'sentry',
        element: React.lazy(() => import('./App')),
    },
];

/* The primary purpose for Suspense is to suspend the rendering of a component tree until some
 condition is met, like lazy loading or data fetching. When a component wrapped in Suspense,
 React tries to render and encounters a lazy-loaded component that
 hasn't loaded yet. React will "suspend" the rendering of that component and its subtree." */
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
