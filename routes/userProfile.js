const Router = require("express-promise-router");
const db = require("../db");
const UserProfile = require("../models/baseModel")("userProfiles");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const { uploadBase64 } = require("../services/cloudinary");

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

router.put("/", upload.single("logo"), async (req, res, next) => {
  const params = req.body;
  const { logo } = params;
  const logoUrl = logo ? await uploadBase64(logo) : params.logoUrl;
  const userId = req.session.currentUser;
  delete params["user"];
  delete params["logo"];
  const result = await UserProfile.update(
    { ...params, logoUrl: logoUrl },
    { userId }
  );
  res.json(result);
});

module.exports = router;
