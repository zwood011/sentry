import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import '../styles/Filters.css';

const Filters = ({ onFilterName, onFilterSize, onFilterOldest, onFilterNewest, onClear }) => {
    const [placeholder, setPlaceholder] = useState("Search");
    const [name, setName] = useState('');

    const handleNameChange = (event) => {
        setName(event.target.value);
        onFilterName(event.target.value);

        if (placeholder === '') {
            setPlaceholder('Search');
        };
    };

    const clearHandler = () => {
        setName('');
        onClear();
        setPlaceholder('Search');
    };

    const handleBlur = () => {
        if (placeholder === '') {
            setPlaceholder('Search');
        }
    };

    return (
        <div className='Filters container-fluid'>
            <Link to='/' className='btn btn-secondary header-button' aria-label='Home page'>
                Home Page
            </Link>

            <button onClick={clearHandler} className='btn btn-secondary header-button' aria-label='Clear filters'>
                Filter Reset
            </button>

            <div className='dropdown'>
                <button
                    className='btn btn-dark header-button dropdown-toggle'
                    type='button'
                    id='dropdownMenuButton'
                    data-bs-toggle='dropdown'
                    aria-haspopup='true'
                    aria-expanded='false'
                    aria-label='Tools dropdown'>
                    Filter Tools
                </button>

                <div className='dropdown-menu' aria-labelledby='dropdownMenuButton'>
                    <div className='dropdown-flex'>
                        <input
                            type='text'
                            name='Asteroid Name'
                            placeholder={placeholder}
                            value={name}
                            onChange={handleNameChange}
                            onClick={() => setPlaceholder('')}
                            onBlur={handleBlur}
                            aria-label='Filter objects by name'
                            className='Filter-Input dropdown-item'
                            autoComplete='off' />

                        <button onClick={onFilterSize} className='dropdown-item' aria-label='Filter by largest size'>
                            Largest
                        </button>

                        <button onClick={onFilterOldest} className='dropdown-item' aria-label='Filter by oldest'>
                            Oldest
                        </button>

                        <button onClick={onFilterNewest} className='dropdown-item' aria-label='Filter by newest'>
                            Newest
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Filters;
