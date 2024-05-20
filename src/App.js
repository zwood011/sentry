import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Filters from './components/filters';
import Loading from './components/loading';
import CardHandler from './components/card/cardhandler';
import useFilteredObjects from './hooks/usefilteredobjects';

function App() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [objects, setObjects] = useState([]);

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

    const { filteredObjects, handleFilterName, handleFilterSize, handleFilterOldest, onFilterNewest } =
        useFilteredObjects(objects);

    if (loading) return <Loading />;

    return (
        <div className='App' role='main'>
            {!loading && (
                <Filters
                    onFilterName={handleFilterName}
                    onFilterSize={handleFilterSize}
                    onFilterOldest={handleFilterOldest}
                    onFilterNewest={onFilterNewest}
                />
            )}

            <CardHandler loading={loading} error={error} objects={filteredObjects} retryFetch={fetchData}/>

            {!loading && (
                <footer>
                    <div className='Footer-Container'>
                        <p>Zachary Wood</p>
                    </div>
                </footer>
            )}
        </div>
    );
}

export default App;
