"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Budget extends Model {
    static associate(models) {
      Budget.hasMany(models.Transaction);
      Budget.belongsTo(models.Department);
    }
  }
  Budget.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Name required",
          },
        },
      },
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Amount required",
          },
          isNumeric: {
            msg: "Must be a number",
          },
        },
      },
      initial_amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Amount required",
          },
          isNumeric: {
            msg: "Must be a number",
          },
        },
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Date required",
          },
          isDate: {
            msg: "Must be a date",
          },
        },
      },
      due_date: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Due date required",
          },
          isDate: {
            msg: "Must be a date",
          },
        },
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Status required",
          },
        },
      },
      DepartmentId: DataTypes.INTEGER,
    },
    {
      hooks: {
        beforeCreate: (instance) => {
          instance.intial_amount = instance.amount;
        },
      },
      sequelize,
      modelName: "Budget",
    }
  );
  return Budget;
};
