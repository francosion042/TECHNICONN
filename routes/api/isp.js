const express = require("express");
const { check } = require("express-validator");
const router = express.Router();
const { auth } = require("../../middlewares/authenticate");
const { parser } = require("../../config/services/cloudinaryConfig");

/**
 * @description To create an ISP profile
 * @method POST
 */
router.post(
  "/isp/create",
  auth,
  parser.fields([{ name: "avatar" }, { name: "cover_photo" }]),
  [
    check("first_name", "Must not be empty").notEmpty(),
    check("last_name", "Must not be empty").notEmpty(),
    check("mobile", "Must not be empty").notEmpty(),
  ],
  require("../../controllers/isp/createProfile")
);

/**
 * @description To update an ISP profile
 * @method UPDATE
 */
router.put(
  "/isp/update",
  auth,
  parser.fields([{ name: "avatar" }, { name: "cover_photo" }]),
  [
    check("first_name", "Must not be empty").notEmpty(),
    check("last_name", "Must not be empty").notEmpty(),
    check("mobile", "Must not be empty").notEmpty(),
  ],
  require("../../controllers/isp/updateProfile")
);

module.exports = router;
