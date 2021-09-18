"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Transactions",
      [
        {
          name: "Airplane Tickets",
          amount: 3000000,
          date: new Date("15 September 2021"),
          invoice:
            "https://cdn.vertex42.com/ExcelTemplates/Images/invoices/basic-invoice-template.png",
          CategoryId: 5,
          BudgetId: 1,
          UserId: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Hotel Bill",
          amount: 2000000,
          date: new Date("23 September 2021"),
          invoice:
            "https://cdn.vertex42.com/ExcelTemplates/Images/invoices/basic-invoice-template.png",
          CategoryId: 5,
          BudgetId: 1,
          UserId: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Transactions", null, {});
  },
};
