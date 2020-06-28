const Sequelize = require("sequelize");
const DB = require("../config/database/db");

const Users = DB.define("Users", {
  email: {
    type: Sequelize.STRING,
  },
  password: {
    type: Sequelize.STRING,
  },
});
module.exports = { Users };
