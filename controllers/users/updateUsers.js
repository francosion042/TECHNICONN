const { Users } = require("../../models/Users");
const { validationResult } = require("express-validator");
// const { dataUri } = require("../../middlewares/multerUpload");
// const { uploader } = require("../../config/services/cloudinaryConfig");
/**
 * @descripion function for the user profile creation
 * @param {Object} req
 * @param {Object} res
 */
const updateUsers = async (req, res) => {
  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  // get the form fields from the request body
  const {
    first_name,
    last_name,
    gender,
    mobile,
    short_bio,
    address,
    city,
    state,
    nationality,
  } = req.body;

  // Get the accountId from the Token payload
  const { accountId } = req.user;

  /**
   * @description Check if the Account already has a user profile.
   * if not,  then create one, else, reject
   */
  const user = await Users.findOne({
    where: {
      account_id: accountId,
    },
  });
  if (user) {
    /**
     * @description Check if the user added a profile image
     */
    let image = req.file ? req.file.path : "";

    // Update the record and insert to database
    Users.update(
      {
        first_name: first_name,
        last_name: last_name,
        gender: gender,
        mobile: mobile,
        avatar: image,
        short_bio: short_bio,
        address: address,
        city: city,
        state: state,
        nationality: nationality,
        account_id: accountId,
      },
      {
        where: {
          account_id: accountId,
        },
        returning: true,
      }
    )
      .then((user) => {
        // send response
        res.status(201).json({
          message: "User profile Updated Successfully",
          data: {
            user: user[1][0].dataValues,
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
      message: "User Profile does not exist",
    });
  }
};

module.exports = updateUsers;
