const cron = require("node-cron");
const sendMail = require("./nodemailer");
const { User, Budget, Transaction } = require("../models");

const aWeekLeftReminder = function () {
  console.log("starting cron");
  // scheduled for 10.00 am every day (GMT+7)
  cron.schedule("0 3 * * *", async () => {
    console.log("running cron");
    try {
      const allBudgets = await Budget.findAll({
        include: [{ model: Transaction }],
      });

      allBudgets.forEach((el) => {
        if (el.due_date - new Date() <= 604800000) {
          const manager = User.findOne({
            where: {
              DepartmentId: el.DepartmentId,
              role: "manager_department",
            },
          });

          sendMail(
            manager.email,
            "Budget Report",
            `There are less than 7 days left to due date for ${el.name}`,
            `<h1>There is Rp ${el.amount} left (${
              (el.amount / el.initial_amount) * 100
            }%)</h1>
            <h3>Currently there are ${
              el.Transactions.length
            } transactions with a total spending of ${
              el.initial_amount - el.amount
            }<h3/>
            `
          );
        }
      });
    } catch (err) {
      console.log(err);
    }
  });
};

module.exports = aWeekLeftReminder;
