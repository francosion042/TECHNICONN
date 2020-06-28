const Sequelize = require("sequelize");
const DB = require("../config/database/db");

const Client_Profiles = DB.define("Client_Profiles", {
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
    type: Sequelize.STRING,
  },
  short_bio: {
    type: Sequelize.TEXT,
  },
  address: {
    type: Sequelize.STRING,
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
});

module.exports = { Client_Profiles };
