import React, { useState, useEffect } from 'react';

function ErrorBoundary({ children }) {
    const [hasError, setHasError] = useState(false);

    const ErrorFallback = () => (
        <div>
            <h2>Something went wrong :C</h2>
        </div>
    );

    useEffect(() => {
        const handleError = () => setHasError(true);
        window.addEventListener('error', handleError);
        return () => window.removeEventListener('error', handleError);
    }, []);

    return hasError ? <ErrorFallback /> : children;
}

export default ErrorBoundary;
