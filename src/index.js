/*  
!       Add more data and labels from the API, research categories more

!       DESIGN CARDS FURTHER- they just slap the data on a card, make it look nicer

?       Add theme switcher

?       Add animation to cards when .Button-Load (Load More) is clicked

*       Add a couple more filter options

*       The large asteroid name still has irregular sizing

TODO:   Add a question mark button (?) that renders a popup

TODO:   Add a github repo and possibly contact info to the footer of sentry and landing

TODO:   Finish off meta tags(and seo), aria, favicon implementation, etc in index.html

       !!! WHY ARE THERE SO MANY SCREEN SIZES????
*/

import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import ErrorBoundary from './components/ErrorBoundary';
import LandingPage from '../src/landingpage';

import Sentry from '../src/routes/Sentry.jsx';

const App = () => (
    <Router>
        <HelmetProvider>
            <ErrorBoundary>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route
                        path="/sentry"
                        element={<Sentry />}
                    />
                </Routes>
            </ErrorBoundary>
        </HelmetProvider>
    </Router>
);

createRoot(document.getElementById('root')).render(<App />);