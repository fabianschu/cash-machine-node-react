const createError = require("http-errors");
const express = require("express");
const path = require("path");
const session = require("express-session");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const { client, conString } = require("./db/index");
const cors = require("cors");
const mountRoutes = require("./routes");
const pgSession = require("connect-pg-simple")(session);
require("dotenv").config();

var app = express();

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000"],
  })
);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "/client/build")));

// session management
app.use(
  session({
    store: new pgSession({
      conString,
    }),
    secret: "very secret secret",
    resave: false,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }, // 30 days
    saveUninitialized: false,
  })
);

if (process.env.NODE_ENV === "production") {
  // Serve any static files
  app.use(express.static(path.join(__dirname, "/client/build")));
  // Handle React routing, return all requests to React app
  app.get("/*", function (req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

// mount all routes
mountRoutes(app);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  console.log(err.message);
  res.locals.error = req.app.get("env") === "development" ? err : {};
  console.log("damn an error");
  // render the error page
  res.status(err.status || 500);
  // res.json(err.message);
});

module.exports = app;
