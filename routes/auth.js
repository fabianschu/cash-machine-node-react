var express = require("express");
const bcrypt = require("bcrypt");
const Router = require("express-promise-router");
const db = require("../db");

const router = new Router();

/* GET users listing. */
router.post("/login", async (req, res, next) => {
  const { username, password } = req.body;
  const { rows } = await db.query(
    'SELECT * FROM "users" WHERE "username" = $1',
    [username]
  );
  const user = rows[0];
  const hashedUserPassword = user.password;

  const success = await bcrypt.compare(password, hashedUserPassword);
  if (!success) return res.json("Wrong credentials");

  req.session.currentUser = user;
  res.json("credentials ok :)");
});

/* GET users listing. */
router.get("/logout", async (req, res, next) => {
  req.session.destroy((err) => {
    // cannot access session here
    res.json("logged out");
  });
});

/* POST user . */
router.post("/signup", async (req, res, next) => {
  console.log(req);
  const { username, password } = req.body;
  const salt = await bcrypt.genSalt();
  const hash = await bcrypt.hash(password, salt);
  const {
    rows,
  } = await db.query(
    'INSERT INTO "users" ("username", "password") VALUES ($1, $2) RETURNING id',
    [username, hash]
  );
  res.json("success");
});

module.exports = router;
