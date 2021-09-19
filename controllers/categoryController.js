const { Category } = require("../models");

class CategoryController {
  static async findAlll(req, res, next) {
    try {
      const data = await Category.findAlll();
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = CategoryController;
