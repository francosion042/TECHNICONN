const { CSP_Profiles } = require("../../models/CSP");
const { Users } = require("../../models/Users");
const { validationResult } = require("express-validator");
/**
 * @description function for the ISP profile creation
 * @param {Object} req
 * @param {Object} res
 */
const createProfile = async (req, res) => {
  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  // get the form fields from the request body
  const { name, email, short_bio, category, about_company, reg_no } = req.body;

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
  if (!csp) {
    /**
     * @description Check if the user added a profile image
     */
    let avatar = req.files.avatar ? req.files.avatar[0].path : "";
    let cover_photo = req.files.cover_photo
      ? req.files.cover_photo[0].path
      : "";
    // Create the record and insert to database
    CSP_Profiles.create({
      name: name,
      email: email,
      avatar: avatar,
      cover_photo: cover_photo,
      short_bio: short_bio,
      category: category,
      about_company: about_company,
      reg_no: reg_no,
      user_id: user.dataValues.id,
    })
      .then((csp) => {
        // send response
        res.status(201).json({
          message: "CSP profile Created Successfully",
          data: {
            isp: csp.dataValues,
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
      message: "Account Already has an CSP Profile",
    });
  }
};

module.exports = createProfile;
