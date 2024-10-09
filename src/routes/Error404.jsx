import React from 'react';
import { useNavigate } from 'react-router-dom';
import BGParticles from '../components/BGParticles';

const Error404 = () => {
    const navigate = useNavigate();

    return (
        <>
            <style>
                {`
                    html, body {
                        height: 100%;
                        margin: 0;
                    }
                    .container-404 {
                        display: flex;
                        min-height: 100vh;
                        align-items: center;
                        flex-direction: column;
                        justify-content: center;
                        text-align: center;
                        background-color: #3a3a3a;
                    }

                    .text-404 {
                        color: rgb(254, 162, 162);
                    }

                    .header-button {
                        padding: .5em;
                        margin: 1rem 0;
                        position: relative;
                        border-radius: var(--border-radius);
                        border: none;
                        font-family: 'Arial Narrow Bold', sans-serif;
                        font-size: 1.1em;
                        font-weight: bold;
                        background: rgb(254, 162, 162);
                        color: rgb(57, 57, 57);
                        transition: var(--transition);
                        cursor: pointer;
                        z-index: 3;
                        text-decoration: none;
                    }

                    .divider {
                        width: 50%;
                        height: 2px;
                        background-color: rgb(254, 162, 162);
                        margin: 1rem 0;
                        border: none;
                    }
                `}
            </style>
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
        </>
    );
};

export default Error404;
