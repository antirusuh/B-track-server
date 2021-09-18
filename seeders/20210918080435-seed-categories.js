"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Categories",
      [
        {
          name: "Monthly",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Weekly",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Daily",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Food",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Transportation",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Tax",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Training",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Utility",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Emergency",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Others",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Categories", null, {});
  },
};
