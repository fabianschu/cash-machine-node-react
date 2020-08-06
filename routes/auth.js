var express = require("express");
const bcrypt = require("bcrypt");
const Router = require("express-promise-router");
const db = require("../db");

const router = new Router();

/* GET users listing. */
router.post("/login", async (req, res, next) => {
  const { username, password } = req.body;
  const { rows } = await db.query("SELECT * FROM users WHERE username = $1", [
    username,
  ]);

  const user = rows[0];
  if (!user) return res.status(401).json("user doesnt exist");
  const hashedUserPassword = user.password;
  const success = await bcrypt.compare(password, hashedUserPassword);
  if (!success) return res.status(401).json("pw wrong");
  req.session.currentUser = user.id;
  return res.json({ id: req.session.currentUser });
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

router.use((req, res, next) => {
  // console.log(req);
  if (req.session.currentUser) {
    // <== if there's user in the session (user is logged in)
    next(); // ==> go to the next route ---
  } else {
    //    |
    res.status(401).json("not authorized"); //    |
  } //    |
}); // ------------------------------------

router.get("/authenticate", async (req, res, next) => {
  console.log("whaat");
  return res.json({ id: req.session.currentUser });
});

module.exports = router;
