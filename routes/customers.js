var express = require("express");
const bcrypt = require("bcrypt");
const Router = require("express-promise-router");
const db = require("../db");
const projects = require("./projects");

const router = new Router();

// authenticate
// router.use((req, res, next) => {
//   if (req.session.currentUser) {
//     next();
//   } else {
//     res.json("not authorized");
//   }
// });

/* POST NEW CUSTOMER. */
router.post("/", async (req, res, next) => {
  console.log(req.body);
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
  const {
    rows,
  } = await db.query(
    'INSERT INTO "customers" ("firm", "firstName", "lastName", "street", "zip", "city", "country", "taxId", "hourlyRate") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
    [firm, firstName, lastName, street, zip, city, country, taxId, hourlyRate]
  );
  console.log("coocoo: ", rows[0]);
  res.json(rows[0]);
});

router.put("/:customerId", async (req, res, next) => {
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
  } = req.body;
  const {
    rows,
  } = await db.query(
    'UPDATE "customers" SET "firm" = ($1), "firstName" = ($2), "lastName" = ($3), "street" = ($4), "zip" = ($5), "city" = ($6), "country" = ($7), "taxId" = ($8), "hourlyRate" = ($9) WHERE id =($10) RETURNING *',
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
      id,
    ]
  );
});

/*  GET all customers */
router.get("/", async (req, res, next) => {
  const { rows } = await db.query('SELECT * FROM "customers"');
  res.json(rows);
});

router.use("/:customerId/projects", projects);

module.exports = router;
