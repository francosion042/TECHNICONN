const Sequelize = require("sequelize");
const DB = require("../config/database/db");

const ISP_Profiles = DB.define("ISP_Profiles", {
  first_name: {
    type: Sequelize.STRING,
  },
  last_name: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
  },
  gender: {
    type: Sequelize.STRING,
  },
  mobile: {
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
  address: {
    type: Sequelize.TEXT,
  },
  city: {
    type: Sequelize.STRING,
  },
  state: {
    type: Sequelize.STRING,
  },
  nationality: {
    type: Sequelize.STRING,
  },
  long_bio: {
    type: Sequelize.TEXT,
  },
});

const ISP_Educations = DB.define("ISP_Educations", {
  school: {
    type: Sequelize.STRING,
  },
  descipline: {
    type: Sequelize.STRING,
  },
  start_date: {
    type: Sequelize.DATE,
  },
  end_date: {
    type: Sequelize.DATE,
  },
});

const ISP_Work_Experiences = DB.define("ISP_Work_Experiences", {
  company: {
    type: Sequelize.STRING,
  },
  role: {
    type: Sequelize.STRING,
  },
  descrption: {
    type: Sequelize.TEXT,
  },
  start_date: {
    type: Sequelize.DATE,
  },
  end_date: {
    type: Sequelize.DATE,
  },
});

module.exports = { ISP_Profiles, ISP_Educations, ISP_Work_Experiences };
