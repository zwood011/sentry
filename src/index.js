import React, { Suspense, lazy } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import ErrorBoundary from './components/ErrorBoundary';
import LandingPage from '../src/landingpage';

const Sentry = lazy(() => import('./routes/Sentry'));

/* 
!       Add more data and labels from the API, research the years category? 

TODO:   Add a question mark button (?) next to the label of the complex terms. This mark will have a popup
?       -that renders a modal or popup. I think chrome implemented one not too long ago?

*       Replace placeholder text across the site

TODO:   Add a github repo and possibly contact info to the footer of sentry and landing

?       Potentionally add one more filter option

TODO:   Finish off meta tags, favicon implementation, etc in index.html

?       Add animation to cards when .Button-Load (Load More) is clicked

        Final styling and touches (maybe media queries- not sure how this looks on tablet sizes)

        Why am I such a perfectionist?? WHY ARE THERE SO MANY SCREEN SIZES???? #grayhair
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