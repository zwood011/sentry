import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LandingPage from './routes/landingpage';
import App from './App';

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

const updateCanonicalTag = (path) => {
    let link = document.querySelector("link[rel='canonical']");
    if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', 'canonical');
        document.head.appendChild(link);
    }
    link.setAttribute('href', `${window.location.origin}${path}`);
};

const router = createBrowserRouter(routes);
router.subscribe(({ location }) => updateCanonicalTag(location.pathname));

createRoot(document.getElementById('root')).render(<RouterProvider router={router} />);