const jwt = require("jsonwebtoken");
const env = require("./config/env");

const generateToken = (payload) => {
    return jwt.sign(payload, env.jwt.secretKey, { expiresIn: env.jwt.expiresIn || "1d" });
};

const verifyToken = (token) => {
    return jwt.verify(token, env.jwt.secretKey);
};

module.exports = {
    generateToken,
    verifyToken
}