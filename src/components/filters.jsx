import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Filters = ({ onFilterName, onFilterSize, onFilterOldest, onFilterNewest }) => {
    const [name, setName] = useState('');

    const handleNameChange = (event) => {
        setName(event.target.value);
        onFilterName(event.target.value);
    };

    return (
        <div className='Filters container-fluid'>
            <Link to='/' className='btn btn-transparent header-button' aria-label='Home page'>
                Home
            </Link>

            <div className='dropdown'>
                <button
                    className='btn btn-transparent header-button dropdown-toggle'
                    type='button'
                    id='dropdownMenuButton'
                    data-bs-toggle='dropdown'
                    aria-haspopup='true'
                    aria-expanded='false'
                    aria-label='Tools dropdown'>
                    Tools
                </button>

                <div className='dropdown-menu' aria-labelledby='dropdownMenuButton'>
                    <button onClick={onFilterSize} className='dropdown-item' aria-label='Filter by largest size'>
                        Filter Largest
                    </button>
                    <button onClick={onFilterOldest} className='dropdown-item' aria-label='Filter by oldest'>
                        Oldest
                    </button>
                    <button onClick={onFilterNewest} className='dropdown-item' aria-label='Filter by newest'>
                        Newest
                    </button>
                    <input
                        type='text'
                        placeholder='Filter by name'
                        value={name}
                        onChange={handleNameChange}
                        aria-label='Filter objects by name'
                        className='Filter-Input form-control'
                    />
                </div>
            </div>
        </div>
    );
};

export default Filters;
