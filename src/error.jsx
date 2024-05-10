import React from 'react';

const Error = ({ message, retry }) => {

    const clickHandler = () => {
        retry()
    };

    return (
        <div className='Error-Container'>
            <h1>Error: {message}</h1>
            <button onClick={clickHandler}>Retry</button>
        </div>
    );
};

export default Error;