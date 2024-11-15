import React from 'react';
import { useNavigate } from 'react-router-dom';
import BGParticles from '../components/Visuals/BGParticles';
import '../styles/Error404.css';

const Error404 = () => {
    const navigate = useNavigate();

    return (
        <div className="container-404" aria-label="404 Error Page">
            <div className="error-item" aria-label="Error Header">
                <h1>Oh no!</h1>
                <h2 className="text-404">404</h2>
            </div>

            <div className="error-item" aria-label="Error Message">
                <p>The page you requested was not found.</p>
            </div>

            <div className="divider"></div>

            <div className="error-item">
                <button className="header-button" onClick={() => navigate(-1)}>
                    Go Back
                </button>
            </div>

            <BGParticles />
        </div>
    );
};

export default Error404;
