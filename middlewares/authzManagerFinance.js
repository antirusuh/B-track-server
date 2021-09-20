const { Budget } = require("../models");

const authzManagerFinance = async function (req, res, next) {
  const budgetId = req.params.id;
  try {
    const data = await Budget.findByPk(budgetId);

    if (!data) {
      throw { name: "NotFound" };
    } else {
      if (req.user.role !== "manager_finance") {
        throw { name: "NotAuthorized" };
      }
    }

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = authzManagerFinance;
