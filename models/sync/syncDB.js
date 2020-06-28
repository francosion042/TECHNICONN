const DB = require("../../config/db/db");

/**
 * Snchronizing the Tables with the database
 * @Snchronization of the tables starts running the function from top to bottom,
 * this means that the tasks to be done should be placed in order in which they should be
 */
const CreateTables = () => {
  DB.sync({ force: true })
    .then(() => {
      console.log("Database Tables Created From Models");
    })
    .catch((err) => {
      console.log(err);
    });
};

const DropTables = () => {
  DB.drop({ force: true })
    .then(() => {
      console.log("Database Tables Deleted");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = { CreateTables, DropTables };
