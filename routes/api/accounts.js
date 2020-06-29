const express = require("express");
const router = express.Router();

/**
 * @SignUp takes accepts @email and @password in the request body
 */
router.post("/accounts/signup", (req, res) => {});

/**
 * @SignIn takes accepts @email and @password in the request body
 */
router.post("/accounts/signin", (req, res) => {});

module.exports = router;
