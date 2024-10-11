import React, { useState } from 'react';
import '../../styles/CardHandler.css';

const Card = ({ data }) => {
    const [selectedCard, setSelectedCard] = useState(null);

    const handleClick = (obj) => {
        setSelectedCard(selectedCard === obj ? null : obj);
    };

    const renderData = (dataName, data) => (
        <div className={dataName.replace(/\s+/g, '-')} key={dataName}>
            <h4 className='Data-Heading'>{dataName}</h4>
            <p className='Data-Data'>{data}</p>
        </div>
    );

    const dataFields = [
        { name: 'Cumulative Hazard Rating', data: (obj) => obj.ps_cum },
        { name: 'Diameter', data: (obj) => `${obj.diameter} km` },
        { name: 'Hyperbolic Excess Velocity', data: (obj) => `${obj.v_inf} km/s` },
        { name: 'Range', data: (obj) => `Years: ${obj.range}` },
    ];

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

                    <section
                        className={`Card-Data ${selectedCard?.id === obj.id ? 'visible' : ''}`}
                        aria-label='Detailed card data'>
                        {dataFields.map(({ name, data }) => renderData(name, data(obj)))}
                    </section>
                </article>

            ))}
        </>
    );
};

export default Card;