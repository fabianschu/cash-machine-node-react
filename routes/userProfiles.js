var express = require("express");
const Router = require("express-promise-router");
const db = require("../db");

const router = new Router({ mergeParams: true });

router.use((req, res, next) => {
  if (req.session.currentUser) {
    next();
  } else {
    res.status(401).json("not authorized");
  }
});

/*  GET own user profile */
router.get("/:userId", async (req, res, next) => {
  const userId = req.session.currentUser;
  const {
    rows,
  } = await db.query('SELECT * FROM "userProfiles" WHERE "userId" = $1', [
    userId,
  ]);
  res.json(rows[0]);
});

module.exports = router;
