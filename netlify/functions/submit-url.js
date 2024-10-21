const axios = require('axios');

exports.handler = async (event) => {
    const requestData = `
    <SubmitUrlBatch xmlns="http://schemas.datacontract.org/2004/07/Microsoft.Bing.Webmaster.Api">
        <siteUrl>https://sentrygrabber.netlify.app</siteUrl>
        <urlList>
            <string xmlns="http://schemas.microsoft.com/2003/10/Serialization/Arrays">https://sentrygrabber.netlify.app</string>
            <string xmlns="http://schemas.microsoft.com/2003/10/Serialization/Arrays">https://sentrygrabber.netlify.app/sentry</string>
        </urlList>
    </SubmitUrlBatch>
    `;

    try {
        const response = await axios.post(`https://ssl.bing.com/webmaster/api.svc/xml/SubmitUrlBatch?apikey=32c8d1d8c05f4e1d85b7173019fbb751`, requestData, {
            headers: {
                'Content-Type': 'application/xml; charset=utf-8',
            },
        });
        return {
            statusCode: 200,
            body: JSON.stringify(response.data),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'error submitting url batch.' }),
        };
    }
};
