import React from 'react';
import { AnimatedLoader } from './animations';

import '../styles/Loading-Errors.css';

const Loading = () => {
    return (
        <div className='Loading-Container' role='alert' aria-busy='true'>
            <h1>Fetching Data</h1>
            <AnimatedLoader text='. _ . _ . _ . _ . _ . _ . _ . _' />
        </div>
    )
};

export default Loading;
