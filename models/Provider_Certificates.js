const Sequelize = require("sequelize");
const DB = require("../config/db/db");

const Provider_Certificates = DB.define("Provider_Certificates", {
  title: {
    type: Sequelize.STRING,
  },
  issued_by: {
    type: Sequelize.STRING,
  },
  cert_date: {
    type: Sequelize.DATE,
  },
  expiry_date: {
    type: Sequelize.DATE,
  },
});
module.exports = { Provider_Certificates };
