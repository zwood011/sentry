import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/App.css'; // Import your CSS file here
import { Helmet } from 'react-helmet-async';

// Animating the h1 letters individually in this component
const AnimatedLetters = ({ text }) => {
    const [letters, setLetters] = useState([]);

    useEffect(() => {
        const letterArray = text.split('').map((letter, index) => ({
            letter,
            key: `${letter}-${index}`,
            animationDelay: `${index * 0.1}s`, // Adjust the delay as needed
        }));
        setLetters(letterArray);
    }, [text]);

    return (
        <h1 className='AnimatedLetters'>
            {letters.map(({ letter, key, animationDelay }) => (
                <span key={key} style={{ animationDelay }}>
                    {letter === ' ' ? '\u00A0' : letter}
                </span>
            ))}
        </h1>
    );
};

const LandingPage = () => {
    const date = new Date().getFullYear();

    useEffect(() => {
        const features = document.querySelectorAll('.feature');
        features.forEach((feature) => {
            feature.style.transition = 'opacity .8s ease-in-out';
            feature.style.opacity = 0;
            setTimeout(() => {
                feature.style.opacity = 1;
            }, 100);
        });

        const subtitle = document.querySelector('.subtitle');
        const subtext = document.querySelector('.sub-text');
        subtitle.style.transition = 'opacity .8s ease-in-out';
        subtext.style.transition = 'opacity .8s ease-in-out';
        subtitle.style.opacity = 0;
        subtext.style.opacity = 0;
        setTimeout(() => {
            subtitle.style.opacity = 1;
            subtext.style.opacity = 1;
        }, 0);
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
                    <div className='title'>
                        <AnimatedLetters text='Sentry Grabber' />
                    </div>
                    <p className='subtitle'>Explore potentially hazardous asteroids data with ease</p>
                    <p className='sub-text'>
                        This site is currently hosted for development testing. This project is in early stages and
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
