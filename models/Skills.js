const Sequelize = require("sequelize");
const DB = require("../config/db/db");

const Skills = DB.define("Skills", {
  skill_title: {
    type: Sequelize.STRING,
  },
});
module.exports = { Skills };
