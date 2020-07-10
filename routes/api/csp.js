const express = require("express");
const { check } = require("express-validator");
const router = express.Router();
const { auth } = require("../../middlewares/authenticate");
const { parser } = require("../../config/services/cloudinaryConfig");

/**
 * @description To create an CSP profile
 * @method POST
 */
router.post(
  "/csp/create",
  auth,
  parser.fields([{ name: "avatar" }, { name: "cover_photo" }]),
  [check("name", "Must not be empty").notEmpty()],
  require("../../controllers/csp/createProfile")
);

/**
 * @description To update an CSP profile
 * @method UPDATE
 */
router.put(
  "/csp/create",
  auth,
  parser.fields([{ name: "avatar" }, { name: "cover_photo" }]),
  [check("name", "Must not be empty").notEmpty()],
  require("../../controllers/csp/updateProfile")
);

module.exports = router;
