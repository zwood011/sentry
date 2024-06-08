import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { animate } from 'popmotion';
import '../styles/App.css';
import { Helmet } from 'react-helmet-async';

const LandingPage = () => {
    const date = new Date().getFullYear();

    useEffect(() => {
        const title = document.querySelector('.title');
        const subtitle = document.querySelector('.subtitle');
        const subText = document.querySelector('.sub-text');
        const button = document.querySelector('.Button-Landing');
        const features = document.querySelectorAll('.feature');

        if (title) {
            animate({
                from: { opacity: 0, y: -50 },
                to: { opacity: 1, y: 0 },
                duration: 1000,
                onUpdate: (latest) => {
                    title.style.opacity = latest.opacity;
                    title.style.transform = `translateY(${latest.y}px)`;
                },
            });
        }

        if (subtitle) {
            animate({
                from: { opacity: 0, y: -30 },
                to: { opacity: 1, y: 0 },
                duration: 1000,
                onUpdate: (latest) => {
                    subtitle.style.opacity = latest.opacity;
                    subtitle.style.transform = `translateY(${latest.y}px)`;
                },
            });
        }

        if (subText) {
            animate({
                from: { opacity: 0, y: -20 },
                to: { opacity: 1, y: 0 },
                duration: 1000,
                onUpdate: (latest) => {
                    subText.style.opacity = latest.opacity;
                    subText.style.transform = `translateY(${latest.y}px)`;
                },
            });
        }

        if (button) {
            animate({
                from: { opacity: 0, y: -10 },
                to: { opacity: 1, y: 0 },
                duration: 1000,
                onUpdate: (latest) => {
                    button.style.opacity = latest.opacity;
                    button.style.transform = `translateY(${latest.y}px)`;
                },
            });
        }

        if (features.length > 0) {
            features.forEach((feature) => {
                animate({
                    from: { opacity: 0, y: 20 },
                    to: { opacity: 1, y: 0 },
                    duration: 1000,
                    onUpdate: (latest) => {
                        feature.style.opacity = latest.opacity;
                        feature.style.transform = `translateY(${latest.y}px)`;
                    },
                });
            });
        }
    }, []);

    return (
        <>
            <div className='landing-container'>
                <Helmet>
                    <title>Sentry Grabber</title>
                    <meta
                        name='description'
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
