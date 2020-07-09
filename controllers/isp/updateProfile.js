const { ISP_Profiles } = require("../../models/ISP");
const { Users } = require("../../models/Users");
const { validationResult } = require("express-validator");
/**
 * @description function for the ISP profile creation
 * @param {Object} req
 * @param {Object} res
 */
const updateProfile = async (req, res) => {
  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  // get the form fields from the request body
  const {
    first_name,
    last_name,
    email,
    gender,
    mobile,
    short_bio,
    category,
    address,
    city,
    state,
    nationality,
    long_bio,
  } = req.body;

  // Get the accountId from the Token payload
  const { accountId } = req.user;

  // Get the user profile, so as to extract the user id
  const user = await Users.findOne({
    where: {
      account_id: accountId,
    },
  });
  /**
   * @description Check if the profile exists
   */
  const isp = await ISP_Profiles.findOne({
    where: {
      user_id: user.dataValues.id,
    },
  });
  /**
   * @If the profile exists, then update it
   * @else throw an error
   */
  if (isp) {
    /**
     * @description Check if the user added a profile image
     */
    let avatar = req.files.avatar ? req.files.avatar[0].path : "";
    let cover_photo = req.files.cover_photo
      ? req.files.cover_photo[0].path
      : "";

    // Create the record and insert to database
    ISP_Profiles.update(
      {
        first_name: first_name,
        last_name: last_name,
        email: email,
        gender: gender,
        mobile: mobile,
        avatar: avatar,
        cover_photo: cover_photo,
        short_bio: short_bio,
        category: category,
        address: address,
        city: city,
        state: state,
        nationality: nationality,
        long_bio: long_bio,
        user_id: user.dataValues.id,
      },
      {
        where: {
          user_id: user.dataValues.id,
        },
        returning: true,
      }
    )
      .then((isp) => {
        /**
         * @description Responce in json
         * @type an array of(1) the number of affected rows, (2) the returned updated element in an array
         */
        res.status(201).json({
          message: "ISP profile Updated Successfully",
          data: {
            isp: isp[1][0].dataValues,
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
    res.status(500).json({
      message: "Profile Does not exist",
    });
  }
};

module.exports = updateProfile;
