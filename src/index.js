import React, { Suspense, lazy } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import ErrorBoundary from './components/ErrorBoundary';
import LandingPage from '../src/landingpage';

const Sentry = lazy(() => import('./routes/Sentry'));

/* 
! Before finishing up this project:

* Replace placeholder text across the site

todo- Add a github link and possibly contact info to the footer of sentry and landing

? Finish off meta tags, favicon implementation, etc in index.html

? Potentionally add one more filter 

* Make loading animation loop

 Final styling and tweaks

 Keep updating dependencies
*/

const routes = [
    {
        path: '/',
        element: <LandingPage />,
    },
    {
        path: 'sentry',
        element: (
            <Suspense>
                <Sentry />
            </Suspense>
        ),
    },
];

createRoot(document.getElementById('root')).render(
    <Router>
        <HelmetProvider>
            <ErrorBoundary>
                <Routes>
                    {routes.map(({ path, element }) => (
                        <Route key={path} path={path} element={element} />
                    ))}
                </Routes>
            </ErrorBoundary>
        </HelmetProvider>
    </Router>
);