import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import useFilters from '../hooks/usefilters';
import useFetchData from '../hooks/useFetchData'; // new custom hook

import '../styles/Sentry.css';

import BGParticles from '../components/BGParticles';
import Loading from '../components/loading';
import CardHandler from '../components/card/cardhandler';
import { headerAnimation, mainAnimation } from '../components/animations';
import Filters from '../components/filters';
import Footer from '../components/Footer';

const Sentry = () => {
  const { loading, errorMessage, objects, count, refetch } = useFetchData('/.netlify/functions/index');

  const { filteredObjects, filters } = useFilters(objects);

  if (loading) return <Loading />;

  return (
    <>
      <Helmet>
        <title>Sentry Grabber | Card Fetcher</title>
        <meta
          name='description'
          data-rh='true'
          content='Explore comprehensive data related to Earth impact risk, close-approaches, and asteroid monitoring from Neo-Nasareal-time asteroid data, NASA asteroid data, user-friendly asteroid tracker interface, intuitive asteroid card format, asteroid warning updates.'
        />
      </Helmet>

      {!loading && (
        <div className='App' role='main'>
          <header className={headerAnimation}>
            <div className='padding-space'></div>

            <div className='app-header'>
              <nav>
                <h1 className='app-nav-item h1-sentry'>Earth Impact Data</h1>
                <div className='app-nav-side container-fluid'>
                  <h2 className='app-nav-item h2-sentry'>
                    Experience Seamless and Real-Time Updates with a User-Centric design
                  </h2>
                  <p className="app-nav-item h3-sentry">
                    CNEOS Impact Monitoring {' '}
                    <Link
                      className='Hyperlink'
                      to='https://cneos.jpl.nasa.gov/sentry/'
                      aria-label='CNEOS impact monitoring system'>
                      API
                    </Link>
                  </p>
                </div>

                <Filters
                  className='app-nav-item'
                  onFilterName={filters.onFilterName}
                  onFilterSize={filters.onFilterSize}
                  onFilterOldest={filters.onFilterOldest}
                  onFilterNewest={filters.onFilterNewest}
                  onClear={filters.onClear}
                  aria-label='Interactive filtering options for Earth impact data'
                />
              </nav>
            </div>
          </header>

          <main className={mainAnimation}>
            <CardHandler
              isLoading={loading}
              errorMessage={errorMessage}
              retryFetch={refetch} // refetch is still available for retries
              count={count} // pass count to CardHandler if needed
              aria-live='polite'
              aria-relevant='additions removals'
              objects={filteredObjects} // filtered objects for rendering
            />
          </main>

          <Footer />
          <BGParticles />
        </div>
      )}
    </>
  );
};

export default Sentry;
