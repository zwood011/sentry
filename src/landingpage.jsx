import React, { useEffect } from 'react'; // import useEffect
import { Link } from 'react-router-dom';
import axios from 'axios';

import './styles/Landing.css';

import { Helmet } from 'react-helmet-async';
import { AnimatedLetters } from './components/animations';
import BGParticles from './components/BGParticles';
import Footer from './components/Footer';

const LandingPage = () => {
    useEffect(() => {
        const submitUrlBatch = async () => {
            try {
                // make sure to use the correct URL for your netlify function
                const response = await axios.post('/.netlify/functions/submit-url'); // hitting the netlify function directly
                console.log('url batch submitted successfully:', response.data);
            } catch (error) {
                console.error('error submitting url batch:', error);
            }
        };

        submitUrlBatch(); // call the function when the component mounts
    }, []);

    return (
        <>
            <Helmet>
                <title>Sentry Grabber</title>
                <meta
                    name='description'
                    content='real-time asteroid data, nasa asteroid data, user-friendly asteroid tracker interface, intuitive asteroid card format, asteroid warning updates'
                />
            </Helmet>

            <div className='landing-container container-fluid'>
                <header className='landing-header container-fluid'>
                    <div className='title'>
                        <AnimatedLetters text='Sentry Grabber' className="letter-color-fade" />
                    </div>

                    <h2 className='subtitle'>explore potentially hazardous asteroid data with ease</h2>

                    <div className='sub-text fadein'>
                        <p>your go-to platform for accessing real-time data from nasa. discover detailed information and asteroid specifications through intuitive multi-card formatting</p>
                        <nav>
                            <Link to='/sentry' className='Button-Landing' aria-label='view project'>
                                explore project
                            </Link>
                        </nav>
                    </div>
                </header>

                <main className='features' role='main'>
                    <section className='feature'>
                        <h2 className='featureTitle'>detailed specifications</h2>
                        <p className='featureDescription'>access detailed specifications and data for each asteroid, presented in an easy-to-read card structure</p>
                    </section>

                    <section className='feature'>
                        <h2 className='featureTitle'>real-time updates</h2>
                        <p className='featureDescription'>stay updated with the latest information from nasa's sentry api, ensuring you have current data at your fingertips</p>
                    </section>

                    <section className='feature'>
                        <h2 className='featureTitle'>user-friendly interface</h2>
                        <p className='featureDescription'>critically designed to support a user-friendly interface for seamless interaction</p>
                    </section>
                </main>

                <Footer />
                <BGParticles />
            </div>
        </>
    );
};

export default LandingPage;
