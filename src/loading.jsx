import React from 'react';
import Logo from './assets/lgo.png';

const Loading = () => {
    return (
        <div className='Loading-Container' role="alert" aria-busy="true">
            <h1>Fetching Data...</h1>
            <img className="Spinning-Logo" src={Logo} alt='Loading logo' aria-label="Loading"/>
        </div>
    );
};

export default Loading;