require("dotenv/config");
const jwt = require("jsonwebtoken");

// secret key
const secretKey = process.env.JWT_SECRET;

/**
 * @function generateToken
 * @description Method to generate new token
 * @param {object} payload - The data used to generate the token
 * @param {string} secret - The secret key used to generate the token
 * @returns {string} the generated token
 */
const generateToken = async (payload, secret = secretKey) => {
  const token = await jwt.sign(payload, secret);
  return token;
};

/**
 * @method verifyToken
 * @description Method to decode the token
 * @param {string} token - The token to be verified
 * @param {string} secret - The secret key used to generate the token
 * @returns {object} the payload decoded from the token
 */
const verifyToken = async (token, secret = secretKey) => {
  const decoded = await jwt.verify(token, secret);
  return decoded;
};

module.exports = { generateToken, verifyToken };
