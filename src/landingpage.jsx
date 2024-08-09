import React from 'react';
import { Link } from 'react-router-dom';
import './styles/Landing.css';
import { Helmet } from 'react-helmet-async';
import { AnimatedLetters } from './components/animations';
import BGParticles from './components/BGParticles';

const LandingPage = () => {
    const date = new Date().getFullYear();

    return (
        <>
            <Helmet>
                <title>Sentry Grabber</title>
                <meta
                    name='description'
                    content='Real-time asteroid data, NASA asteroid data, user-friendly asteroid tracker interface, intuitive asteroid card format, asteroid warning updates'
                />
            </Helmet>

            <div className='landing-container container-fluid'>
                <header className='landing-header container-fluid'>
                    <div className='title'>
                        <AnimatedLetters text='Sentry Grabber' className="letter-color-fade" />
                    </div>
                    <h2 className='subtitle'>Explore potentially hazardous asteroid data with ease</h2>
                    <div className='sub-text fadein'>
                        <p>Your go-to platform for accessing real-time data from NASA. Discover detailed information and asteroid specifications through intuitive multi-card formatting</p>
                        <nav>
                            <Link to='/sentry' className='Button-Landing' aria-label='View Project'>
                                Explore Project
                            </Link>
                        </nav>
                    </div>
                </header>

                <main className='features' role='main'>
                    <section className='feature'>
                        <h2 className='featureTitle'>Detailed Specifications</h2>
                        <p className='featureDescription'>Access detailed specifications and data for each asteroid, presented in an easy-to-read card structure</p>
                    </section>

                    <section className='feature'>
                        <h2 className='featureTitle'>Real-time Updates</h2>
                        <p className='featureDescription'>Stay updated with the latest information from NASA's Sentry API, ensuring you have current data at your fingertips</p>
                    </section>

                    <section className='feature'>
                        <h2 className='featureTitle'>User-Friendly Interface</h2>
                        <p className='featureDescription'>Critically designed to support a user-friendly interface for seamless interaction</p>
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

                <BGParticles />
            </div>
        </>
    );
};

export default LandingPage;
