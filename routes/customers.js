const Router = require("express-promise-router");
const Customer = require("../models/baseModel")("customers");

const router = new Router();

router.use((req, res, next) => {
  if (req.session.currentUser) {
    next();
  } else {
    res.status(401).json("not authorized");
  }
});

/* POST NEW CUSTOMER. */
router.post("/", async (req, res, next) => {
  console.log(req.body);
  const userId = req.session.currentUser;
  const result = await Customer.create({ ...req.body, userId });
  console.log(result);
  res.json(result);
});

/* UPDATE CUSTOMER. */
router.put("/:customerId", async (req, res, next) => {
  const userId = req.session.currentUser;
  const { customerId } = req.params;
  const result = await Customer.update(
    { ...req.body },
    { userId, id: customerId }
  );
  res.json(result);
});

/*  GET all customers */
router.get("/", async (req, res, next) => {
  const userId = req.session.currentUser;
  const result = await Customer.where({ userId });
  res.json(result);
});

module.exports = router;
