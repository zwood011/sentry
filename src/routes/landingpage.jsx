import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { animate } from 'popmotion';
import '../styles/App.css';
import { Helmet } from 'react-helmet-async';

const LandingPage = () => {
    const date = new Date().getFullYear();

    useEffect(() => {
        const title = document.querySelector('.title');
        const main = document.querySelectorAll('main');

        if (title) {
            animate({
                from: { transform: 'translateY(-15px) translateZ(0px)', opacity: 0 },
                to: { transform: 'translateY(0px) translateZ(0px)', opacity: 1 },
                onUpdate: (latest) => {
                    title.style.transform = latest.transform;
                    title.style.opacity = latest.opacity;
                },
                duration: 1400,
            });
        }
        main.forEach((feature) => {
            animate({
                from: { transform: 'translateY(20px) translateZ(0px)', opacity: 0 },
                to: { transform: 'translateY(0px) translateZ(0px)', opacity: 1 },
                onUpdate: (latest) => {
                    feature.style.transform = latest.transform;
                    feature.style.opacity = latest.opacity;
                },
                duration: 1400,
            });
        });
    }, []);

    return (
        <>
            <div className='landing-container'>
                <Helmet>
                    <title>Sentry Grabber</title>

                    <meta
                        name='description'
                        data-rh='true'
                        content='real-time asteroid data, NASA asteroid data, user-friendly asteroid tracker interface, intuitive asteroid card format, asteroid warning updates'
                    />
                </Helmet>

                <header className='landing-header'>
                    <h1 className='title'>Sentry Grabber</h1>
                    <p className='subtitle'>Explore potentially hazardous asteroids data with ease</p>
                    <p className='sub-text'>
                        This site is currently hosted for development testing. This project is in early stages and
                        everything within this site is subject to change.
                    </p>
                    <Link to='/sentry' className='Button-Landing' aria-label='View Project'>
                        View Project
                    </Link>
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
