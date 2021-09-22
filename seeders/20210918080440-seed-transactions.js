"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Transactions",
      [
        {
          name: "Airplane Tickets",
          amount: 1000000,
          date: new Date("15 September 2021"),
          invoice:
            "https://ik.imagekit.io/ddtyiwgu4rm/invoice-kledo-1_ata2H5v8T-bk.jpg",
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
            "https://ik.imagekit.io/ddtyiwgu4rm/invoice-kledo-1_ata2H5v8T-bk.jpg",
          CategoryId: 5,
          BudgetId: 1,
          UserId: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Lunch",
          amount: 500000,
          date: new Date("30 September 2021"),
          invoice:
            "https://ik.imagekit.io/ddtyiwgu4rm/invoice-kledo-1_ata2H5v8T-bk.jpg",
          CategoryId: 4,
          BudgetId: 1,
          UserId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Dinner",
          amount: 500000,
          date: new Date("30 September 2021"),
          invoice:
            "https://ik.imagekit.io/ddtyiwgu4rm/invoice-kledo-1_ata2H5v8T-bk.jpg",
          CategoryId: 4,
          BudgetId: 1,
          UserId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Taxi",
          amount: 1000000,
          date: new Date("30 September 2021"),
          invoice:
            "https://ik.imagekit.io/ddtyiwgu4rm/invoice-kledo-1_ata2H5v8T-bk.jpg",
          CategoryId: 5,
          BudgetId: 1,
          UserId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Pay tax",
          amount: 9000000,
          date: new Date("10 July 2021"),
          invoice:
            "https://ik.imagekit.io/ddtyiwgu4rm/invoice-kledo-1_ata2H5v8T-bk.jpg",
          CategoryId: 6,
          BudgetId: 2,
          UserId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Pay tax",
          amount: 9000000,
          date: new Date("17 July 2021"),
          invoice:
            "https://ik.imagekit.io/ddtyiwgu4rm/invoice-kledo-1_ata2H5v8T-bk.jpg",
          CategoryId: 6,
          BudgetId: 2,
          UserId: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Gas Money",
          amount: 1000000,
          date: new Date("6 June 2021"),
          invoice:
            "https://ik.imagekit.io/ddtyiwgu4rm/invoice-kledo-1_ata2H5v8T-bk.jpg",
          CategoryId: 8,
          BudgetId: 3,
          UserId: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Toll Fee Cikampek",
          amount: 2500000,
          date: new Date("10 July 2021"),
          invoice:
            "https://ik.imagekit.io/ddtyiwgu4rm/invoice-kledo-1_ata2H5v8T-bk.jpg",
          CategoryId: 5,
          BudgetId: 3,
          UserId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Gas Money",
          amount: 500000,
          date: new Date("7 July 2021"),
          invoice:
            "https://ik.imagekit.io/ddtyiwgu4rm/invoice-kledo-1_ata2H5v8T-bk.jpg",
          CategoryId: 8,
          BudgetId: 3,
          UserId: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        ////////
        {
          name: "Youtube Advertisement",
          amount: 3000000,
          date: new Date("17 September 2021"),
          invoice:
            "https://ik.imagekit.io/ddtyiwgu4rm/invoice-kledo-1_ata2H5v8T-bk.jpg",
          CategoryId: 1,
          BudgetId: 6,
          UserId: 6,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Instagram Advertisement",
          amount: 5000000,
          date: new Date("12 September 2021"),
          invoice:
            "https://ik.imagekit.io/ddtyiwgu4rm/invoice-kledo-1_ata2H5v8T-bk.jpg",
          CategoryId: 1,
          BudgetId: 6,
          UserId: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "TV Advertisement",
          amount: 4000000,
          date: new Date("23 September 2021"),
          invoice:
            "https://ik.imagekit.io/ddtyiwgu4rm/invoice-kledo-1_ata2H5v8T-bk.jpg",
          CategoryId: 1,
          BudgetId: 6,
          UserId: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Public Transport",
          amount: 500000,
          date: new Date("23 September 2021"),
          invoice:
            "https://ik.imagekit.io/ddtyiwgu4rm/invoice-kledo-1_ata2H5v8T-bk.jpg",
          CategoryId: 5,
          BudgetId: 6,
          UserId: 6,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Transportation",
          amount: 1000000,
          date: new Date("11 September 2021"),
          invoice:
            "https://ik.imagekit.io/ddtyiwgu4rm/invoice-kledo-1_ata2H5v8T-bk.jpg",
          CategoryId: 5,
          BudgetId: 7,
          UserId: 6,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Lunch",
          amount: 2500000,
          date: new Date("13 September 2021"),
          invoice:
            "https://ik.imagekit.io/ddtyiwgu4rm/invoice-kledo-1_ata2H5v8T-bk.jpg",
          CategoryId: 4,
          BudgetId: 7,
          UserId: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Dinner",
          amount: 3000000,
          date: new Date("13 September 2021"),
          invoice:
            "https://ik.imagekit.io/ddtyiwgu4rm/invoice-kledo-1_ata2H5v8T-bk.jpg",
          CategoryId: 4,
          BudgetId: 7,
          UserId: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Taxi",
          amount: 1000000,
          date: new Date("8 November 2021"),
          invoice:
            "https://ik.imagekit.io/ddtyiwgu4rm/invoice-kledo-1_ata2H5v8T-bk.jpg",
          CategoryId: 5,
          BudgetId: 7,
          UserId: 6,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Public Transport",
          amount: 1000000,
          date: new Date("16 April 2021"),
          invoice:
            "https://ik.imagekit.io/ddtyiwgu4rm/invoice-kledo-1_ata2H5v8T-bk.jpg",
          CategoryId: 5,
          BudgetId: 8,
          UserId: 6,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Accomodation",
          amount: 2000000,
          date: new Date("24 April 2021"),
          invoice:
            "https://ik.imagekit.io/ddtyiwgu4rm/invoice-kledo-1_ata2H5v8T-bk.jpg",
          CategoryId: 10,
          BudgetId: 8,
          UserId: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Training Cost",
          amount: 3000000,
          date: new Date("6 May 2021"),
          invoice:
            "https://ik.imagekit.io/ddtyiwgu4rm/invoice-kledo-1_ata2H5v8T-bk.jpg",
          CategoryId: 7,
          BudgetId: 8,
          UserId: 6,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Lunch",
          amount: 2000000,
          date: new Date("8 May 2021"),
          invoice:
            "https://ik.imagekit.io/ddtyiwgu4rm/invoice-kledo-1_ata2H5v8T-bk.jpg",
          CategoryId: 3,
          BudgetId: 8,
          UserId: 6,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Dinner",
          amount: 2000000,
          date: new Date("8 May 2021"),
          invoice:
            "https://ik.imagekit.io/ddtyiwgu4rm/invoice-kledo-1_ata2H5v8T-bk.jpg",
          CategoryId: 3,
          BudgetId: 8,
          UserId: 5,
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
