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

const router = createBrowserRouter(routes);

createRoot(document.getElementById('root')).render(<RouterProvider router={router} />);

// Function to extract all paths from the routes
const extractPaths = (routes) => {
    const paths = [];

    const traverseRoutes = (routeList) => {
        routeList.forEach((route) => {
            paths.push(route.path);
            if (route.children) {
                traverseRoutes(route.children);
            }
        });
    };

    traverseRoutes(routes);
    return paths;
};

// Function to generate XML sitemap
const generateSitemap = (paths) => {
    const baseUrl = 'https://neo-nasa.netlify.app/';
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths
    .map(
        (path) => `
    <url>
        <loc>${baseUrl}${path}</loc>
    </url>`
    )
    .join('')}
</urlset>`;

    return xml;
};

// Generate the sitemap
const paths = extractPaths(routes);
const sitemap = generateSitemap(paths);
console.log(sitemap);
