const jwt = require("jsonwebtoken");

const createToken = function (payload) {
  return jwt.sign(payload, process.env.JWT_SECRET);
};

const verifyToken = function (token) {
  return jwt.verify(token, process.env.JWT_SECRET);
};
// const token = createToken({
//   id: 1,
//   email: "manager_finance@mail.com",
// });

// console.log(token);

module.exports = { createToken, verifyToken };
