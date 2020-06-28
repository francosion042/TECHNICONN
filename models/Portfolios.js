const Sequelize = require("sequelize");
const DB = require("../config/database/db");

const Portfolios = DB.define("Portfolios", {
  title: {
    type: Sequelize.STRING,
  },
  description: {
    type: Sequelize.TEXT,
  },
  image: {
    type: Sequelize.TEXT,
  },
});

module.exports = { Portfolios };
