const jwt = require("jsonwebtoken");

const createToken = function (payload) {
  return jwt.sign(payload, process.env.JWT_SECRET);
};

const verifyToken = function (token) {
  return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = { createToken, verifyToken };
