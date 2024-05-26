import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Filters = ({ onFilterName, onFilterSize, onFilterOldest, onFilterNewest }) => {
    const [name, setName] = useState('');

    const handleNameChange = (event) => {
        setName(event.target.value);
        onFilterName(event.target.value);
    };

    return (
        <header className='Filters'>
            <Link to='/' className="btn btn-secondary home-button">Home</Link>
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
                    Tools
                </button>
                
                <div className='dropdown-menu' aria-labelledby='dropdownMenuButton'>
                    <button onClick={onFilterSize}>Filter Largest</button>
                    <button onClick={onFilterOldest}>Oldest</button>
                    <button onClick={onFilterNewest}>Newest</button>
                </div>
            </div>
        </header>
    );
};

export default Filters;