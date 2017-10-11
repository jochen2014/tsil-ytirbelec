import 'whatwg-fetch';
// when debugging locally, webpack is running at a different port from express;
// when running in production, client is servered as static pages;
const API_HOST = process.env.NODE_ENV === 'production' ? '/': 'http://localhost:3001';

export default function callApi(endpoint, options) {
    const fullUrl = (endpoint.indexOf(API_HOST) === -1) ? API_HOST + endpoint : endpoint
    const defaultOptions = {
        method: 'get',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: null
    };
    const fetchOptions = options || {};

    return fetch(fullUrl, {...defaultOptions, ...fetchOptions})
        .then(res => {
            if (res.status >= 400) {
                throw new Error("Bad response from server");
            }
            return res.json()
        })
        .then(res => {
            return Promise.resolve(res)
        })
        .catch(err => {
            return Promise.reject(err)
        })
};