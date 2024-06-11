/**
 * CardHandler Component
 *
 * The `CardHandler` component manages the display of asteroid cards based on the data received from the parent component. It handles pagination, error states, and loading indicators to provide a seamless user experience.
 *
 * @component
 *
 * @param {Array<Object>} objects - An array of asteroid objects fetched from the NASA API.
 * @param {string|null} errorMessage - An error message indicating any issues encountered during data fetching.
 * @param {boolean} isLoading - Indicates whether data is currently being fetched.
 * @param {Function} retryFetch - A callback function to retry fetching data in case of an error.
 *
 * @returns {JSX.Element} The rendered UI displaying asteroid cards, loading indicators, or error messages.
 *
 * @description
 * The `CardHandler` component encompasses the following functionalities:
 *
 * ### Displaying Asteroid Cards
 * - **Pagination**: Controls the display of asteroid cards, allowing users to load more cards as needed.
 * - **Error Handling**: Renders an error message if data fetching fails, providing users with an option to retry.
 * - **Loading Indicator**: Displays a loading indicator while data is being fetched, enhancing user experience.
 *
 * @example
 * return (
 *   <CardHandler
 *     objects={asteroidData}
 *     errorMessage={error}
 *     isLoading={isLoading}
 *     retryFetch={fetchData}
 *   />
 * );
 *
 * @state {number} displayIndex - Tracks the index of the last displayed asteroid card for pagination.
 *
 * @function handleLoadMore - Increases the display index to load more asteroid cards when the "Show More" button is clicked.
 *
 * @dependencies
 * - React hooks: `useState`
 * - Custom Components: `Card`, `Error`
 */

import React, { useState } from 'react';
import Card from './card';
import Image from '../../assets/sad.jpg';
import Error from '../error';

const CardHandler = ({ objects, errorMessage, isLoading, retryFetch }) => {
    const [displayIndex, setDisplayIndex] = useState(9); // Initially display 9 cards

    const handleLoadMore = () => {
        const nextIndex = Math.min(displayIndex + 9, objects.length);
        setDisplayIndex(nextIndex);
    };

    if (errorMessage) {
        const sendMessage = errorMessage || 'An error occurred.';
        return <Error message={sendMessage} retryFetch={retryFetch} />;
    }

    if (!isLoading && objects.length === 0) {
        return (
            <div className='No-Results text-center' aria-live='polite' aria-atomic='true'>
                <h1>No Results</h1>
                <img src={Image} className='img-fluid' alt='A very sad person' />
            </div>
        );
    }

    return (
        <div className='cardhandler-container'>
            <div className='Card-Holder' role='presentation' aria-label='Card container'>
                <Card data={objects.slice(0, displayIndex)} className='container-fluid' aria-label='Loaded cards' />
            </div>

            {displayIndex < objects.length && (
                <button className='Button-Load' onClick={handleLoadMore} aria-label='Load more items'>
                    Show More
                </button>
            )}
        </div>
    );
};

export default CardHandler;
