const express = require("express");
const router = express.Router();

const budgetRoutes = require("./budgetRoutes");
const transactionRoutes = require("./transactionRoutes");
const userRoutes = require("./userRoutes");

router.use("/", userRoutes);

router.use("/budgets", budgetRoutes);

router.use("/transactions", transactionRoutes);

module.exports = router;
