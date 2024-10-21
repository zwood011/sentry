import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import store from './redux/store.js';
import ErrorBoundary from './components/ErrorBoundary';
import LandingPage from '../src/landingpage';
import Sentry from '../src/routes/Sentry.jsx';
import Error404 from './routes/Error404';

const App = () => {
    useEffect(() => {
        const noscriptElement = document.querySelector('noscript');
        if (noscriptElement) {
            noscriptElement.remove();
        }

        const indexNowData = {
            host: "sentrygrabber.netlify.app",
            key: "489094d643c948c1aac3ff5cb9b981e2",
            keyLocation: "https://sentrygrabber.netlify.app/489094d643c948c1aac3ff5cb9b981e2.txt",
            urlList: [
                "https://sentrygrabber.netlify.app/",
                "https://sentrygrabber.netlify.app/sentry/"
            ]
        };

        fetch("https://cors-anywhere.herokuapp.com/https://api.indexnow.org/IndexNow", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
            body: JSON.stringify(indexNowData),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => console.log(data))
            .catch(error => console.error('Error:', error));

    }, []); // Added missing dependency array for useEffect

    return (
        <Router>
            <HelmetProvider>
                <ErrorBoundary>
                    <Provider store={store}>
                        <Routes>
                            <Route path="/" element={<LandingPage />} />
                            <Route path="/sentry" element={<Sentry />} />
                            <Route path="*" element={<Error404 />} />
                        </Routes>
                    </Provider>
                </ErrorBoundary>
            </HelmetProvider>
        </Router>
    );
};

createRoot(document.getElementById('root')).render(<App />);
