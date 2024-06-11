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
    //TODO: Fix Card Titles - Large titles get cut off
    //TODO: Fix background visual error, especially bad on mobile devices
    //TODO: Re-add animation for Card-Data
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

            <div className='App container-fluid' role='main'>
                {!loading && (
                    <>
                        <header className={`${headerAnimation} app-header container-fluid`}>
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
                            <h1 className='app-nav-item app-h1'>Earth Impact Data</h1>
                            <h2 className='app-nav-item app-h2'>
                                Explore comprehensive data brought to you by{' '}
                                <Link
                                    className='Hyperlink'
                                    to='https://cneos.jpl.nasa.gov/sentry/'
                                    aria-label='CNEOS impact monitoring system'>
                                    CNEOS
                                </Link>
                            </h2>
                            <p className='app-sub-text'>
                                Have any ideas regarding features or design? Please do not hesitate to share your ideas
                                through my{' '}
                                <Link className='Hyperlink' to='https://github.com/zwood011/neo-nasa-api'>
                                    e-mail
                                </Link>
                            </p>
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

                        <footer className='Footer-Sentry container-fluid'>
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

//* Emotion CSS Animations
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
