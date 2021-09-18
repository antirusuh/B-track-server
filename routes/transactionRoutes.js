const express = require("express");
const router = express.Router();
const TransactionController = require("../controllers/transactionController");

router.post("/:budgetId", TransactionController.create);
router.put("/:id", TransactionController.update);
router.delete("/:id", TransactionController.delete);

module.exports = router;
