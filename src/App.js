/**
 * App Component
 *
 * The `App` component serves as the main interface for the application. It fetches asteroid data from the NASA API,
 * manages application state, handles animations, and renders the primary sections of the /sentry route, including
 * the header, main content, and footer.
 *
 * API Endpoint (https://neo-nasa.netlify.app/.netlify/functions/index) for fetching asteroid data from the CNEOS Impact Monitoring System by NASA.
 *
 * @component
 *
 * @returns {JSX.Element} The rendered UI of the application, featuring the main architecture (header, main (cardhandler.jsx), and footer)
 *
 * @description
 * The `App` component encompasses the following functionalities:
 *
 * ### Data Fetching
 * - **Fetches asteroid data**: Utilizes `axios` to request data from the NASA API endpoint, managing loading and error states.
 *
 * ### Data Transfering
 * - Employs a custom hook, `useFilters.jsx`, to send the fetched data to useFilters.jsx to handle the filtering logic, which gets visually manipulated by Filters.jsx
 *   Sends data to 'cardhandler.jsx' to handle the card rendering that displays the data.
 *
 * ### Dynamic SEO and Metadata
 * - **Improves SEO**: Utilizes `Helmet` to set the document title and meta descriptions, boosting SEO and enhancing user engagement.
 *
 * ### State Managements
 * - **Loading**: Indicates if the application is loading data.
 * - **Error Message**: Holds any error messages encountered during data fetches, passed to `Error` component for user-friendly display.
 * - **Asteroid Data**: Stores the original asteroid data fetched from the NASA API.
 *
 * @example Basic component rendering in React
 * return (
 *   <App />
 * );
 *
 * @state {boolean} loading - Indicates the loading state during data fetches.
 * @state {string|null} errorMessage - Holds any error messages during data fetching and sends it to the `Error.jsx` component for user-friendly rendering.
 * @state {Array<Object>} objects - Stores asteroid data fetched from the NASA CNEOS API.
 *
 * @function fetchData - Fetches asteroid data from the API, updates state with fetched data, and manages loading and error states.
 *
 * @hook useEffect - Triggers `fetchData` on component mount, when function changes, or when the retry button is clicked in the 'Error.jsx' component.
 *
 * @dependencies
 * - React hooks: `useState`, `useEffect`, `useCallback`
 * - Routing: `Link` from `react-router-dom`
 * - HTTP Requests: `axios` for API calls
 * - SEO: `Helmet` for setting meta tags and titles
 * - Styling: `css` and `keyframes` from `@emotion/css`
 * - Custom Components: `Filters`, `Loading`, `CardHandler`
 * - Custom Hooks: `useFilters` for filtering asteroid data
 */

import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import { css, keyframes } from '@emotion/css';

import './styles/App.css';

import Filters from './components/filters';
import Loading from './components/loading';
import CardHandler from './components/card/cardhandler';
import useFilters from './hooks/usefilters';

const App = () => {
    //TODO: Fix background visual error, remove background from the body tag
    //TODO: Look into designing error.jsx/ErrorBundary.jsx/Loading.jsx/404.html further
    //TODO: Potentionally minimize loading by making a CDN

    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const [objects, setObjects] = useState([]);

    const date = new Date().getFullYear();

    const fetchData = useCallback(() => {
        setLoading(true);
        axios
            .get('https://neo-nasa.netlify.app/.netlify/functions/index')
            .then((response) => {
                const objects = response.data.data.map((obj) => ({
                    fullname: obj.fullname,
                    ps_cum: obj.ps_cum,
                    des: obj.des,
                    diameter: obj.diameter,
                    h: obj.h,
                    id: obj.id,
                    ip: obj.ip,
                    last_obs: obj.last_obs,
                    last_obs_jd: obj.last_obs_jd,
                    n_imp: obj.n_imp,
                    ps_max: obj.ps_max,
                    range: obj.range,
                    ts_max: obj.ts_max,
                    v_inf: obj.v_inf,
                }));
                setObjects(objects);
                setLoading(false);
            })
            .catch((error) => {
                setErrorMessage(error.message);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const { filteredObjects, onFilterName, onFilterSize, onFilterOldest, onFilterNewest } = useFilters(objects);

    if (loading) return <Loading />;

    return (
        <>
            <Helmet>
                <title>Card Fetcher | Sentry Grabber</title>
                <meta
                    name='description'
                    data-rh='true'
                    content='Explore comprehensive data related to Earth impact risk, close-approaches, and asteroid monitoring from Neo-Nasareal-time asteroid data, NASA asteroid data, user-friendly asteroid tracker interface, intuitive asteroid card format, asteroid warning updates.'
                />
            </Helmet>

            <div className='App' role='main'>
                {!loading && (
                    <>
                        <header className={headerAnimation}>
                            <div className='app-header'>
                                <nav>
                                    <Filters
                                        className='app-nav-item'
                                        onFilterName={onFilterName}
                                        onFilterSize={onFilterSize}
                                        onFilterOldest={onFilterOldest}
                                        onFilterNewest={onFilterNewest}
                                        aria-label='Filtering options for Earth impact data'
                                    />
                                </nav>
                                <h1 className='app-nav-item'>Earth Impact Data</h1>
                                <p className='app-nav-item'>
                                    Explore comprehensive data brought to you by the{' '}
                                    <Link
                                        className='Hyperlink'
                                        to='https://cneos.jpl.nasa.gov/sentry/'
                                        aria-label='CNEOS impact monitoring system'>
                                        CNEOS
                                    </Link>{' '}
                                    impact monitoring system
                                </p>
                            </div>
                        </header>

                        <main className={mainAnimation}>
                            <CardHandler
                                isLoading={loading}
                                errorMessage={errorMessage}
                                objects={filteredObjects}
                                retryFetch={fetchData}
                                aria-live='polite'
                                aria-relevant='additions removals'
                            />
                        </main>

                        <footer className='Footer-Sentry'>
                            <p className='footerText'>© {date} Zachary Wood. All rights reserved.</p>
                            <div className='Page-Description' aria-label='Page Description'>
                                <p className='Description-Text'>
                                    Powered by{' '}
                                    <Link
                                        className='Hyperlink'
                                        to='https://cneos.jpl.nasa.gov/sentry/'
                                        aria-label='CNEOS impact monitoring system'>
                                        CNEOS
                                    </Link>{' '}
                                    impact monitoring system
                                </p>
                            </div>
                        </footer>
                    </>
                )}
            </div>
        </>
    );
};

export default App;

// Emotion animations, placed down here for visual convenience
const slideInFromTop = keyframes`
  0% {
    transform: translateY(-100%);
    opacity: 0;
  }
  20% {
    opacity: 0.2;
  }
  40% {
    opacity: 0.4;
  }
  60% {
    opacity: 0.6;
  }
  80% {
    opacity: 0.8;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;

const slideInFromBottom = keyframes`
  0% {
    transform: translateY(100%);
    opacity: 0;
  }
  20% {
    opacity: 0;
  }
  40% {
    opacity: 0;
  }
  60% {
    opacity: .4;
  }
  80% {
    opacity: 0.5;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;
const headerAnimation = css`
    animation: ${slideInFromTop} 0.5s ease;
`;

const mainAnimation = css`
    animation: ${slideInFromBottom} 0.8s ease;
`;
