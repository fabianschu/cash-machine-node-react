var express = require("express");
const bcrypt = require("bcrypt");
const Router = require("express-promise-router");
const db = require("../db");
const projects = require("./projects");

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
  const {
    firm,
    firstName,
    lastName,
    street,
    zip,
    city,
    country,
    taxId,
    hourlyRate,
  } = req.body;

  const userId = req.session.currentUser;
  try {
    const {
      rows,
    } = await db.query(
      'INSERT INTO "customers" ("firm", "firstName", "lastName", "street", "zip", "city", "country", "taxId", "hourlyRate", "userId") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *',
      [
        firm,
        firstName,
        lastName,
        street,
        zip,
        city,
        country,
        taxId,
        hourlyRate,
        parseInt(userId),
      ]
    );
    res.json(rows[0]);
  } catch (e) {
    console.log(e);
  }
});

router.put("/:customerId", async (req, res, next) => {
  console.log(req.body);
  const {
    id,
    firm,
    firstName,
    lastName,
    street,
    zip,
    city,
    country,
    taxId,
    hourlyRate,
    active,
  } = req.body;
  const userId = req.session.currentUser;
  try {
    const {
      rows,
    } = await db.query(
      'UPDATE "customers" SET "firm" = ($1), "firstName" = ($2), "lastName" = ($3), "street" = ($4), "zip" = ($5), "city" = ($6), "country" = ($7), "taxId" = ($8), "hourlyRate" = ($9), "active" = ($10) WHERE "id" = ($11) AND "userId" = ($12) RETURNING *',
      [
        firm,
        firstName,
        lastName,
        street,
        zip,
        city,
        country,
        taxId,
        hourlyRate,
        active,
        id,
        userId,
      ]
    );
    res.json(rows[0]);
  } catch (e) {
    console.log(e);
  }
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
