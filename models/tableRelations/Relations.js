/**
 * This file is for creating relationships.
 */
const {
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
} = require("../index");

/**
 * @Accounts can only have one @User or @Administrator at a time
 */
Accounts.hasOne(Users, {
  foreignKey: "account_id",
  onDelete: "CASCADE",
});
Accounts.hasOne(Administrators, {
  foreignKey: "account_id",
  onDelete: "CASCADE",
});
/**
 * @ISP_Profile has a child relationship to the @Users
 * @ISP_Profile has many children of @ISP_Education
 * @ISP_Profile has many children of @ISP_Work_Experience
 * @ISP_Profile has many children of @Skills
 */
Users.hasOne(ISP_Profiles, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});
ISP_Educations.belongsTo(ISP_Profiles, {
  foreignKey: "isp_id",
  onDelete: "CASCADE",
});
ISP_Work_Experiences.belongsTo(ISP_Profiles, {
  foreignKey: "isp_id",
  onDelete: "CASCADE",
});
Skills.belongsTo(ISP_Profiles, {
  foreignKey: "isp_id",
  onDelete: "CASCADE",
});

/**
 * @CSP_Profile has a child relationship to the @Users
 * @CSP_Profile has many children of @ISP_Address
 * @CSP_Profile has many children of @ISP_Mobile
 * @CSP_Profile has many children of @ISP_Work_Experience
 */
Users.hasOne(CSP_Profiles, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});
CSP_Addresses.belongsTo(CSP_Profiles, {
  foreignKey: "csp_id",
  onDelete: "CASCADE",
});
CSP_Mobiles.belongsTo(CSP_Profiles, {
  foreignKey: "csp_id",
  onDelete: "CASCADE",
});
CSP_Work_Experiences.belongsTo(CSP_Profiles, {
  foreignKey: "csp_id",
  onDelete: "CASCADE",
});

/**
 * @User can only have one @Administrator profile, if A @SuperAdmin wishes to make the user an admin
 */
Users.hasOne(Administrators, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

/**
 * @ISP_Profile can have many @Picture_Uploads
 * @CSP_Profile can have many @Picture_Uploads
 */
Picture_Uploads.belongsTo(ISP_Profiles, {
  foreignKey: "isp_id",
  onDelete: "CASCADE",
});
Picture_Uploads.belongsTo(CSP_Profiles, {
  foreignKey: "csp_id",
  onDelete: "CASCADE",
});

/**
 * @ISP_Profile can have many @Provider_Certs
 * @CSP_Profile can have many @Provider_Certs
 */
Provider_Certificates.belongsTo(ISP_Profiles, {
  foreignKey: "isp_id",
  onDelete: "CASCADE",
});
Provider_Certificates.belongsTo(CSP_Profiles, {
  foreignKey: "csp_id",
  onDelete: "CASCADE",
});

/**
 * @ISP_Profile can have many @Portfolios
 * @CSP_Profile can have many @Portfolios
 */
Portfolios.belongsTo(ISP_Profiles, {
  foreignKey: "isp_id",
  onDelete: "CASCADE",
});
Portfolios.belongsTo(CSP_Profiles, {
  foreignKey: "csp_id",
  onDelete: "CASCADE",
});
