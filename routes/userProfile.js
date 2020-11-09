const Router = require("express-promise-router");
const db = require("../db");
const UserProfile = require("../models/baseModel")("userProfiles");

const router = new Router({ mergeParams: true });

router.use((req, res, next) => {
  if (req.session.currentUser) {
    next();
  } else {
    res.status(401).json("not authorized");
  }
});

/*  GET own user profile */
router.get("/", async (req, res, next) => {
  const userId = req.session.currentUser;
  const result = await UserProfile.where({ userId });
  res.json(result[0]);
});

module.exports = router;
