"use strict";
const { hashPassword } = require("../helpers/bcrypt");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          username: "manager_finance",
          email: "manager_finance@mail.com",
          password: hashPassword("abcde"),
          role: "manager_finance",
          DepartmentId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: "staff_finance",
          email: "staff_finance@mail.com",
          password: hashPassword("abcde"),
          role: "staff_finance",
          DepartmentId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: "manager_logistics",
          email: "manager_logistics@mail.com",
          password: hashPassword("abcde"),
          role: "manager_department",
          DepartmentId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: "staff_logistics",
          email: "staff_logistics@mail.com",
          password: hashPassword("abcde"),
          role: "staff_department",
          DepartmentId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: "manager_business",
          email: "manager_business@mail.com",
          password: hashPassword("abcde"),
          role: "manager_department",
          DepartmentId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: "staff_business",
          email: "staff_business@mail.com",
          password: hashPassword("abcde"),
          role: "staff_department",
          DepartmentId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
