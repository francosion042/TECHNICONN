const express = require("express");
const { check } = require("express-validator");
const router = express.Router();
const { auth } = require("../../middlewares/authenticate");

/**
 * Create User Profile Route
 * @Description The endpoint rout that creates the user profile after account creation
 */
router.post(
  "/users",
  auth,
  [
    check("first_name", "Must not be empty").notEmpty(),
    check("last_name", "Must not be empty").notEmpty(),
  ],
  require("../../controllers/users/createUsers")
);

module.exports = router;
