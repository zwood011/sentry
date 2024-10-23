import React, { useState } from 'react';
import Rating from '@mui/material/Rating';

const RatingsPopup = ({ onRatingChange }) => {
    const [value, setValue] = useState(0); // Make sure all stars are unactivated by default to prevent false values from being submitted

    const handleRatingChange = (newValue) => {
        setValue(newValue);
        onRatingChange(Number(newValue));
    };

    return (
        <div className="ratings-popup-container">
            <div className="Ratings-Container">
                <Rating
                    name="size-medium"
                    value={value}
                    onChange={(event, newValue) => handleRatingChange(newValue)}
                />
            </div>

            <div className="Ratings-Text">
                <p>Click outside of the popup to exit without submitting a rating.</p>
            </div>
        </div>
    );
};

export default RatingsPopup;
