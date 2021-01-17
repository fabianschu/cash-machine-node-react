const Router = require("express-promise-router");
const Project = require("../models/baseModel")("projects");

const router = new Router({ mergeParams: true });

router.use((req, res, next) => {
  if (req.session.currentUser) {
    next();
  } else {
    res.status(401).json("not authorized");
  }
});

/*  GET all projects of a customer */
router.get("/", async (req, res, next) => {
  const userId = req.session.currentUser;
  const result = await Project.where({ userId });
  res.json(result);
});

router.post("/", async (req, res, next) => {
  const userId = req.session.currentUser;
  const result = await Project.create({ ...req.body, userId });
  res.json(result);
});

router.put("/:projectId", async (req, res, next) => {
  const userId = req.session.currentUser;
  const { projectId } = req.params;
  const result = await Project.update(
    { ...req.body },
    { userId, id: projectId }
  );
  res.json(result);
});

router.put("/", async (req, res, next) => {
  const userId = req.session.currentUser;
  const { ids, payload } = req.body;
  const result = await Project.updateMultiple(ids, payload, { userId: userId });
  res.json(result);
});

router.delete("/:projectId", async (req, res, next) => {
  const { projectId } = req.params;
  const userId = req.session.currentUser;
  const result = await Project.delete({ id: projectId, userId });
  res.json(result);
});

module.exports = router;
