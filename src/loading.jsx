import React from 'react';
import Logo from './assets/lgo.png';

const Loading = () => {
    return (
        <div className='Loading-Container'>
            <h1>Fetching Data...</h1>
            <img className="Spinning-Logo" src={Logo} alt='yas' />
        </div>
    );
};

export default Loading;
