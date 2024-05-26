import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/landingpage.css';

const LandingPage = () => {
    const date = new Date().getFullYear;

    return (
        <div className='landing-container'>
            <header className='header'>
                <h1 className='title'>Welcome to the NASA Sentry Project</h1>
                <p className='subtitle'>Explore potentially hazardous asteroids data with ease</p>
                <Link to='/sentry' className='button'>
                    View Project
                </Link>
            </header>

            <main className='features'>
                <section className='feature'>
                    <h2 className='featureTitle'>Interactive Cards</h2>
                    <p className='featureDescription'>Visualize asteroid data in an intuitive card format.</p>
                </section>

                <section className='feature'>
                    <h2 className='featureTitle'>Real-time Updates</h2>
                    <p className='featureDescription'>Stay updated with the latest data from NASA's Sentry API.</p>
                </section>
                
                <section className='feature'>
                    <h2 className='featureTitle'>User-Friendly Interface</h2>
                    <p className='featureDescription'>Easily navigate and explore the information.</p>
                </section>
            </main>

            <footer className='footer'>
                <p className='footerText'>© {date} Zachary Wood. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default LandingPage;
