import React, { useState } from 'react';

const Filters = ({ onFilterName, onFilterSize }) => {
    const [name, setName] = useState('');

    const handleNameChange = (event) => {
        setName(event.target.value);
        onFilterName(event.target.value);
    };

    const handleButtonClick = () => {
        onFilterSize();
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
            <button onClick={handleButtonClick}>Filter Largest</button>
        </div>
    );
};

export default Filters;
