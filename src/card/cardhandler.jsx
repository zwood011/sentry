import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './card';
import Error from '../error';
import Loading from '../loading';

const CardHandler = () => {
    const [objects, setObjects] = useState([]);
    const [displayIndex, setDisplayIndex] = useState(9); // Initially display 9 cards
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    //* maybe get the more advanced API this one is very limited
    const fetchData = () => {
        setLoading(true);
        axios
            .get('https://ssd-api.jpl.nasa.gov/sentry.api')
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
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleLoadMore = () => {
        const nextIndex = Math.min(displayIndex + 9, objects.length);
        setDisplayIndex(nextIndex);
    };

    if (loading) return <Loading />;
    if (error) return <Error message={error.message} retry={fetchData} />;

    return (
        <>
            <div className='Card-Holder'>
                <Card data={objects.slice(0, displayIndex)} />
            </div>

            {displayIndex < objects.length && (
                <button className='Button' onClick={handleLoadMore}>
                    Show More
                </button>
            )}
        </>
    );
};

export default CardHandler;