const sendMail = require("../helpers/nodemailer");
const { format } = require("date-fns");

const idrCurrency = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(number);
};
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
        `New Budget Request`,
        `New Budget Request`,
        `<h1>Employee with username: ${user.username} from ${
          user.Department.name
        } Department just requested a new budget</h1>
        <ul>
          <li>Budget Name: ${name}<li/>
          <li>Amount: ${idrCurrency(amount)}<li/>
          <li>Date: ${format(new Date(date), "d MMMM y")}<li/>
          <li>Due Date: ${format(new Date(due_date), "d MMMM y")}<li/>
        <ul/>
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
      let editedBudget = await Budget.update(
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

      editedBudget = editedBudget[1][0];

      const managerDepartment = await User.findOne({
        where: { DepartmentId: editedBudget.DepartmentId },
      });

      if (status === "Approved") {
        await sendMail(
          managerDepartment.email,
          `Budget request has been approved - ${editedBudget.name}`,
          `Budget request has been approved - ${editedBudget.name}`,
          `<h1>Your requested budget has been approved from the finance department</h1>
          <ul>
          <li>Budget Name: ${editedBudget.name}<li/>
          <li>Amount: Rp ${idrCurrency(editedBudget.amount)}<li/>
          <li>Date: ${format(new Date(editedBudget.date), "d MMMM y")}<li/>
          <li>Due Date: ${format(
            new Date(editedBudget.due_date),
            "d MMMM y"
          )}<li/>
          <ul/>
          `
        );
      } else if (status === "Rejected") {
        await sendMail(
          managerDepartment.email,
          `Budget request has been rejected - ${editedBudget.name}`,
          `Budget request has been rejected - ${editedBudget.name}`,
          `<h1>Your requested budget has been rejected from the finance department</h1>
          <ul>
          <li>Budget Name: ${editedBudget.name}<li/>
          <li>Amount: Rp ${idrCurrency(editedBudget.amount)}<li/>
          <li>Date: ${format(new Date(editedBudget.date))}<li/>
          <li>Due Date: ${format(new Date(editedBudget.due_date))}<li/>
          <ul/>
          `
        );
      }

      res.status(200).json(editedBudget);
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
