import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Filters from './components/Filters';
import Loading from './components/Loading';
import CardHandler from './components/card/CardHandler';
import useFilters from './hooks/usefilters';

const App = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [objects, setObjects] = useState([]);

    const date = new Date().getFullYear;

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
        <div className='App' role='main'>
            {!loading && (
                <>
                    <Filters
                        onFilterName={onFilterName}
                        onFilterSize={onFilterSize}
                        onFilterOldest={onFilterOldest}
                        onFilterNewest={onFilterNewest}
                    />
                    <div className='Page-Description'>
                        <p className='Description-Text'>Data fetched from NASA's Sentry API</p>
                        <a href='https://ssd-api.jpl.nasa.gov/doc/sentry.html'>API Link</a>
                    </div>

                    <CardHandler loading={loading} error={error} objects={filteredObjects} retryFetch={fetchData} />

                    <footer className='footer'>
                        <p className='footerText' style={{ color: 'white', textShadow: '1px 1px 3px black' }}>
                            © {date} Zachary Wood. All rights reserved.
                        </p>
                    </footer>
                </>
            )}
        </div>
    );
};

export default App;
