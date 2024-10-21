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
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(indexNowData),
        })
            .then(response => {
                if (!response.ok) {
                    console.error(`HTTP error! status: ${response.status}`);
                    return response.text(); // get the text to see what went wrong
                }
                return response.json(); // if okay, parse as json
            })
            .then(data => {
                if (data) { // check if data is valid
                    console.log(data);
                } else {
                    console.warn('no data returned');
                }
            })
            .catch(error => console.error('error:', error));

    }, []); // add empty dependency array to run only once

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
