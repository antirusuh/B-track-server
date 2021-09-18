"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Budgets",
      [
        {
          name: "Transportation and accomodation budget",
          amount: 15000000,
          initial_amount: 20000000,
          date: new Date("1 September 2021"),
          due_date: new Date("1 October 2021"),
          status: "Approved",
          DepartmentId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Office Stationery Equipments Budget",
          amount: 10000000,
          initial_amount: 10000000,
          date: new Date("1 January 2021"),
          due_date: new Date("1 March 2021"),
          status: "Unapproved",
          DepartmentId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Health & Fitness Budget",
          amount: 30000000,
          initial_amount: 30000000,
          date: new Date("15 April 2021"),
          due_date: new Date("15 June 2021"),
          status: "Rejected",
          DepartmentId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Budgets", null, {});
  },
};
