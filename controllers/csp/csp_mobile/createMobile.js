const { CSP_Profiles, CSP_Mobiles } = require("../../../models/CSP");
const { Users } = require("../../../models/Users");
const { validationResult } = require("express-validator");
/**
 * @description function for the ISP profile creation
 * @param {Object} req
 * @param {Object} res
 */
const createAddress = async (req, res) => {
  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const { mobile } = req.body;

  // Get the accountId from the Token payload
  const { accountId } = req.user;

  // Get the user profile, so as to extract the user id
  const user = await Users.findOne({
    where: {
      account_id: accountId,
    },
  });

  /**
   * @description Check if the Account already has a user profile.
   * if not,  then create one, else, reject
   */
  const csp = await CSP_Profiles.findOne({
    where: {
      user_id: user.dataValues.id,
    },
  });
  if (csp) {
    CSP_Mobiles.create({
      mobile: mobile,
      csp_id: csp.dataValues.id,
    })
      .then((mobile) => {
        // send response
        res.status(201).json({
          message: "CSP profile Address Created Successfully",
          data: {
            address: mobile.dataValues,
          },
        });
      })
      .catch((err) => {
        res.status(500).json({
          message: "an Error occured",
          error: err,
        });
      });
  } else {
    res.status(401).json({
      message: "Account doesn't have a CSP Profile",
    });
  }
};
