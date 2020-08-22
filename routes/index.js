var express = require("express");
var router = express.Router();
const auth = require("./auth");
const customers = require("./customers");
const projects = require("./projects");
const userProfiles = require("./userProfiles");
const invoices = require("./invoices");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

module.exports = (app) => {
  app.use("/api/auth", auth);
  app.use("/api/customers", customers);
  app.use("/api/projects", projects);
  app.use("/api/user_profiles", userProfiles);
  app.use("/api/invoices", invoices);
};
