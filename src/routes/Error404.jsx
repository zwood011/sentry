import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Error404.css';

const Error404 = () => {
    return (
        <div className='Error404 grid h-screen place-content-center bg-white px-4'>
            <div className='text-center'>
                <h1 className='text-9xl font-black text-gray-200'>404</h1>

                <p className='text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl'>Uh-oh!</p>

                <p className='mt-4 text-gray-500'>We can't find that page.</p>

                <Link
                    to='/'
                    className='Error404-Link -6 inline-block rounded px-5 py-3 temtxt-sm font-medium hover:bg-indigo-700 focus:outline-none focus:ring'>
                    Get me outta here!
                </Link>
            </div>
        </div>
    );
};

export default Error404;
