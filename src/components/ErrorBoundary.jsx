
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
          <div style={{ textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div>
              <h2>An error has occurred☹️</h2>
              <p>Error message: {error.message}</p>
              {/* You can add more error details here */}
            </div>
          </div>
        );

        export default ErrorBoundary;