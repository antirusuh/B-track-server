const express = require("express");
const router = express.Router();

const budgetRoutes = require("./budgetRoutes");
const transactionRoutes = require("./transactionRoutes");
const userRoutes = require("./userRoutes");
const categoryRoutes = require("../routes/categoryRoutes");
const errorHandler = require("../middlewares/errorHandler");

router.use("/", userRoutes);

router.use("/budgets", budgetRoutes);

router.use("/categories", categoryRoutes);

router.use("/transactions", transactionRoutes);

router.use(errorHandler);

module.exports = router;
