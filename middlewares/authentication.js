const { User } = require("../models");
const { verifyToken } = require("../helpers/jsonwebtoken");

async function authentication(req, res, next) {
  const { access_token } = req.headers;

  try {
    let { id } = verifyToken(access_token);

    const user = await User.findOne({
      where: {
        id,
      },
    });

    if (!user) {
      throw {
        name: "InvalidToken",
      };
    } else {
      req.user = {
        id: user.id,
        username: user.username,
        role: user.role,
        DepartmentId: user.DepartmentId,
      };
      next();
    }
  } catch (err) {
    next(err);
  }
}

module.exports = authentication;
