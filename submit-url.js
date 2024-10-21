// submit-url.js
const axios = require('axios');

const requestData = {
    siteUrl: "https://sentrygrabber.netlify.app",
    urlList: [
        "https://sentrygrabber.netlify.app",
        "https://sentrygrabber.netlify.app/sentry",
    ],
};

async function submitUrl() {
    try {
        await axios.post(`https://ssl.bing.com/webmaster/api.svc/json/SubmitUrlBatch?apikey=32c8d1d8c05f4e1d85b7173019fbb751`, requestData, {
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
        });
        console.log('URLs submitted successfully');
    } catch (error) {
        console.error('Error submitting URLs:', error);
    }
}

submitUrl();