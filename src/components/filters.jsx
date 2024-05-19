import React, { useState } from 'react';

const Filters = ({ onFilterName, onFilterSize }) => {
    const [name, setName] = useState('');
    const [buttonClicked, setButtonClicked] = useState(false);
    const [remove, setRemove] = useState(true);

    const handleNameChange = (event) => {
        setName(event.target.value);
        onFilterName(event.target.value);
        setButtonClicked(false);
        setRemove(true);
    };

    const handleButtonClick = () => {
        if (!buttonClicked) {
            if (name === '') {
                alert('need some input for now :( hard code');
            } else {
                setButtonClicked(true);
                onFilterSize();
            }
        } else {
            setButtonClicked(false);
            setName('');
        }
    };

    return (
        <div className='Filters'>
            <input
                type='text'
                placeholder='Filter by name'
                value={name}
                onChange={handleNameChange}
                aria-label='Filter objects'
            />
            {remove && <button onClick={handleButtonClick}>{buttonClicked ? setRemove() : 'Filter Largest'}</button>}
        </div>
    );
};

export default Filters;
