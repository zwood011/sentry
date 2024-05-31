import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import LandingPage from './routes/landingpage';
import App from './App';
import Error404 from './routes/Error404';

const routes = [
    {
        path: '/',
        element: <LandingPage />,
    },
    {
        path: 'sentry',
        element: <App />,
    },
    {
        path: '404',
        element: <Error404 />,
    },
];

const router = createBrowserRouter(routes);

createRoot(document.getElementById('root')).render(
    <HelmetProvider>
        <RouterProvider router={router} />
    </HelmetProvider>
);
