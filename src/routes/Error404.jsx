import React from 'react';

const Error404 = () => (
    <>
        <style>
            {`
                html, body {
                    height: 100%;
                    margin: 0;
                }
                .container-404 {
                    display: flex;
                    height: 100%;
                    align-items: center;
                    flex-direction: column;
                    justify-content: center;
                    text-align: center;
                    background-color: #f8f9fa;
                }

                .error-item {
                    margin: 0.2rem;
                }

                .text-404 {
                    color: rgb(101, 101, 101);
                }

                .btn {
                    margin: 0px .2rem 0px .2rem;
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
        </div>
    </>
);

export default Error404;