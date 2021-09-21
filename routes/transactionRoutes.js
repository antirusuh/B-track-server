const express = require("express");
const router = express.Router();

const TransactionController = require("../controllers/transactionController");
const authentication = require("../middlewares/authentication");

router.use(authentication);
router.post("/:budgetId", TransactionController.create);
router.get("/:id", TransactionController.findOne);
router.put("/:id", TransactionController.update);
router.delete("/:id", TransactionController.delete);

module.exports = router;
