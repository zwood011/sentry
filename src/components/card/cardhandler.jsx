import { useState, useRef, useEffect } from 'react';
import Card from './card';
import Error from '../error';

import '../../styles/CardHandler.css';

const CardHandler = ({ objects, errorMessage, isLoading, retryFetch, count }) => {
    const [displayIndex, setDisplayIndex] = useState(0);
    const width = useRef(window.innerWidth);

    const calculateDisplayIndex = (width) => {
        if (width <= 1148 && width >= 651) {
            return 8;
        }
        return 9;
    };

    useEffect(() => {
        setDisplayIndex(calculateDisplayIndex(width.current));

        const handleResize = () => {
            width.current = window.innerWidth;
            setDisplayIndex(calculateDisplayIndex(width.current));
        };

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
