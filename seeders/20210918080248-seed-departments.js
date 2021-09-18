"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Departments",
      [
        {
          name: "Finance",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        { name: "Logistics", createdAt: new Date(), updatedAt: new Date() },
        { name: "Business", createdAt: new Date(), updatedAt: new Date() },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Departments", null, {});
  },
};
