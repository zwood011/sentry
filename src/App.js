import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Filters from './components/filters';
import CardHandler from './components/card/cardhandler';

function App() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [objects, setObjects] = useState([]);
    const [filteredObjects, setFilteredObjects] = useState([]);
    const [render, setRender] = useState(false);

    const fetchData = () => {
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
                setFilteredObjects(objects);
                setLoading(false);
                setError(null);
                setRender(true);
            })
            .catch((error) => {
                setError(error);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleFilterName = (newFilter) => {
        const filtered = objects.filter((obj) => obj.fullname.toLowerCase().includes(newFilter.toLowerCase()));
        setFilteredObjects(filtered);
    };

    const handleFilterSize = () => {
        const filtered = [...filteredObjects].sort((a, b) => b.diameter - a.diameter);
        setFilteredObjects(filtered);
    };

    return (
        <div className='App' role='main'>
            {render && <Filters onFilterName={handleFilterName} onFilterSize={handleFilterSize} />}

            <CardHandler loading={loading} error={error} objects={filteredObjects} retryFetch={fetchData} />

            {render && (
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
