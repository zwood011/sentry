import { useState, useEffect } from 'react';

const useFilteredObjects = (initialObjects) => {
    const [objects, setObjects] = useState(initialObjects);
    const [filteredObjects, setFilteredObjects] = useState(initialObjects);

    useEffect(() => {
        setObjects(initialObjects);
        setFilteredObjects(initialObjects);
    }, [initialObjects]);

    const handleFilterName = (newFilter) => {
        const filtered = objects.filter((obj) => obj.fullname.toLowerCase().includes(newFilter.toLowerCase()));
        setFilteredObjects(filtered);
    };

    const handleFilterSize = () => {
        const filtered = [...filteredObjects].sort((a, b) => b.diameter - a.diameter);
        setFilteredObjects(filtered);
    };

    const handleFilterOldest = () => {
        const filtered = [...filteredObjects].sort((a, b) => a.last_obs_jd - b.last_obs_jd);
        setFilteredObjects(filtered);
    };

    const onFilterNewest = () => {
        const filtered = [...filteredObjects].sort((a, b) => b.last_obs_jd - a.last_obs_jd);
        setFilteredObjects(filtered);
    };

    return {
        filteredObjects,
        handleFilterName,
        handleFilterSize,
        handleFilterOldest,
        onFilterNewest,
    };
};

export default useFilteredObjects;
