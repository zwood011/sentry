import React, { useState } from 'react';
import { Link } from 'react-router-dom';

/* 
  See a visualization of the data flow at 
  https://neo-nasa.netlify.app/dataflow.png
*/

const Filters = ({ onFilterName, onFilterSize, onFilterOldest, onFilterNewest, onClear }) => {
    const [name, setName] = useState('');

    const handleNameChange = (event) => {
        setName(event.target.value);
        onFilterName(event.target.value);
    };

    return (
        <div className='Filters container-fluid'>
            <Link to='/' className='btn btn-primary header-button' aria-label='Home page'>
                Home Page
            </Link>

            <button onClick={onClear} className='btn btn-secondary header-button' aria-label='Clear filters'>
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
                            className='Filter-Input form-control sub-text'
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Filters;
