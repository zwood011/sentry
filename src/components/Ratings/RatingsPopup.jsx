import React, { useState } from 'react';
import Rating from '@mui/material/Rating';

const RatingsPopup = ({ onRatingChange }) => {
    const [value, setValue] = useState(0); // Default all stars to unselected

    const handleRatingChange = (newValue) => {
        setValue(newValue);
        onRatingChange(Number(newValue));
    };

    return (
        <div className="ratings-popup-container">
            <div className="Ratings-Container">
                <Rating
                    name="customized-rating"
                    value={value}
                    onChange={(event, newValue) => handleRatingChange(newValue)}
                    sx={{
                        '& .MuiRating-iconEmpty': {
                            color: 'white', // Set outline of empty stars to white
                        },
                    }}
                />
            </div>

            <div className="Ratings-Text">
                <p>Click outside of the popup to exit without submitting a rating.</p>
            </div>
        </div>
    );
};

export default RatingsPopup;