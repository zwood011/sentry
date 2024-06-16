import React from 'react';
import Logo from '../assets/logo.webp';
import { AnimatedLetters } from './animations';

const Loading = () => {
    return (
        <div className='Loading-Container' role='alert' aria-busy='true'>
            <AnimatedLetters text='Fetching Data' className="letter-color-fade" />
            <img className='Spinning-Logo' src={Logo} alt='Loading logo' aria-label='Loading' />
        </div>
    );
};

export default Loading;
