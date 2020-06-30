const { Accounts } = require("../../models");
const { comparePassword, generateToken } = require("../../utils");
const { validationResult } = require("express-validator");

/**
 * Authenticates a user
 * @param {object} req
 * @param {object} res
 */
const signIn = async (req, res) => {
  const { email, password } = req.body;

  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  // check if user already exists
  const account = await Accounts.findOne({
    where: {
      email: email,
    },
  });

  /**
   * If the account exists, then compare the password.
   * authenticate and give the user a token
   */
  if (account) {
    // Get the hashed password from the record
    const hashedPassword = account.dataValues.password;
    if (comparePassword(hashedPassword, password)) {
      /**
       * Generate a token for the user
       * It will Pass In the @AccountID and @AccountEmail as the Payload
       */
      const token = await generateToken({
        accountId: account.dataValues.id,
        accountEmail: account.dataValues.email,
      });
      res.status(200).json({
        message: "Successfully signed In",
        data: {
          accountId: account.dataValues.id,
          accountEmail: account.dataValues.email,
          token: token,
        },
      });
    } else {
      res.status(401).json({
        message: "Incorrect Password! Try again",
      });
    }
  } else {
    res.status(401).json({
      message: "You don't have an account, create one",
    });
  }
};

module.exports = signIn;
