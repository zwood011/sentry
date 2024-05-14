// netlify/functions/proxy.js

const axios = require('axios');

const API_URL = 'https://ssd-api.jpl.nasa.gov/sentry.api'; // Replace with the target API URL

exports.handler = async (event, context) => {
    try {
        const response = await axios.get(API_URL);
        return {
            statusCode: 200,
            body: JSON.stringify(response.data),
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to fetch data' }),
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
        };
    }
};