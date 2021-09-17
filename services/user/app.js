if (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'development') {
    require('dotenv').config()
}
const cors = require('cors');
const express = require('express');
const routes = require('./routes');
const { errorHandler } = require('./middlewares/errorHandler');

const app = express()

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(routes)
app.use(errorHandler)

module.exports = app