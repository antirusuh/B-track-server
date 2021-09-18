const { Transaction, Budget, User, Department } = require("../models");

class BudgetController {
  static async getAll(_, res, next) {
    try {
      const budgetData = await Budget.findAll({
        include: [
          {
            model: Department,
          },
        ],
      });

      res.status(200).json(budgetData);
    } catch (err) {
      next(err);
    }
  }

  static async getByDepartment(req, res, next) {
    const departmentId = req.params.id;
    try {
      const budgetData = await Budget.findAll({
        where: {
          DepartmentId: departmentId,
        },
        include: [
          {
            model: Department,
          },
        ],
      });

      res.status(200).json(budgetData);
    } catch (err) {
      next(err);
    }
  }

  static async getTransactionByBudget(req, res, next) {
    const budgetId = req.params.id;
    try {
      const transactionData = await Transaction.findAll({
        where: {
          BudgetId: budgetId,
        },
        include: [
          {
            model: Category,
          },
          {
            model: Budget,
            include: {
              model: Department,
            },
          },
          {
            model: User,
          },
        ],
      });

      if (!transactionData) throw { name: "NotFound" };

      res.status(200).json(transactionData);
    } catch (err) {
      next(err);
    }
  }

  static async createBudget(req, res, next) {
    const { name, amount, date, due_date } = req.body;
    const { departmentId } = req.user;

    try {
      const requestedBudget = await Budget.create({
        name,
        amount,
        date,
        due_date,
        status: "Unapproved",
        DepartmentId: departmentId,
      });

      res.status(201).json(requestedBudget);
    } catch (err) {
      next(err);
    }
  }

  static async editBudget(req, res, next) {
    const { amount, date, due_date, status } = req.body;
    const budgetId = req.params.id;

    try {
      const editedBudget = await Budget.update(
        {
          amount,
          initial_amount: amount,
          date,
          due_date,
          status,
        },
        {
          where: { id: budgetId },
          returning: true,
        }
      );

      res.status(204).json(editedBudget);
    } catch (err) {
      next(err);
    }
  }

  static async deleteBudget(req, res, next) {
    const budgetId = req.params.id;

    try {
      const dataExist = await Budget.findByPk(budgetId);

      if (!dataExist) {
        throw { name: "NotFound" };
      } else {
        await Budget.destroy({ where: { id: budgetId } });
        res.status(200).json({ message: "Budget successfully deleted" });
      }
    } catch (err) {
      next(err);
    }
  }
}

module.exports = BudgetController;
