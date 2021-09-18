const bcrypt = require("bcrypt");

const hashPassword = function (password) {
  return bcrypt.hashSync(password, 10);
};

const checkPassword = function (plainPassword, hashedPassword) {
  return bcrypt.compareSync(plainPassword, hashedPassword);
};

module.exports = { hashPassword, checkPassword };
