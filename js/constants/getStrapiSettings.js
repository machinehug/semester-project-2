export default function getStrapiSettings(bodyData, method, headersData) {

    const settings = {
        method: method,
        body: bodyData,
        headers: headersData
    };

    return settings;
};