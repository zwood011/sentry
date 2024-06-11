/**
 * Card Component
 *
 * The `Card` component represents an individual asteroid card displaying key information about the asteroid. It provides interactivity for selecting and expanding card details for a better user experience.
 *
 * @component
 *
 * @param {Array<Object>} data - An array of asteroid objects containing data to be displayed on cards.
 * @param {Object} obj - The asteroid object representing the card being clicked.
 * @param {string} dataName - The name of the data element.
 * @param {string} input - The value of the data element.
 * @param {string} id - The unique identifier for the data element.
 *
 * @returns {JSX.Element} The rendered UI displaying asteroid cards with the mapped out data in cardhandler.jsx
 * @description
 * The `Card` component encompasses the following functionalities:
 *
 * ### Card Display and Interaction
 * - **Interactive Cards**: Displays asteroid information in a card format, allowing users to click on cards to expand details.
 * - **Selection State**: Highlights selected cards and expands detailed information upon selection, enhancing user interaction.
 *
 * @example
 * return (
 *   <Card data={asteroidData} />
 * );
 *
 * @state {Object} selectedCard - Tracks the currently selected card for expansion of detailed information.
 *
 * @function handleClick - Toggles the selection of a card and expands or collapses detailed information.
 * @function renderData - Renders individual data elements within a card for display.
 *
 * @dependencies
 * - React hooks: `useState`
 */

import React, { useState } from 'react';
import '../../styles/App.css';

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
                    className={`Card ${selectedCard?.id === obj.id ? 'selected' : ''}`}
                    key={obj.id}
                    onClick={() => handleClick(obj)}
                    aria-label={`Card for ${obj.fullname}`}>
                    <div className='Card-Header'>
                        <h1 className='Card-Name'>{obj.fullname}</h1>
                        <time>Last observed: {obj.last_obs}</time>
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
