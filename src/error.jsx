import React from 'react';
import { Link } from 'react-router-dom';

const Error = ({ message, retry }) => {
    const clickHandler = () => {
        retry();
    };

    return (
        <>
            <div className='Error-Container' role='alert'>
                <h1>Error: {message}</h1>
                <button onClick={clickHandler} aria-label='Retry loading'>
                    Retry like what?
                </button>
            </div>

            <div className='Tip-Container'>
                <h1>Network Issue?</h1>
                <h2>
                    It is possible you are on an incorrect URL. Please visit the following link:{' '}
                    <Link to='https://neo-nasa.netlify.app/'>Neo-Nasa</Link>
                </h2>
                <p>If this solution does not resolve the issue, it is likely that your network connection is unstable or not operational.</p>
            </div>
        </>
    );
};

export default Error;
