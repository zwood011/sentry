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
                        <h1 className="Card-Name">{obj.fullname}</h1>
                        <time>Last observed: {obj.last_obs}</time>

                        {selectedCard && selectedCard.id === obj.id && (
                            <section className='Card-Data' aria-label='Detailed card data'>
                                <div className='Data-container' role='article' aria-label='Cumulative Hazard Rating'>
                                    <h3>Cumulative Hazard Rating</h3>
                                    <p>{obj.ps_cum}</p>
                                </div>

                                <div className='Data-container' role='article' aria-label='Diameter'>
                                    <h3>Diameter</h3>
                                    <p>{obj.diameter} km</p>
                                </div>

                                <div className='Data-container' role='article' aria-label='Hyperbolic Excess Velocity'>
                                    <h3>Hyperbolic Excess Velocity</h3>
                                    <p>{obj.v_inf} km/s</p>
                                </div>

                                <div className='Data-container' role='article' aria-label='Range'>
                                    <h3>Range</h3>
                                    <p>Years: {obj.range}</p>
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
