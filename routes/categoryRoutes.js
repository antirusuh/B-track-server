const express = require("express");
const router = express.Router();
const CategoryController = require("../controllers/categoryController");
const authentication = require("../middlewares/authentication");

router.use(authentication);
router.get("/", CategoryController.findAlll);

module.exports = router;
