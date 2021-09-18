const express = require("express");
const router = express.Router();
const BudgetController = require("../controllers/budgetController");
// const { authorization } = require("../middlewares/authorization");
// const { authorizationManager } = require("../middlewares/authorizationManager");

// router.use(authentication);

router.get("/", BudgetController.getAll);

router.get("/department/:id", BudgetController.getByDepartment);

router.get("/", BudgetController.getTransactionByBudget);

router.post("/", BudgetController.createBudget);

router.put("/:id", BudgetController.editBudget);

router.delete("/:id", BudgetController.deleteBudget);

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
