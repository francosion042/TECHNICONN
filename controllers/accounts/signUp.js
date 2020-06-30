const { Accounts } = require("../../models");
const { hashPassword, generateToken } = require("../../utils");
const { validationResult } = require("express-validator");
/**
 * Function for signining up
 * @param {object} req
 * @param {object} res
 */
const signUp = async (req, res) => {
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
   * If the Account is not on the database yet:
   * Hash the Password and then create a new record
   */
  if (!account) {
    const hashedpassword = hashPassword(password);

    // Create the record and insert into the database
    Accounts.create({
      email: email,
      password: hashedpassword,
    })
      .then(async (newAccount) => {
        // Generate token for the new account
        const token = await generateToken({
          accountId: newAccount.dataValues.id,
          accountEmail: newAccount.dataValues.email,
        });
        res.status(201).json({
          message: "Account created",
          data: {
            accountId: newAccount.dataValues.id,
            accountEmail: newAccount.dataValues.email,
            token: token,
          },
        });
      })
      .catch((err) => {
        res.json({
          message: err,
        });
      });
  } else {
    // if the email is already in the database
    res.status(403).json({
      message: "Account Already exists",
    });
  }
};

module.exports = signUp;
