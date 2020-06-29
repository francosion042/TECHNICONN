/**
 * This file will bring together all the files that is needed to get started with
 * the database and models
 */

const { Accounts } = require("./Accounts");
const { Users } = require("./Users");
const { Skills } = require("./Skills");
const { Picture_Uploads } = require("./Picture_Uploads");
const { Administrators } = require("./Administrators");
const { Provider_Certificates } = require("./Provider_Certificates");
const { Portfolios } = require("./Portfolios");
const { ISP_Educations, ISP_Profiles, ISP_Work_Experiences } = require("./ISP");
const {
  CSP_Addresses,
  CSP_Mobiles,
  CSP_Profiles,
  CSP_Work_Experiences,
} = require("./CSP");

module.exports = {
  Accounts,
  Users,
  Skills,
  Picture_Uploads,
  Administrators,
  Provider_Certificates,
  Portfolios,
  ISP_Profiles,
  ISP_Educations,
  ISP_Work_Experiences,
  CSP_Profiles,
  CSP_Addresses,
  CSP_Mobiles,
  CSP_Work_Experiences,
};

/**
 * This will make the file responsible for defining the relationship between the tables
 * visible in the application level.
 */
require("./tableRelations/Relations");
