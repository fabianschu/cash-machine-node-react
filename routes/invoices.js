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

router.post("/", async (req, res, next) => {
  const userId = req.session.currentUser;
  const { title, status, customerId } = req.body;
  const createdAt = new Date();
  const updatedAt = new Date();
  try {
    const {
      rows,
    } = await db.query(
      'INSERT INTO "invoices" ("title", "status", "customerId", "createdAt", "updatedAt", "userId") VALUES ($1, $2, $3, $4, $5, $6)',
      [title, status, customerId, createdAt, updatedAt, userId]
    );
    res.json(rows[0]);
  } catch (e) {
    console.log(e);
  }
});

router.get("/", async (req, res, next) => {
  const userId = req.session.currentUser;
  try {
    const {
      rows,
    } = await db.query('SELECT * FROM "invoices" WHERE "userId" = $1', [
      userId,
    ]);
    res.json(rows);
  } catch (e) {
    console.log(e);
  }
});

router.patch("/:invoiceId", async (req, res, next) => {
  const userId = req.session.currentUser;
  const { invoiceId } = req.params;
  const { title, status, customerId } = req.body;
  const updatedAt = new Date();
  try {
    const {
      rows,
    } = await db.query(
      'UPDATE "invoices" SET "title" = ($1), "status" = ($2), "updatedAt" = ($3) WHERE "id" = ($4) AND "userId" = ($5) RETURNING *',
      [title, status, updatedAt, invoiceId, userId]
    );
    res.json(rows[0]);
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
