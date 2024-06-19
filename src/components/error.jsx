import React from 'react';

import '../styles/Loading-Errors.css';


const Error = ({ message, retryFetch }) => {
    const clickHandler = () => {
        retryFetch();
    };

    return (
        <>
            <div className='Error-Container' role='alert' aria-labelledby='error-message'>
                <h1 id='error-message'>Error: {message}</h1>

                <div className='Tip-Container'>
                    <p className="Tip-Text">
                        Please make sure you have a stable internet connection and retry your request. If the issue
                        persists, contact our support team for further assistance.
                    </p>
                </div>

                <button onClick={clickHandler} aria-label='Retry loading' className='btn btn-primary btn-loading-retry'>
                    Retry
                </button>
            </div>
        </>
    );
};

export default Error;
