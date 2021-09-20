const router = require("express").Router();
const DepartmentController = require("../controllers/departmentController");

router.get("/", DepartmentController.findAll);

module.exports = router;
