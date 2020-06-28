const Sequelize = require("sequelize");
const DB = require("../config/database/db");

const Skills = DB.define("Skills", {
  skill_title: {
    type: Sequelize.STRING,
  },
});
module.exports = { Skills };
