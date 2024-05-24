import React from 'react';

const Error = ({ message, retry }) => {
    const clickHandler = () => {
        retry();
    };

    return (
        <>
            <div className='Error-Container' role='alert'>
                <h1>Error: {message}</h1>
                <button onClick={clickHandler} aria-label='Retry loading'>
                    Retry
                </button>
            </div>

            <div className='Tip-Container'>
                <p>Please make sure you have a stable internet connection and retry your request. If the issue persists, contact our support team for further assistance.</p>
            </div>
        </>
    );
};

export default Error;