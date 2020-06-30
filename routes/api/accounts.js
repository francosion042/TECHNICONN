const express = require("express");
const { check } = require("express-validator");
const router = express.Router();

/**
 * @SignUp takes accepts @email and @password in the request body
 * the user must enter a valid email,
 * must have a password more than 5 characters,
 */
router.post(
  "/accounts/signup",
  [
    check("email", "Enter a Valid email")
      .isEmail()
      .isLowercase()
      .not()
      .isEmpty(),
    check(
      "password",
      "Password should not be empty and must be more than 5"
    ).isLength({ min: 6 }),
  ],
  require("../../controllers/accounts/signUp")
);

/**
 * @SignIn takes accepts @email and @password in the request body
 */
router.post(
  "/accounts/signin",
  [
    check("email", "Enter a Valid email")
      .isEmail()
      .isLowercase()
      .not()
      .isEmpty(),
    check(
      "password",
      "Password should not be empty and must be more than 5"
    ).isLength({ min: 6 }),
  ],
  require("../../controllers/accounts/signIn")
);

module.exports = router;
