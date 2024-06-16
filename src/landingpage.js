import React from 'react';
import { Link } from 'react-router-dom';
import './styles/Landing.css';
import { Helmet } from 'react-helmet-async';
import { AnimatedLetters } from './components/animations';

const LandingPage = () => {
    const date = new Date().getFullYear();

    return (
        <>
            <Helmet>
                <title>Sentry Grabber</title>
                <meta
                    name='description'
                    content='real-time asteroid data, NASA asteroid data, user-friendly asteroid tracker interface, intuitive asteroid card format, asteroid warning updates'
                />
            </Helmet>

            <div className='landing-container container-fluid'>
                <header className='landing-header container-fluid'>
                    <div className='title'>
                        <AnimatedLetters text='Sentry Grabber' />
                    </div>
                    <h2 className='subtitle'>Explore potentially hazardous asteroids data with ease</h2>
                    <p className='sub-text fadein'>
                        This site is currently hoste-d for development testing. This project is in early stages and
                        everything within this site is subject to change.
                    </p>
                    <nav>
                        <Link to='/sentry' className='Button-Landing' aria-label='View Project'>
                            View Project
                        </Link>
                    </nav>
                </header>

                <main className='features' role='main'>
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

                <footer className='Footer-Landing' role='contentinfo'>
                    <p className='footerText'>© {date} Zachary Wood. All rights reserved.</p>
                    <p className='footerText'>
                        Powered by{' '}
                        <Link
                            className='Hyperlink'
                            to='https://cneos.jpl.nasa.gov/sentry/'
                            aria-label='CNEOS impact monitoring system'>
                            CNEOS
                        </Link>{' '}
                        impact monitoring system
                    </p>
                </footer>
            </div>
        </>
    );
};

export default LandingPage;
