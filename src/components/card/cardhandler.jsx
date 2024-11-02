import React, { useState, useRef, useEffect } from 'react';
import Card from './card';
import Error from '../error';

import '../../styles/CardHandler.css';

const CardHandler = ({ objects, errorMessage, isLoading, retryFetch, count }) => {
    const [displayIndex, setDisplayIndex] = useState(9); // Default cards displayed on render
    const width = useRef(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            width.current = window.innerWidth;
            if (width.current <= 1148 && width.current >= 651) {
                setDisplayIndex(8); // Needed to even the indexing out so a single card doesn't take up an entire column
            } else {
                setDisplayIndex(9);
            }
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleLoadMore = () => {
        const nextIndex = Math.min(displayIndex + displayIndex, objects.length);
        setDisplayIndex(nextIndex);
    };

    if (errorMessage) {
        const sendMessage = errorMessage || 'An error occurred.';
        return <Error message={sendMessage} retryFetch={retryFetch} />;
    }

    if (!isLoading && objects.length === 0) {
        return (
            <div className='No-Results text-center' aria-live='polite' aria-atomic='true'>
                <h1 className="nr-h1">No Results</h1>
            </div>
        );
    }

    return (
        <div className='cardhandler-container'>
            <div className="card-count">
                <h2>Total Cards: {count}</h2>
            </div>

            <div className='Card-Holder' role='presentation' aria-label='Card container'>
                <Card data={objects.slice(0, displayIndex)} className='container-fluid' aria-label='Loaded cards' />
            </div>

            {displayIndex < objects.length && (
                <div className="loadmore-container">
                    <button className='Button-Load' onClick={handleLoadMore} aria-label='Load more items'>
                        Show More
                    </button>
                </div>
            )}
        </div>
    );
};

export default CardHandler;