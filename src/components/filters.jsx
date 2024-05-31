import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Filters = ({ onFilterName, onFilterSize, onFilterOldest, onFilterNewest }) => {
    const [name, setName] = useState('');

    const handleNameChange = (event) => {
        setName(event.target.value);
        onFilterName(event.target.value);
    };

    return (
        <header className='Filters container-fluid'>
            <Link to='/' className='btn btn-transparent header-button' aria-label='Home page'>
                Home
            </Link>
            <input
                type='text'
                placeholder='Filter by name'
                value={name}
                onChange={handleNameChange}
                aria-label='Filter objects by name'
                className='Filter-Input form-control'
            />

            <div className='dropdown'>
                <button
                    className='btn btn-transparent header-button dropdown-toggle'
                    type='button'
                    id='dropdownMenuButton'
                    data-toggle='dropdown'
                    aria-haspopup='true'
                    aria-expanded='false'
                    aria-label='Tools dropdown'>
                    Tools
                </button>

                <div className='dropdown-menu' aria-labelledby='dropdownMenuButton'>
                    <button onClick={onFilterSize} aria-label='Filter by largest size'>
                        Filter Largest
                    </button>
                    <button onClick={onFilterOldest} aria-label='Filter by oldest'>
                        Oldest
                    </button>
                    <button onClick={onFilterNewest} aria-label='Filter by newest'>
                        Newest
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Filters;
