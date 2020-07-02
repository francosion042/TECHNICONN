const express = require("express");
const { check } = require("express-validator");
const router = express.Router();
const { auth } = require("../../middlewares/authenticate");

/**
 * @description To create an ISP profile
 */
router.post(
  "/isp/create",
  auth,
  [
    check("first_name", "Must not be empty").notEmpty(),
    check("last_name", "Must not be empty").notEmpty(),
    check("mobile", "Must not be empty").notEmpty(),
  ],
  require("../../controllers/isp/createProfile")
);

module.exports = router;
