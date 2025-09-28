import React from 'react';
import { Link } from "react-router-dom";
import RatingSystem from './Ratings/RatingsSystem';

const Footer = () => {
    const date = new Date().getFullYear();

    return (
        <footer className='Footer' role='contentinfo'>
            <div className='footerText'>
                © {date} Zach Wood. All rights reserved.
                Powered by{' '}
                <Link
                    className='Hyperlink'
                    to='https://cneos.jpl.nasa.gov/sentry/'
                    aria-label='CNEOS impact monitoring system'>
                    Sentry
                </Link>{' '}
            </div>

            <div className="footerText">
                Visit the{' '}
                <Link
                    className='Hyperlink'
                    to='https://github.com/zwood011/sentry'
                    aria-label='GitHub project repository'>
                    Github
                </Link> Repository{' | '}

                <RatingSystem />
            </div>
        </footer>
    );
};

export default Footer;