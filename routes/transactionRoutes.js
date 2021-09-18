const express = require("express");
const router = express.Router();

const TransactionController = require("../controllers/transactionController");
const { authentication } = require("../middlewares/authentication");
const multer = require("../middlewares/multer");
const imagekit = require("../middlewares/imagekit");

router.use(authentication);
router.post("/:budgetId", multer, imagekit, TransactionController.create);
router.put("/:id", multer, imagekit, TransactionController.update);
router.delete("/:id", TransactionController.delete);

module.exports = router;
