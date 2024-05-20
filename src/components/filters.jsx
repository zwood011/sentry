import React, { useState } from 'react';

const Filters = ({ onFilterName, onFilterSize, onFilterOldest, onFilterNewest }) => {
    const [name, setName] = useState('');

    const handleNameChange = (event) => {
        setName(event.target.value);
        onFilterName(event.target.value);
    };

    const handleLargest = () => {
        onFilterSize();
    };

    const handleOldest = () => {
        onFilterOldest();
    };

    const handleNewest = () => {
        onFilterNewest();
    };

    return (
        <div className='Filters'>
            <input
                type='text'
                placeholder='Filter by name'
                value={name}
                onChange={handleNameChange}
                aria-label='Filter objects'
            />

            <div className='dropdown'>
                <button
                    className='btn btn-secondary dropdown-toggle'
                    type='button'
                    id='dropdownMenuButton'
                    data-toggle='dropdown'
                    aria-haspopup='true'
                    aria-expanded='false'>
                    Dropdown button
                </button>

                <div className='dropdown-menu' aria-labelledby='dropdownMenuButton'>
                    <button onClick={handleLargest}>Filter Largest</button>
                    <button onClick={handleOldest}>Oldest</button>
                    <button onClick={handleNewest}>Newest</button>
                </div>
            </div>
        </div>
    );
};

export default Filters;
