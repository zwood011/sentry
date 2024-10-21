import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const useFetchData = (url) => {
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const [objects, setObjects] = useState([]); // stores ur mapped data
    const [count, setCount] = useState(null); // store the count of objects

    const fetchData = useCallback(() => {
        setLoading(true);
        axios
            .get(url)
            .then((response) => {
                const mappedObjects = response.data.data.map((obj) => ({
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

                setCount(response.data.count); // set the count
                setObjects(mappedObjects); // update the mapped objects
                setLoading(false);
            })
            .catch((error) => {
                setErrorMessage(error.message);
                setLoading(false);
            });
    }, [url]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { loading, errorMessage, objects, count, refetch: fetchData }; // return objects and count now
};

export default useFetchData;