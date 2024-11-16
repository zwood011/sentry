import React, { useState } from 'react';
import Rating from '@mui/material/Rating';
import Divider from '@mui/material/Divider';

import '../../styles/Ratings.css';

const RatingsPopup = ({ onRatingChange }) => {
    const [value, setValue] = useState(0);

    const handleRatingChange = (newValue) => {
        setValue(newValue);
        onRatingChange(Number(newValue));
    };

    return (
        <div className="ratings-popup-container">
            <div className="Ratings-Divider">
                <Divider variant="middle" component="" sx={{ backgroundColor: '#9c9c9c' }} />
            </div>

            <div className="Ratings-Container">
                <Rating
                    name="customized-rating"
                    value={value}
                    onChange={(event, newValue) => handleRatingChange(newValue)}
                    sx={{
                        '& .MuiRating-iconEmpty': {
                            color: '#9da2ab', // Set outline of empty stars to white for visual clarity
                        },
                    }}
                />
            </div>

        </div>
    );
};

export default RatingsPopup;