const Sequelize = require("sequelize");
const DB = require("../config/db/db");

const Picture_Uploads = DB.define("Picture_Uploads", {
  caption: {
    type: Sequelize.TEXT,
  },
  picture: {
    type: Sequelize.TEXT,
  },
});
module.exports = { Picture_Uploads };
