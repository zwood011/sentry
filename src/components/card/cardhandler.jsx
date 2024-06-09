import React, { useState } from 'react';
import Error from '../error';
import Card from './card';
import Image from '../../assets/sad.jpg';

const CardHandler = ({ objects, error, retryFetch }) => {
    const [displayIndex, setDisplayIndex] = useState(9); // Initially display 6 cards

    const handleLoadMore = () => {
        const nextIndex = Math.min(displayIndex + 9, objects.length);
        setDisplayIndex(nextIndex);
    };

    if (error) return <Error message={error.message} retry={retryFetch} />;

    if (objects.length === 0)
        return (
            <div className='No-Results text-center' aria-live='polite' aria-atomic='true'>
                <h1>No Results</h1>
                <img src={Image} className='img-fluid' alt='A very sad person' />
            </div>
        );

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
