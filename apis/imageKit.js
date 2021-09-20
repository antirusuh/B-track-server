const axios = require('axios');

const apiKey = Buffer.from(`${process.env.IMAGEKIT_PRIVATE_KEY}:`).toString('base64')

const instance = axios.create({
    baseURL: process.env.IMAGEKIT_API,
    headers: {
        Authorization: `Basic ${apiKey}`
    }
})

module.exports = instance