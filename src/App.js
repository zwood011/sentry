import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';

import './styles/App.css';

import Filters from './components/filters';
import Loading from './components/loading';
import CardHandler from './components/card/cardhandler';
import useFilters from './hooks/usefilters';

const App = () => {
    //TODO: Fix Card Titles - Large titles get cut off
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
                setErrorMessage(error);
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
                <title>Card Fetcher | Earth Impact Data</title>
                <meta
                    name='description'
                    data-rh='true'
                    content='Explore comprehensive data related to Earth impact risk, close-approaches, and asteroid monitoring from Neo-Nasareal-time asteroid data, NASA asteroid data, user-friendly asteroid tracker interface, intuitive asteroid card format, asteroid warning updates.'
                />
            </Helmet>

            <div className='App' role='main'>
                {!loading && (
                    <>
                        <header className='app-header'>
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
                        </header>

                        <main>
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
