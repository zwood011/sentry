/* 
See a visualization of the data flow at https://neo-nasa.netlify.app/dataflow.png
App is replaced by 'Sentry'
*/

import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import BGParticles from '../components/BGParticles';

import '../styles/Sentry.css';

import useFilters from '../hooks/usefilters';
import Loading from '../components/loading';
import CardHandler from '../components/card/cardhandler';
import { headerAnimation, mainAnimation } from '../components/animations';
const Filters = React.lazy(() => import('../components/filters'));

const Sentry = () => {
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [objects, setObjects] = useState([]);

  const date = new Date().getFullYear();

  const fetchData = useCallback(() => {
    setLoading(true);
    axios
      .get('https://neo-nasa.netlify.app/.netlify/functions/index')
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
        setObjects(objects);
        setLoading(false);
      })
      .catch((error) => {
        setErrorMessage(error.message);
        setLoading(false);
      });
  }, []);

  //* Add objects to the useFilters params
  const { filteredObjects, onFilterName, onFilterSize, onFilterOldest, onFilterNewest, onClear } = useFilters(objects);

  useEffect(() => {
    fetchData();
  }, [fetchData]);


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

      <div className='App' role='main'>
        {!loading && (
          <>
            <header className={headerAnimation}>
              <div className='padding-space'></div>

              <div className='app-header'>
                <nav>
                  <h1 className='app-nav-item h1-sentry'>Earth Impact Data</h1>
                  <div className='app-nav-side container-fluid'>
                    <h2 className='app-nav-item h2-sentry'>
                      Comprehensive data layed out in a multi-card format
                    </h2>

                    <h3 className="app-nav-item h3-sentry">
                      CNEOS Impact Monitoring {' '}
                      <Link
                        className='Hyperlink'
                        to='https://cneos.jpl.nasa.gov/sentry/'
                        aria-label='CNEOS impact monitoring system'>
                        API
                      </Link>
                    </h3>
                  </div>

                  <Filters
                    className='app-nav-item'
                    onFilterName={onFilterName}
                    onFilterSize={onFilterSize}
                    onFilterOldest={onFilterOldest}
                    onFilterNewest={onFilterNewest}
                    onClear={onClear}
                    aria-label='Filtering options for Earth impact data'
                  />
                </nav>
              </div>
            </header>

            <main className={mainAnimation}>
              <CardHandler
                isLoading={loading}
                errorMessage={errorMessage}
                objects={filteredObjects}
                retryFetch={fetchData}
                aria-live='polite'
                aria-relevant='additions removals'
              />
            </main>

            <footer className='Footer-Sentry'>
              <p className='footerText'>© {date} Zachary Wood. All rights reserved.</p>
              <div className='Page-Description' aria-label='Page Description'>
                <p className="Description-Text">
                  Powered by{' '}
                  <Link
                    className='Hyperlink'
                    to='https://cneos.jpl.nasa.gov/sentry/'
                    aria-label='CNEOS impact monitoring system'>
                    CNEOS
                  </Link>{' '}
                  impact monitoring system
                </p>
              </div>
            </footer>
          </>
        )}

        <BGParticles />
      </div>
    </>
  );
};

export default Sentry;