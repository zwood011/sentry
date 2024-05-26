import React, { useState } from 'react';
import '../../styles/App.css';

const Card = ({ data }) => {
    const [selectedCard, setSelectedCard] = useState(null);

    const handleClick = (obj) => {
        setSelectedCard(selectedCard === obj ? null : obj);
    };
    return (
        <>
            {data.map((obj) => (
                <article
                    className='Card'
                    key={obj.id}
                    onClick={() => handleClick(obj)}
                    aria-label={`Card for ${obj.fullname}`}>
                    <div className='Card-Header'>
                        <h1 className='Card-Name'>{obj.fullname}</h1>
                        <time>Last observed: {obj.last_obs}</time>

                        {selectedCard && selectedCard.id === obj.id && (
                            <section className='Card-Data' aria-label='Detailed card data'>
                                <div className='Data-container' role='article' aria-label='Cumulative Hazard Rating'>
                                    <h4 className='Data-Heading'>Cumulative Hazard Rating</h4>
                                    <p className='Data-Data'>{obj.ps_cum}</p>
                                </div>

                                <div className='Data-container' role='article' aria-label='Diameter'>
                                    <h4 className='Data-Heading'>Diameter</h4>
                                    <p className='Data-Data'>{obj.diameter} km</p>
                                </div>

                                <div className='Data-container' role='article' aria-label='Hyperbolic Excess Velocity'>
                                    <h4 className='Data-Heading'>Hyperbolic Excess Velocity</h4>
                                    <p className='Data-Data'>{obj.v_inf} km/s</p>
                                </div>

                                <div className='Data-container' role='article' aria-label='Range'>
                                    <h4 className='Data-Heading'>Range</h4>
                                    <p className='Data-Data'>Years: {obj.range}</p>
                                </div>
                            </section>
                        )}
                    </div>
                </article>
            ))}
        </>
    );
};

export default Card;
