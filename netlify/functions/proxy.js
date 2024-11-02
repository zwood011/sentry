const axios = require('axios');

exports.handler = async (event, context) => {
    const API_URL = 'https://ssd-api.jpl.nasa.gov/sentry.api';

    try {
        const response = await axios.get(API_URL);

        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify(response.data),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error fetching data', error: error.message }),
        };
    }
};
