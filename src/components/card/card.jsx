import React, { useState } from 'react';
import '../../styles/Sentry.css';

const Card = ({ data }) => {
    const [selectedCard, setSelectedCard] = useState(null);

    const handleClick = (obj) => {
        setSelectedCard(selectedCard === obj ? null : obj);
    };

    const renderData = (dataName, input, id) => (
        <div className={dataName.replace(/\s+/g, '-')}>
            <h4 className='Data-Heading'>{dataName}</h4>
            <p className='Data-Data'>{input}</p>
        </div>
    );

    return (
        <>
            {data.map((obj) => (
                <article
                    className={`Card ${obj.id} ${selectedCard?.id === obj.id ? 'selected' : ''}`}
                    key={obj.id}
                    onClick={() => handleClick(obj)}
                    aria-label={`Card for ${obj.fullname}`}>
                    <div className='Card-Header'>
                        <h1 className='Card-Name'>{obj.fullname}</h1>
                        <time className="time-text">Last observed: {obj.last_obs}</time>
                    </div>

                    {selectedCard?.id === obj.id && (
                        <section
                            className={`Card-Data ${selectedCard?.id === obj.id ? 'visible' : ''}`}
                            data-id={obj.id}
                            aria-label='Detailed card data'>
                            {renderData('Cumulative Hazard Rating', obj.ps_cum)}
                            {renderData('Diameter', `${obj.diameter} km`)}
                            {renderData('Hyperbolic Excess Velocity', `${obj.v_inf} km/s`)}
                            {renderData('Range', `Years: ${obj.range}`)}
                        </section>
                    )}

                </article>

            ))}
        </>
    );
};

export default Card;
