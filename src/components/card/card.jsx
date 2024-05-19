import React, { useState } from 'react';
import CardData from './carddata';
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
                    <header className='Card-Header'>
                        <h1>{obj.fullname}</h1>
                        <time>Last observed: {obj.last_obs}</time>

                        {selectedCard && selectedCard.id === obj.id && (
                            <section className='Card-Data' aria-label='Detailed card data'>
                                <CardData data={obj} />
                            </section>
                        )}
                    </header>
                </article>
            ))}
        </>
    );
};

export default Card;
