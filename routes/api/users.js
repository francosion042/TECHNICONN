const express = require("express");
const { check } = require("express-validator");
const router = express.Router();
const { auth } = require("../../middlewares/authenticate");
const { parser } = require("../../config/services/cloudinaryConfig");

/**
 * Create User Profile Route
 * @Description The endpoint rout that creates the user profile after account creation
 */
router.post(
  "/users/create",
  auth,
  parser.single("avatar"),
  [
    check("first_name", "Must not be empty").notEmpty(),
    check("last_name", "Must not be empty").notEmpty(),
  ],
  require("../../controllers/users/createUsers")
);

/**
 * Update User Profile Route
 * @Description The endpoint rout that updates the user profile after account creation
 */
router.put(
  "/users/update",
  auth,
  parser.single("avatar"),
  [
    check("first_name", "Must not be empty").notEmpty(),
    check("last_name", "Must not be empty").notEmpty(),
  ],
  require("../../controllers/users/updateUsers")
);
module.exports = router;
