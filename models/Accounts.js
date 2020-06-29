const Sequelize = require("sequelize");
const DB = require("../config/database/db");

const Accounts = DB.define("Accounts", {
  email: {
    type: Sequelize.STRING,
  },
  password: {
    type: Sequelize.TEXT,
  },
});
module.exports = { Accounts };
