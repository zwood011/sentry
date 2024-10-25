import React, { useRef } from 'react';
import { Link } from "react-router-dom";
import { createRoot } from 'react-dom/client';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import Swal from 'sweetalert2';
import RatingsPopup from '../Ratings/RatingsPopup';
import { db } from '../../firebase';

const RatingSystem = () => {
    const userRatingRef = useRef(0); // Using ref to store user rating
    const uniqueClientId = 'user-rating-submitted'; // Unique identifier for tracking submission

    const handleRatingChange = (rating) => {
        console.log('handleRatingChange called with rating:', rating);
        userRatingRef.current = rating; // Update the ref value
    };

    const handleRatingsPopup = () => {
        console.log('handleRatingsPopup called');
        if (localStorage.getItem(uniqueClientId)) {
            console.log('Rating already submitted, skipping popup');
            Swal.fire('Oops!', 'You have already submitted a rating!', 'info');
            return;
        }

        Swal.fire({
            title: `How am I doing?`,
            html: '<div id="ratings-popup-container"></div>',
            width: 600,
            padding: '3em',
            color: 'var(--text-light)', // Updated to match your theme's text color
            background: 'rgb(47, 47, 47)', // Updated to match your Card background
            confirmButtonText: 'Submit',
            confirmButtonColor: 'var(--primary-accent)', // Matches accent color in theme
            didOpen: () => {
                console.log('Swal popup opened, rendering RatingsPopup');
                const container = document.getElementById('ratings-popup-container');
                const root = createRoot(container);
                root.render(<RatingsPopup onRatingChange={handleRatingChange} />);
            }
        }).then(async (result) => {
            console.log('Swal result received:', result);
            if (result.isConfirmed) {
                console.log('User confirmed submission, checking rating');
                if (userRatingRef.current === 0) {
                    console.log('Rating not selected, prompting user');
                    Swal.fire('Oops!', 'Please select a rating before submitting.', 'error');
                    return;
                }

                try {
                    console.log('Fetching ratings document');
                    const docRef = doc(db, 'sentry-grab', 'ratings');
                    const docSnap = await getDoc(docRef);
                    console.log('Document snapshot:', docSnap);

                    if (docSnap.exists()) {
                        console.log('Ratings document exists, processing data');
                        const existingData = docSnap.data();
                        const fieldCount = Object.keys(existingData).filter(key => key.startsWith('user-rating')).length;
                        const newField = `user-rating-${fieldCount + 1}`;

                        console.log('Updating document with new rating:', newField, userRatingRef.current);
                        await updateDoc(docRef, {
                            [newField]: userRatingRef.current,
                            [`${newField}-timestamp`]: new Date(),
                        });

                        console.log('Rating submitted successfully');
                        Swal.fire('Thank you!', 'Rating submitted successfully', 'success');
                        localStorage.setItem(uniqueClientId, 'true');

                    } else {
                        console.log('Ratings document does not exist');
                        Swal.fire('Oops!', 'Ratings document does not exist!', 'error');
                    }

                } catch (error) {
                    console.error('Error occurred while updating document:', error);
                    Swal.fire('Oops!', 'Something went wrong. Please try again.', 'error');
                }
            }
        });
    };

    return (
        <Link className="Hyperlink" onClick={handleRatingsPopup}>Rate Project</Link>
    );
};

export default RatingSystem;