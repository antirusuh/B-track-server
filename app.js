require("dotenv").config();
const express = require("express");
const cors = require("cors");

const routers = require("./routes");
const errorHandler = require('./middlewares/errorHandler');

const app = express();
// const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(routers)

app.use(errorHandler)

module.exports = app;