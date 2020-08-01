var express = require("express");
var router = express.Router();
const auth = require("./auth");
const customers = require("./customers");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

module.exports = (app) => {
  app.use("/api/auth", auth);
  app.use("/api/customers", customers);
};
