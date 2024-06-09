import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Landing.css';
import { Helmet } from 'react-helmet-async';

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
            <Helmet>
                <title>Sentry Grabber</title>
                <meta
                    name='description'
                    content='real-time asteroid data, NASA asteroid data, user-friendly asteroid tracker interface, intuitive asteroid card format, asteroid warning updates'
                />
            </Helmet>

            <div className='landing-container'>
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

                <main className='landing-main' role='main'>
                    <h2 className="main-h2">Frontend Tools Applied</h2>
                    <div className='tools-container'>
                        <section className='tool-category'>
                            <h2>Misc </h2>
                            <p>Google Analytics GA4</p>
                            <p>Google Tag Manager</p>
                            <p>cdnjs</p>
                            <p>jsDelivr</p>
                            <p>jQuery CDN</p>
                            <p>core.js</p>
                        </section>

                        <section className='tool-category'>
                            <h2>Main Libraries</h2>
                            <p>React</p>
                            <p>Emotion</p>
                            <p>Bootstrap 5.3.3</p>
                            <p>Express.js</p>
                            <p>Popper 2.11.8</p>
                            <p>jQuery UI 1.13.3</p>
                        </section>

                        <section className='tool-category'>
                            <h2>Minor Libraries</h2>
                            <p>React</p>
                            <p>React Router 6</p>
                            <p>core-js 3.37.1</p>
                            <p>jQuery 3.2.1</p>
                            <p>Open Graph</p>
                            <p>GraphQL</p>
                        </section>
                    </div>
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

//* Not worth creating a separate file so I shoved it down here
const AnimatedLetters = ({ text }) => {
    const [letters, setLetters] = useState([]);

    useEffect(() => {
        const letterArray = text.split('').map((letter, index) => ({
            letter,
            key: `${letter}-${index}`,
            animationDelay: `${index * 0.1}s`, // Adjust as needed
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
