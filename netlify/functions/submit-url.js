const axios = require('axios');

exports.handler = async () => {
    const requestData = {
        siteUrl: "https://sentrygrabber.netlify.app",
        urlList: [
            "https://sentrygrabber.netlify.app",
            "https://sentrygrabber.netlify.app/sentry",
        ],
    };

    await axios.post(`https://ssl.bing.com/webmaster/api.svc/json/SubmitUrlBatch?apikey=32c8d1d8c05f4e1d85b7173019fbb751`, requestData, {
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        },
    });
};