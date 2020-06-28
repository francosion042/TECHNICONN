const { Sequelize } = require("sequelize");
require("dotenv/config");

// getting the environment variables
const db_name = process.env.DB_NAME;
const db_user = process.env.DB_USER;
const db_password = process.env.DB_PASSWORD;
const db_host = process.env.DB_HOST;

/**
 * Connection to the database.
 */
const DB = new Sequelize(db_name, db_user, db_password, {
  host: db_host,
  dialect: "postgres",
  operatorsAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

/**
 * Authentication of the database
 */
DB.authenticate()
  .then(() => {
    console.log(`Database Connected on ${db_host}`);
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = DB;
