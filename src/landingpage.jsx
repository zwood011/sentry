import React, { useEffect } from 'react';
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
            const requestData = {
                siteUrl: "https://sentrygrabber.netlify.app",
                urlList: [
                    "https://sentrygrabber.netlify.app",
                    "https://sentrygrabber.netlify.app/sentry",
                ]
            };

            try {
                const response = await axios.post('https://cors-anywhere.herokuapp.com/https://ssl.bing.com/webmaster/api.svc/json/SubmitUrlbatch?apikey=sampleapikeyEDECC1EA4AE341CC8B6', requestData, {
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8'
                    }
                });
                console.log('Response from SubmitUrlbatch:', response.data);
            } catch (error) {
                console.error('Error submitting URL batch:', error);
            }
        };

        submitUrlBatch();
    }, []);

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

                <Footer />
                <BGParticles />
            </div>
        </>
    );
};

export default LandingPage;