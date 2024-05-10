import React from 'react';

const CardData = (obj) => {
    return (
        <>
            <div className='Data-container'>
                <h3>Cumulative Hazard Rating</h3>
                <p>{obj.data.ps_cum}</p>
            </div>

            <div className='Data-container'>
                <h3>Diameter</h3>
                <p>{obj.data.diameter} km</p>
            </div>

            <div className='Data-container'>
                <h3>Hyperbolic Excess Velocity</h3>
                <p>{obj.data.v_inf} km/s</p>
            </div>
            <div className='Data-container'>
                <h3>Range</h3>
                <p>Years: {obj.data.range}</p>
            </div>

        </>
    );
};

export default CardData;
