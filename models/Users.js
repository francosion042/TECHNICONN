const Sequelize = require("sequelize");
const DB = require("../config/database/db");

const Users = DB.define("Users", {
  first_name: {
    type: Sequelize.STRING,
  },
  last_name: {
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
});
module.exports = { Users };
