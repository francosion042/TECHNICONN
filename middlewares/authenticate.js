const { verifyToken, errorResponse } = require("../utils/jwt");
/**
 * Verify if token is valid
 * @param  {object} req - The user request object
 * @param  {object} res - The user res response object
 * @param  {function} next - The next() Function
 * @returns {String} req.userId - The user id
 */
const auth = async (req, res, next) => {
  try {
    const {
      headers: { authorization },
    } = req;
    if (authorization === undefined) throw new Error("no auth");
    const token = authorization.split(" ")[1];
    if (!token || token === "") {
      return errorResponse(res, 401, "Access denied");
    }
    const decoded = await verifyToken(token);
    if (!(decoded && decoded.accountId)) {
      return errorResponse(res, 401, "Access denied. We could not verify user");
    }
    req.user = decoded;
    return next();
  } catch (error) {
    if (error.message === "no auth" || error.message === "jwt expired") {
      return errorResponse(res, 401, "Authorization failed");
    }
    return errorResponse(res, 500, "Server error");
  }
};

module.exports = { auth };
