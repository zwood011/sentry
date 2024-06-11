/**
 * Custom React hook for filtering an array of objects fetched from the App.js component
 * This hook provides filtering functionality based on
 * various criteria, which is utilized by the Filters component to allow users
 * to apply different filters to the data.
 *
 * @param {Object[]} initialObjects - The initial array of objects fetched from the NASA API.
 * @returns {Object} The filtered array of objects based on the applied filters.
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
    };
};

export default useFilters;
