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

router.post("/", async (req, res, next) => {
  const userId = req.session.currentUser;
  const result = await UserProfile.create({ ...req.body, userId });
  res.json(result);
});

router.put("/", async (req, res, next) => {
  const userId = req.session.currentUser;
  const result = await UserProfile.update({ ...req.body }, { userId });
  res.json(result);
});

module.exports = router;
