const cron = require("node-cron");
const sendMail = require("./nodemailer");
const { User } = require("../models");

const dailyReminder = function () {
  console.log("starting cron");
  cron.schedule("0 5 * * *", async () => {
    console.log("running cron");
    try {
      const userData = await User.findAll();
      userData.forEach((el) => {
        sendMail(
          el.email,
          "Daily Reminder",
          "Don't forget to put in your transactions today!",
          "<h1>Don't forget to put in your transactions today!</h1>"
        );
      });
      console.log("Daily reminder email sent");
    } catch (err) {
      console.log(err);
    }
  });
};

module.exports = dailyReminder;
