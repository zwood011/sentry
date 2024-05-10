import React, { useState } from 'react';
import CardData from './carddata';
import '../styles/App.css';

const Card = ({ data }) => {
    const [selectedCard, setSelectedCard] = useState(null);

    const handleClick = (obj) => {
        setSelectedCard(selectedCard === obj ? null : obj);
    };

    return (
        <>
            {data.map((obj) => (
                <div className='Card' key={obj.id} onClick={() => handleClick(obj)}>
                    <div className='Card-Header'>
                        <h1>{obj.fullname}</h1>
                        <h2>Last observed: {obj.last_obs}</h2>

                        {selectedCard && selectedCard.id === obj.id && (
                            <div className='Card-Data'>
                                <CardData data={obj} />
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </>
    );
};

export default Card;
