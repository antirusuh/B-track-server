const express = require("express");
const router = express.Router();
const BudgetController = require("../controllers/budgetController");
const authentication = require("../middlewares/authentication");
const authzManagerDepartment = require("../middlewares/authzManagerDepartment");
const authzManagerFinance = require("../middlewares/authzManagerFinance");
const authzFinance = require("../middlewares/authzFinance");

router.use(authentication);

router.get("/", authzFinance, BudgetController.getAll);

router.get("/department/:id", BudgetController.getByDepartment);

router.get("/:id", BudgetController.getBudgetDetails);

router.post("/", authzManagerDepartment, BudgetController.createBudget);

router.put("/:id", authzManagerFinance, BudgetController.editBudget);

router.delete("/:id", authzManagerDepartment, BudgetController.deleteBudget);

module.exports = router;

/*
BUDGET

GET	    /budgets 		        => get all budgets
GET	    /budgets/department/:id	=> get budgets by department
GET	    /budgets/:id		    => detail budget
POST	/budgets		        => request budget
PUT	    /budgets/:id		    => edit amount dan status
DELETE	/budgets/:id            => delete budget
*/
