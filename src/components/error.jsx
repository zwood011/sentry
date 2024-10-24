import React from 'react';

import '../styles/Loading-Errors.css';


const Error = ({ message, retryFetch }) => {
    const clickHandler = () => {
        retryFetch();
    };

    return (
        <>
            <div className='Error-Container' role='alert' aria-labelledby='error-message'>
                <h1>Oh No!</h1>

                <div className='Tip-Container'>
                    <h2 id='error-message'>Error: {message}</h2>
                    <p className="Tip-Text">
                        Please make sure you have a stable internet connection and retry your request.
                    </p>
                </div>

                <button onClick={clickHandler} aria-label='Retry loading' className='btn btn-secondary btn-loading-retry'>
                    Retry
                </button>
            </div>
        </>
    );
};

export default Error;
