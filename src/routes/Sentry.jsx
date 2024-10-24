import React from 'react';
import { Helmet } from 'react-helmet-async';

// Custom Hooks
import useFilters from '../hooks/usefilters';
import useFetchData from '../hooks/useFetchData';

import '../styles/Sentry.css';

// Custom Components
import BGParticles from '../components/Visuals/BGParticles';
import Loading from '../components/loading';
import CardHandler from '../components/card/cardhandler';
import { headerAnimation, mainAnimation } from '../components/Visuals/animations';
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
                    Discover Earth Impact Data with Ease
                  </h2>

                  <h3 className="app-nav-item h3-sentry">
                    Asteroid Insights
                  </h3>
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
              retryFetch={refetch}
              count={count}
              aria-live='polite'
              aria-relevant='additions removals'
              objects={filteredObjects}
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