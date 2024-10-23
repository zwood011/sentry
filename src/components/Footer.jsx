import React, { useRef } from 'react';
import { Link } from "react-router-dom";
import { createRoot } from 'react-dom/client';
import Swal from 'sweetalert2';
import RatingsPopup from './Ratings/RatingsPopup';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

const Footer = () => {
    const date = new Date().getFullYear();
    const userRatingRef = useRef(0); // Using ref to store user rating
    const uniqueClientId = 'user-rating-submitted'; // Unique identifier for tracking submission

    const handleRatingChange = (rating) => { // Invoked inside the onChange handler for <Rating /> inpside <RatingsPopup />
        userRatingRef.current = rating; // Update the ref value
    };

    const handleRatingsPopup = () => {
        if (localStorage.getItem(uniqueClientId)) {
            Swal.fire('Oops!', 'You have already submitted a rating!', 'info');
            return;
        }

        Swal.fire({
            title: `How am I doing?`,
            html: '<div id="ratings-popup-container"></div>',
            width: 600,
            padding: '3em',
            color: '#ffffff',
            background: '#8a8a8a',
            confirmButtonText: 'Submit',
            confirmButtonColor: '#ff9aa3',
            didOpen: () => {
                const container = document.getElementById('ratings-popup-container');
                const root = createRoot(container);
                root.render(<RatingsPopup onRatingChange={handleRatingChange} />); // Pass to RatingsPopup
            }
        }).then(async (result) => {
            if (result.isConfirmed) {
                if (userRatingRef.current === 0) {
                    Swal.fire('Oops!', 'Please select a rating before submitting.', 'error');
                    return;
                }

                try {
                    const docRef = doc(db, 'sentry-grabber', 'ratings');
                    const docSnap = await getDoc(docRef);

                    if (docSnap.exists()) {
                        const existingData = docSnap.data();
                        const fieldCount = Object.keys(existingData).filter(key => key.startsWith('user-rating')).length; // Count existing user-rating fields so fields don't overlap
                        const newField = `user-rating-${fieldCount + 1}`;

                        // Update Firestore document w/ the updated ref value
                        await updateDoc(docRef, {
                            [newField]: userRatingRef.current, // Numerical rating field
                            [`${newField}-timestamp`]: new Date(), // Timestamp field
                        });

                        // When successful, store the unique client identifier in local storage
                        Swal.fire('Thank you!', 'Rating submitted successfully ', 'success');
                        localStorage.setItem(uniqueClientId, 'true');

                    } else {
                        Swal.fire('Oops!', 'Ratings document does not exist!', 'error');
                    }

                } catch (error) {
                    Swal.fire('Oops!', 'Something went wrong. Please try again.', 'error');
                }
            }
        });
    };

    return (
        <footer className='Footer-Landing' role='contentinfo'>
            <p className='footerText'>© {date} Zachary Wood. All rights reserved.</p>

            <p className='footerText'>
                Powered by{' '}
                <Link
                    className='Hyperlink'
                    to='https://cneos.jpl.nasa.gov/sentry/'
                    aria-label='CNEOS impact monitoring system'>
                    CNEOS
                </Link>{' '}
                impact monitoring system. Visit the{' '}
                <Link
                    className='Hyperlink'
                    to='https://github.com/zwood011/sentry'
                    aria-label='GitHub project repository'>
                    Github
                </Link> Repository.
            </p>

            <div className="Rating-Container">
                <button className="btn btn-primary" onClick={handleRatingsPopup}>Rate Project</button>
            </div>
        </footer>
    );
};

export default Footer;