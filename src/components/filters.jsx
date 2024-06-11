/**
 * Filters Component
 * 
 * This component provides a set of filters for data fetched from the NASA API. Users can filter data by name, size, and observation dates. 
 * It integrates with the `useFilters` hook to manage filter states and functions.
 * 
 * @param {Object} props - The properties passed to the component.
 * @param {Function} props.onFilterName - A callback function to filter objects by their name.
 * This function should accept a string representing the name to filter by.
 * @param {Function} props.onFilterSize - A callback function to filter objects by their size (diameter) in descending order. 
 * This function does not take any parameters.
 * @param {Function} props.onFilterOldest - A callback function to filter objects by the oldest observation date.
 * This function does not take any parameters.
 * @param {Function} props.onFilterNewest - A callback function to filter objects by the newest observation date.
 * This function does not take any parameters.
 * 
 * @returns {JSX.Element} A rendered set of elements including buttons and a text input for user interaction.
 * 
 * @example
 * <Filters
 *   onFilterName={handleFilterName}
 *   onFilterSize={handleFilterSize}
 *   onFilterOldest={handleFilterOldest}
 *   onFilterNewest={handleFilterNewest}
 * />
 * 
 * @component
 * @function
 * @name Filters
 */

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
