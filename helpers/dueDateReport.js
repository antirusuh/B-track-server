const cron = require("node-cron");
const sendMail = require("./nodemailer");
const { User, Budget, Transaction } = require("../models");
const { format } = require("date-fns");

const idrCurrency = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(number);
};

const dueDateReport = function () {
  // scheduled for 10.00 am every day (GMT+7)
  cron.schedule("0 3 * * *", async () => {
    console.log("running cron");
    try {
      const allBudgets = await Budget.findAll({
        include: [{ model: Transaction }],
      });
      const filtered = allBudgets.filter((el) => el.status === "Approved");
      filtered.forEach((el) => {
        if (el.due_date <= new Date()) {
          const manager = User.findOne({
            where: {
              DepartmentId: el.DepartmentId,
              role: "manager_department",
            },
          });

          sendMail(
            manager.email,
            `Budget Summary Report - ${el.name}`,
            `Budget Summary Report - ${el.name}`,
            `<div>
            <h1>There is ${idrCurrency(el.amount)} left (${
              (el.amount / el.initial_amount) * 100
            }% of total budget)</h1>
            <ul  style= "font-size: 20px;" >
              <li>There are ${el.Transactions.length} transactions</li>
              <li>Total spending: ${idrCurrency(
                el.initial_amount - el.amount
              )}</li>
              <li>Requested Amount: ${idrCurrency(el.initial_amount)}</li>
              <li>Budget Request Date: ${format(
                new Date(el.date),
                "d MMMM y"
              )}</li>
              <li>Budget Due Date: ${format(
                new Date(el.due_date),
                "d MMMM y"
              )}</li>
            </ul>
            <div/>
                `
          );
        }
      });
    } catch (err) {
      console.log(err);
    }
  });
};

module.exports = dueDateReport;
