const express = require("express");
const app = express();
require("./config/db/db");
require("./models/index");
require("dotenv/config");
/**
 * The syncDB variable has a .CreateTables and a .DropTables function.
 * each should be run depending on the need
 */
const syncDB = require("./models/sync/syncDB");
syncDB.CreateTables();
// syncDB.DropTables();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server Started on Port ${PORT}`);
});
