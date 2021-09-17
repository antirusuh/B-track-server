const jwt = require('jsonwebtoken');

const JWTSecret = process.env.JWT_SECRET

function signJWT(payload) {
    return jwt.sign(payload, JWTSecret)
}

function verifyJWT(access_token) {
    return jwt.verify(access_token, JWTSecret)
}

module.exports = {
    signJWT,
    verifyJWT
}