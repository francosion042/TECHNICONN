const { ISP_Profiles } = require("../../models/ISP");
const { Users } = require("../../models/Users");
const { validationResult } = require("express-validator");
const { dataUri } = require("../../middlewares/multerUpload");
const { uploader } = require("../../config/services/cloudinaryConfig");
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
   * @description Check if the Account already has a user profile.
   * if not,  then create one, else, reject
   */
  const isp = await ISP_Profiles.findOne({
    where: {
      user_id: user.dataValues.id,
    },
  });
  if (!isp) {
    /**
     * @description Check if the user added a profile image
     */
    let image;
    if (req.file) {
      const file = dataUri(req).content;
      const imageLink = await uploader.upload(file);
      image = imageLink.url;
    } else {
      image = "";
    }
    // Create the record and insert to database
    Users.create({
      first_name: first_name,
      last_name: last_name,
      email: email,
      gender: gender,
      mobile: mobile,
      avatar: image,
      cover_photo: "",
      short_bio: short_bio,
      category: category,
      address: address,
      city: city,
      state: state,
      nationality: nationality,
      long_bio: long_bio,
      user_id: user.dataValues.id,
    })
      .then((isp) => {
        // send response
        res.status(201).json({
          message: "ISP profile Created Successfully",
          data: {
            isp: isp.dataValues,
          },
        });
      })
      .catch((err) => {
        res.status(500).json({
          message: "an Error occured",
        });
      });
  } else {
    res.status(401).json({
      message: "Account Already has an ISP Profile",
    });
  }
};

module.exports = createProfile;
