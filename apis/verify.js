const axios = require('axios');

const client_id = process.env.VERIFY_CLIENT_ID
const username = process.env.VERIFY_USERNAME
const api_key = process.env.VERIFY_API_KEY

const instance = axios.create({
    baseURL: process.env.VERIFY_API,
    headers: {
        'CLIENT-ID': client_id,
        Authorization: `apikey ${username}:${api_key}`
    }
})

module.exports = instance