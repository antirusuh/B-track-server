require("dotenv").config();
const express = require("express");
const cors = require("cors");
const routers = require("./routes");
const { aWeekLeftReminder } = require("./helpers/aWeekLeftReminder");
const { dueDateReport } = require("./helpers/dueDateReport");

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(routers);

aWeekLeftReminder();
dueDateReport();

module.exports = app;
