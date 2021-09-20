const { Department } = require("../models");

class DepartmentController {
  static async findAll(req, res, next) {
    try {
      const data = await Department.findAll();
      res.status(200).json(data);
    } catch (error) {
      next(err);
    }
  }
}

module.exports = DepartmentController;
