const authzManagerDepartment = async function (req, res, next) {
  try {
    if (req.user.role !== "manager_department") {
      throw { name: "NotAuthorized" };
    }

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = authzManagerDepartment;
