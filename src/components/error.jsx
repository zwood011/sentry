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
                <button onClick={clickHandler} aria-label='Retry loading' className='btn btn-primary'>
                    Retry
                </button>

                <div className='Tip-Container'>
                    <p>
                        Please make sure you have a stable internet connection and retry your request. If the issue
                        persists, contact our support team for further assistance.
                    </p>
                </div>
            </div>
        </>
    );
};

export default Error;
