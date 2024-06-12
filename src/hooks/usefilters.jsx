/* 
  See a visualization of the data flow at 
  https://neo-nasa.netlify.app/dataflow.png☺
*/

import { useState, useEffect } from 'react';

const useFilters = (initialObjects) => {
    const [objects, setObjects] = useState(initialObjects);
    const [filteredObjects, setFilteredObjects] = useState(initialObjects);

    useEffect(() => {
        setObjects(initialObjects);
        setFilteredObjects(initialObjects);
    }, [initialObjects]);

    const onFilterName = (newFilter) => {
        const filtered = objects.filter((obj) => obj.fullname.toLowerCase().includes(newFilter.toLowerCase()));
        setFilteredObjects(filtered);
    };

    const onClear = () => {
        setFilteredObjects(objects);
    };

    const onFilterSize = () => {
        const filtered = [...filteredObjects].sort((a, b) => b.diameter - a.diameter);
        setFilteredObjects(filtered);
    };

    const onFilterOldest = () => {
        const filtered = [...filteredObjects].sort((a, b) => a.last_obs_jd - b.last_obs_jd);
        setFilteredObjects(filtered);
    };

    const onFilterNewest = () => {
        const filtered = [...filteredObjects].sort((a, b) => b.last_obs_jd - a.last_obs_jd);
        setFilteredObjects(filtered);
    };

    return {
        filteredObjects,
        onFilterName,
        onFilterSize,
        onFilterOldest,
        onFilterNewest,
        onClear,
    };
};

export default useFilters;
