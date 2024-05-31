import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
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

const router = createBrowserRouter(routes);

createRoot(document.getElementById('root')).render(
    <HelmetProvider>
        <RouterProvider router={router} />
    </HelmetProvider>
);
