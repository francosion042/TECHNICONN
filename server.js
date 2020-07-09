const express = require("express");
const bodyParser = require("body-parser");
require("./config/services/cloudinaryConfig");
const cors = require("cors");
// const expressFileUpload = require("express-fileupload");
const app = express();
require("./config/database/db");
require("./models/index");
require("dotenv/config");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/**
 * @description calling the Cloudinary middleware
 */
// app.use("*", cloudinaryConfig);

// app.use(cors());

// app.use(expressFileUpload());
/**
 * The syncDB variable has a .CreateTables and a .DropTables function.
 * each should be run depending on the need
 */

const syncDB = require("./models/sync/syncDB");
// syncDB.CreateTables();
// syncDB.DropTables();

// The base route that introduces other routes
app.get("/api/v1", (req, res) => {
  res.status(200).json({
    message: "Welcome to TechniConn",
  });
});

/**
 * @description Account creation route
 * @params req and res
 */
app.use("/api/v1", require("./routes/api/accounts"));

/**
 * @description user profile creation route
 */
app.use("/api/v1", require("./routes/api/users"));

/**
 * @description ISP profile creation route
 */
app.use("/api/v1", require("./routes/api/isp"));

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server Started on Port ${PORT}`);
});
