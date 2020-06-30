const DB = require("../../config/database/db");
const { Accounts } = require("../../models");
const { comparePassword } = require("../../utils");
const { validationResult } = require("express-validator");

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
      console.log("signed In");
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
