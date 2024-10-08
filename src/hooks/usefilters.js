import { useState, useEffect } from 'react';

const useFilters = (initialObjects) => {
    const [objects, setObjects] = useState(initialObjects);
    const [filteredObjects, setFilteredObjects] = useState(initialObjects);

    useEffect(() => {
        setObjects(initialObjects);
        setFilteredObjects(initialObjects);
    }, [initialObjects]);

    const filters = {
        onFilterName: (newFilter) => {
            const filtered = objects.filter((obj) => obj.fullname.toLowerCase().includes(newFilter.toLowerCase()));
            setFilteredObjects(filtered);
        },

        onClear: () => {
            setFilteredObjects(objects);
        },

        onFilterSize: () => {
            const filtered = [...filteredObjects].sort((a, b) => b.diameter - a.diameter);
            setFilteredObjects(filtered);
        },

        onFilterOldest: () => {
            const filtered = [...filteredObjects].sort((a, b) => a.last_obs_jd - b.last_obs_jd);
            setFilteredObjects(filtered);
        },

        onFilterNewest: () => {
            const filtered = [...filteredObjects].sort((a, b) => b.last_obs_jd - a.last_obs_jd);
            setFilteredObjects(filtered);
        },
    };

    return {
        filteredObjects,
        filters
    };
};

export default useFilters;