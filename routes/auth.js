const Router = require("express-promise-router");
const { eventEmitter } = require("../services/eventEmitter");
const bcrypt = require("bcrypt");
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
  const { username, password } = req.body;
  const salt = await bcrypt.genSalt();
  const hash = await bcrypt.hash(password, salt);
  const {
    rows,
  } = await db.query(
    'INSERT INTO "users" ("username", "password") VALUES ($1, $2) RETURNING id',
    [username, hash]
  );
  const userId = rows[0]["id"];
  eventEmitter.emit("user_signup", { userId });
  req.session.currentUser = userId;
  res.json({ id: req.session.currentUser });
});

router.use((req, res, next) => {
  if (req.session.currentUser) {
    next();
  } else {
    res.status(401).json("not authorized");
  }
});

router.get("/authenticate", async (req, res, next) => {
  return res.json({ id: req.session.currentUser });
});

module.exports = router;
