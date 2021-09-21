const sendMail = require("../helpers/nodemailer");
const { format } = require("date-fns");

const { Transaction, Budget, User, Category } = require("../models");

class TransactionController {
  static async findOne(req, res, next) {
    try {
      const { id } = req.params;
      const data = await Transaction.findByPk(id, {
        include: [User, Budget, Category],
      });
      if (!data) throw { name: "NotFound" };
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }

  static async create(req, res, next) {
    try {
      const { budgetId } = req.params;
      const userId = req.user.id;
      const { name, amount, invoice, date, CategoryId } = req.body;
      const budgetData = await Budget.findByPk(budgetId);
      const managerDept = await User.findOne({
        where: {
          DepartmentId: req.user.DepartmentId,
          role: "manager_department",
        },
      });

      if (budgetData.amount - amount < 0) {
        res.status(400).json({ message: "Out of budget" });
      } else if (
        (budgetData.amount - amount) / budgetData.initial_amount <=
        0.2
      ) {
        const transactionData = {
          name,
          date,
          amount,
          invoice,
          BudgetId: budgetId,
          UserId: userId,
          CategoryId,
        };
        const data = await Transaction.create(transactionData);
        await Budget.update(
          {
            ...budgetData,
            amount: budgetData.amount - amount,
          },
          { where: { id: budgetId } }
        );
        const updatedBudget = await Budget.findByPk(budgetId);

        await sendMail(
          managerDept.email,
          `A warning for budget ${updatedBudget.name} exceeds 80% usage`,
          `A warning for budget ${updatedBudget.name} exceeds 80% usage`,
          `<h1>Current budget for ${updatedBudget.name} is Rp ${
            updatedBudget.amount
          } (${
            (updatedBudget.amount / updatedBudget.initial_amount) * 100
          }% left)</h1>
          <br/>
          <p>An employee with username: ${
            req.user.username
          } just make a transaction for ${name} of Rp ${amount} at ${format(
            new Date(),
            "yyyy-MM-dd"
          )}</p>
          `
        );

        res.status(201).json(data);
      } else {
        const transactionData = {
          name,
          date,
          amount,
          invoice,
          BudgetId: budgetId,
          UserId: userId,
          CategoryId,
        };
        const data = await Transaction.create(transactionData);

        await Budget.update(
          {
            ...budgetData,
            amount: budgetData.amount - amount,
          },
          { where: { id: budgetId } }
        );

        res.status(201).json(data);
      }
    } catch (err) {
      next(err);
    }
  }

  static async update(req, res, next) {
    try {
      const { id } = req.params;
      const userId = req.user.id;
      const found = await Transaction.findByPk(id);
      const budgetData = await Budget.findByPk(Transaction.BudgetId);

      if (!found) {
        throw { name: "NotFound" };
      } else {
        const { name, date, amount, invoice, CategoryId } = req.body;
        const transactionData = {
          name,
          date,
          amount,
          invoice,
          BudgetId: found.BudgetId,
          UserId: userId,
          CategoryId,
        };

        if (amount > Transaction.amount) {
          if (budgetData.amount - (amount - Transaction.amount) < 0) {
            res.status(400).json({ message: "Out of budget" });
          } else if (
            budgetData.amount -
              (amount - Transaction.amount) / budgetData.initial_amount <=
            0.2
          ) {
            await Transaction.update(transactionData, { where: { id } });
            const updatedBudget = await Budget.update(
              {
                ...budgetData,
                amount: budgetData.amount - (amount - Transaction.amount),
              },
              { where: { id: budgetData.id }, returning: true }
            );

            await sendMail(
              managerDept.email,
              `A warning for budget ${updatedBudget.name} exceeds 80% usage`,
              `A warning for budget ${updatedBudget.name} exceeds 80% usage`,
              `<h1>Current budget for ${updatedBudget.name} is Rp ${
                updatedBudget.amount
              } (${
                (updatedBudget.amount / updatedBudget.initial_amount) * 100
              }% left)</h1>
              <br/>
              <p>An employee with username: ${
                req.user.username
              } just make a transaction for ${name} of Rp ${amount} at ${format(
                new Date(),
                "yyyy-MM-dd"
              )}</p>
              `
            );
            res.status(200).json({ message: `Update success for ID ${id}` });
          } else {
            await Transaction.update(transactionData, { where: { id } });

            await Budget.update(
              {
                ...budgetData,
                amount: budgetData.amount - (amount - Transaction.amount),
              },
              { where: { id: budgetData.id } }
            );

            res.status(200).json({ message: `Update success for ID ${id}` });
          }
        } else {
          await Budget.update(
            {
              ...budgetData,
              amount: budgetData.amount + (Transaction.amount - amount),
            },
            { where: { id: budgetData.id } }
          );
        }
      }
    } catch (err) {
      next(err);
    }
  }

  static async delete(req, res, next) {
    try {
      const { id } = req.params;
      const transactionData = await Transaction.findByPk(id);
      const budgetData = await Budget.findByPk(transactionData.BudgetId);

      if (!transactionData) {
        throw { name: "NotFound" };
      } else {
        await Budget.update(
          {
            ...budgetData,
            amount: budgetData.amount + transactionData.amount,
          },
          { where: { id: budgetData.id } }
        );

        await Transaction.destroy({ where: { id } });
        res.status(200).json({ message: `Success delete data with ID ${id}` });
      }
    } catch (err) {
      next(err);
    }
  }
}

module.exports = TransactionController;
