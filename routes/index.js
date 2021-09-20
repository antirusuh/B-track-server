const express = require("express");
const router = express.Router();

const budgetRoutes = require("./budgetRoutes");
const transactionRoutes = require("./transactionRoutes");
const userRoutes = require("./userRoutes");
const scanInvoiceRoutes = require('./scanInvoiceRoutes');

router.use("/", userRoutes);

router.use("/budgets", budgetRoutes);

router.use("/transactions", transactionRoutes);

router.use("/scanInvoice",scanInvoiceRoutes )

module.exports = router;
