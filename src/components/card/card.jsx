import React, { useState } from 'react';
import ReactDOMServer from 'react-dom/server';
import Swal from 'sweetalert2';

import '../../styles/CardHandler.css';
import CardPopup from './CardPopup';

const Card = ({ data }) => {
    const [selectedCard, setSelectedCard] = useState(null);

    const handleClick = (obj) => {
        setSelectedCard(selectedCard === obj ? null : obj);
    };

    const handlePopup = (obj) => {
        const cardPopupHtml = ReactDOMServer.renderToString(<CardPopup obj={obj} />);
        Swal.fire({
            title: `${obj.fullname}`,
            html: cardPopupHtml,
            width: 600,
            padding: '3em',
            color: '#ffffff',
            background: '#505050',
            confirmButtonColor: '#ff9aa3',
        });
    };

    const renderData = (data, input) => (
        <div className={data.replace(/\s+/g, '-')} key={data}>
            <h4 className='Data-Heading'>{data}</h4>
            <p className='Data-Data'>{input}</p>
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

                    {selectedCard?.id === obj.id && (
                        <button className="btn btn-dark header-button text-dark" onClick={() => handlePopup(obj)}
                            style={{ position: 'absolute', bottom: -30, right: 20, fontSize: '0.7em', padding: '.2rem 1rem .2rem 1rem' }}>?</button>)}

                    <div className='Card-Header'>
                        <h1 className='Card-Name'>{obj.fullname}</h1>
                        <time className="time-text">Last observed: {obj.last_obs}</time>
                    </div>

                    <section
                        className={`Card-Data ${selectedCard?.id === obj.id ? 'visible' : 'unvisible'}`}
                        aria-label='Detailed card data'>
                        {dataFields.map(({ name, data }) => renderData(name, data(obj)))}
                    </section>
                </article>
            ))}
        </>
    );
};

export default Card;