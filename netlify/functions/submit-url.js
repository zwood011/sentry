const axios = require('axios');

exports.handler = async (event) => {
    const requestData = {
        siteUrl: "https://sentrygrabber.netlify.app",
        urlList: [
            "https://sentrygrabber.netlify.app",
            "https://sentrygrabber.netlify.app/sentry",
        ]
    };

    try {
        const response = await axios.post(`https://ssl.bing.com/webmaster/api.svc/json/SubmitUrlbatch?apikey=32c8d1d8c05f4e1d85b7173019fbb751`, requestData);
        return {
            statusCode: 200,
            body: JSON.stringify(response.data),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Error submitting URL batch.' }),
        };
    }
};
