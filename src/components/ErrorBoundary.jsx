import React, { Component } from 'react';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    render() {
        const { hasError, error } = this.state;

        if (hasError) {
            return <ErrorFallback error={error} />;
        }

        return this.props.children;
    }
}

const ErrorFallback = ({ error }) => (
    <div
        style={{
            textAlign: 'center',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
        }}>
        <div>
            <h1>An error has been detected!</h1>
            <h3>Error: {error.message}</h3>
            <p>
                The developer has been notified of this issue and will provide a fix as soon as possible. Strong
                apologies for any inconvenience caused.
            </p>
        </div>
    </div>
);

export default ErrorBoundary;
