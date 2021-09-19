const authzFinance = async function (req, res, next) {
  try {
    const department = req.user.role.split("_")[1];

    if (department !== "finance") {
      throw { name: "NotAuthorized" };
    }

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = authzFinance;
