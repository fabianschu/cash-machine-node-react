var express = require("express");
const bcrypt = require("bcrypt");
const Router = require("express-promise-router");
const db = require("../db");
const projects = require("./projects");
const Customer = require("../models/Customer");

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
  const userId = req.session.currentUser;
  const result = await Customer.create({ ...req.body, userId });
  res.json(result);
});

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
  const {
    rows,
  } = await db.query(
    'SELECT * FROM "customers" WHERE "userId" = $1 AND "active" = $2',
    [userId, true]
  );
  res.json(rows);
});

// router.use("/:customerId/projects", projects);

module.exports = router;
