const bcrypt = require('bcryptjs');

function hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8))
}

function comparePassword(stringPassword, hashedPassword) {
    return bcrypt.compareSync(stringPassword, hashedPassword)
}

module.exports = {
    hashPassword,
    comparePassword
}