const Sequelize = require("sequelize");
const DB = require("../config/db/db");

const Administrators = DB.define("Administrators", {
  first_name: {
    type: Sequelize.STRING,
  },
  last_name: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
  },
  avartar: {
    type: Sequelize.TEXT,
  },
  is_superAdmin: {
    type: Sequelize.BOOLEAN,
  },
});
module.exports = { Administrators };
