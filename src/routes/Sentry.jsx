/* Breaking down this supermassive component will potentially
   add useless complexity for the scope of this portfolio project. */

import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import useFilters from '../hooks/usefilters';

import BGParticles from '../components/BGParticles';
import Loading from '../components/loading';
import CardHandler from '../components/card/cardhandler';
import { headerAnimation, mainAnimation } from '../components/animations';
import Filters from '../components/filters';
import Footer from '../components/Footer';

const Sentry = () => {
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [count, setCount] = useState(null);

  /* [objects, setObjects] is used as a storage for the original indexing of fetched data.
     This state is then passed down as a parameter to the useFilters.js custom hook for reference. [Line 56] */
  const [objects, setObjects] = useState([]);

  const fetchData = useCallback(() => { //? Create and move this to a custom hook IF refactored
    setLoading(true);
    axios
      .get('https://sentrygrabber.netlify.app/.netlify/functions/index')
      .then((response) => {
        const objects = response.data.data.map((obj) => ({
          fullname: obj.fullname,
          ps_cum: obj.ps_cum,
          des: obj.des,
          diameter: obj.diameter,
          h: obj.h,
          id: obj.id,
          ip: obj.ip,
          last_obs: obj.last_obs,
          last_obs_jd: obj.last_obs_jd,
          n_imp: obj.n_imp,
          ps_max: obj.ps_max,
          range: obj.range,
          ts_max: obj.ts_max,
          v_inf: obj.v_inf,
        }));
        setCount(response.data.count);
        setObjects(objects); // Stores the original raw data to be passed down to useFilters.js. [Line 62]
        setLoading(false);   // My own take on creating conditional loading without React Suspense. [Line 68]
      })
      .catch((error) => {
        setErrorMessage(error.message); // Prop drilled 2 layers, from Sentry.jsx --> CardHandler.jsx --> Error.jsx [Line 119, CardHandler.jsx Line 15]
        setLoading(false);
      });
  }, []);

  // Send the original objects to useFilters.js so it can construct functions for filtering the raw data.
  const { filteredObjects, filters } = useFilters(objects);
  // Refactor the functions & filteredObjects state exported by useFilters.js.

  useEffect(() => {
    fetchData(); // Fetch the data when the component has loaded.
  }, [fetchData]); //? If this project migrates to Next.js then it would be better to fetch this on the server.

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

                {/* Functions, refactored from useFilters.js [Line 56], get assigned to buttons
                 in Filters.jsx below. Functions are invoked when a button element is clicked. */}
                <Filters
                  className='app-nav-item'
                  onFilterName={filters.onFilterName} p
                  onFilterSize={filters.onFilterSize}
                  onFilterOldest={filters.onFilterOldest}
                  onFilterNewest={filters.onFilterNewest}
                  onClear={filters.onClear}
                  aria-label='Interactive filtering options for Earth impact data' />
                {/* When a function is invoked, the filteredObjects state is updated to reflect the new filtering order.
                  This updated state is then passed down to CardHandler for rendering. */}
              </nav>
            </div>
          </header>

          <main className={mainAnimation}>
            <CardHandler
              isLoading={loading}
              errorMessage={errorMessage}
              retryFetch={fetchData}
              count={count}
              aria-live='polite'
              aria-relevant='additions removals'
              objects={filteredObjects} />
            {/* Pass down the updated objects for rendering. The default state value for [filteredObjects] will always match [objects] unless a filter is invoked. */}
          </main>

          <Footer />
          <BGParticles />
        </div>
      )}
    </>
  );
};

export default Sentry;