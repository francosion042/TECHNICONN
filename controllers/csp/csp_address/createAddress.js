const { CSP_Profiles, CSP_Addresses } = require("../../../models/CSP");
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

  const { street, city, zip_code, state, country, is_headquarters } = req.body;

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
    CSP_Addresses.create({
      street: street,
      city: city,
      zip_code: zip_code,
      state: state,
      country: country,
      is_headquarters: is_headquarters,
      csp_id: csp.dataValues.id,
    })
      .then((address) => {
        // send response
        res.status(201).json({
          message: "CSP profile Address Created Successfully",
          data: {
            address: address.dataValues,
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
