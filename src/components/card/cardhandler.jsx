import React, { useState } from 'react';
import Card from './card';
import Error from '../error';
import Loading from '../loading';

const CardHandler = ({ loading, error, objects, retryFetch }) => {
    const [displayIndex, setDisplayIndex] = useState(9); // Initially display 6 cards

    const handleLoadMore = () => {
        const nextIndex = Math.min(displayIndex + 9, objects.length);
        setDisplayIndex(nextIndex);
    };

    if (loading) return <Loading />;
    if (error) return <Error message={error.message} retry={retryFetch} />;
    if (objects.length === 0) return <div>No Results</div>; //todo: css this

    return (
        <>
            <div className='Card-Holder' role='presentation' aria-label='Card container'>
                <Card data={objects.slice(0, displayIndex)} className='container-fluid' />
            </div>

            {displayIndex < objects.length && (
                <button className='Button' onClick={handleLoadMore} aria-label='Load more items'>
                    Show More
                </button>
            )}
        </>
    );
};

export default CardHandler;
