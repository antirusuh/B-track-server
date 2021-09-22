const sendMail = require("../helpers/nodemailer");
const {
  Transaction,
  Budget,
  User,
  Department,
  Category,
} = require("../models");

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
      const findDepartment = await Department.findByPk(departmentId);
      if (!findDepartment) throw { name: "NotFound" };
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

  static async getBudgetDetails(req, res, next) {
    const budgetId = req.params.id;

    try {
      const budgetDetails = await Budget.findByPk(budgetId, {
        include: [
          {
            model: Department,
          },
          {
            model: Transaction,
            include: [
              {
                model: Category,
              },
              { model: User },
            ],
          },
        ],
      });
      if (!budgetDetails) throw { name: "NotFound" };

      res.status(200).json(budgetDetails);
    } catch (err) {
      next(err);
    }
  }

  static async createBudget(req, res, next) {
    const { name, amount, date, due_date } = req.body;
    const { DepartmentId } = req.user;
    const managerFinance = await User.findOne({
      where: { role: "manager_finance" },
    });

    try {
      const requestedBudget = await Budget.create({
        name,
        amount,
        initial_amount: amount,
        date,
        due_date,
        status: "Unapproved",
        DepartmentId,
      });

      const user = await User.findByPk(req.user.id, {
        include: [{ model: Department }],
      });

      await sendMail(
        managerFinance.email,
        `New budget request`,
        `New budget request`,
        `<h1>Employee with username: ${user.username} from ${user.Department.name} Department just requested a new budget</h1>
        <h2>Budget Name: ${name}<h2/>
        <h2>Amount: Rp ${amount}<h2/>
        <h2>Date: ${date}<h2/>
        <h2>Due Date: ${due_date}<h2/>
        `
      );

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

      res.status(200).json(editedBudget[1][0].dataValues);
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
