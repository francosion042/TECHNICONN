const Sequelize = require("sequelize");
const DB = require("../config/database/db");

const CSP_Profiles = DB.define("CSP_Profiles", {
  name: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
  },
  avatar: {
    type: Sequelize.TEXT,
  },
  cover_photo: {
    type: Sequelize.TEXT,
  },
  short_bio: {
    type: Sequelize.TEXT,
  },
  category: {
    type: Sequelize.STRING,
  },
  about_company: {
    type: Sequelize.TEXT,
  },
  reg_no: {
    type: Sequelize.STRING,
  },
});

const CSP_Addresses = DB.define("CSP_Addresses", {
  street: {
    type: Sequelize.TEXT,
  },
  city: {
    type: Sequelize.STRING,
  },
  zip_code: {
    type: Sequelize.STRING,
  },
  state: {
    type: Sequelize.STRING,
  },
  country: {
    type: Sequelize.STRING,
  },
  is_headquarters: {
    type: Sequelize.BOOLEAN,
  },
});

const CSP_Mobiles = DB.define("CSP_Mobiles", {
  mobile: {
    type: Sequelize.STRING,
  },
});

const CSP_Work_Experiences = DB.define("CSP_Work_Experiences", {
  role: {
    type: Sequelize.STRING,
  },
  descrption: {
    type: Sequelize.STRING,
  },
  start_date: {
    type: Sequelize.DATE,
  },
  end_date: {
    type: Sequelize.DATE,
  },
});
module.exports = {
  CSP_Profiles,
  CSP_Addresses,
  CSP_Mobiles,
  CSP_Work_Experiences,
};
