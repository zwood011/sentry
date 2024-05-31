import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Filters from './components/filters';
import Loading from './components/loading';
import CardHandler from './components/card/cardhandler';
import useFilters from './hooks/usefilters';
import { Helmet } from 'react-helmet-async';

const App = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
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
                setError(null);
            })
            .catch((error) => {
                setError(error);
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
            <div className='App' role='main'>
                <Helmet>
                    <title>Card Fetcher</title>
                    <meta
                        name='description'
                        data-rh='true'
                        content='Data related to Earth impact risk, close-approaches, and much more.'
                    />
                </Helmet>

                {!loading && (
                    <>
                        <Filters
                            onFilterName={onFilterName}
                            onFilterSize={onFilterSize}
                            onFilterOldest={onFilterOldest}
                            onFilterNewest={onFilterNewest}
                            aria-label='Filtering options'
                        />

                        <CardHandler
                            loading={loading}
                            error={error}
                            objects={filteredObjects}
                            retryFetch={fetchData}
                            aria-live='polite'
                            aria-relevant='additions removals'
                        />

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
