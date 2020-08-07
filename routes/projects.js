var express = require("express");
const bcrypt = require("bcrypt");
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

/*  GET all projects of a customer */
router.get("/", async (req, res, next) => {
  const { customerId } = req.params;
  const {
    rows,
  } = await db.query('SELECT * FROM projects WHERE "customerId" = $1', [
    parseInt(customerId),
  ]);
  res.json(rows);
});

router.post("/", async (req, res, next) => {
  const { customerId } = req.params;
  const { name, description, hours } = req.body;
  const createdAt = new Date();
  const updatedAt = new Date();

  const {
    rows,
  } = await db.query(
    'INSERT INTO "projects" ("name", "description", "hours", "customerId", "createdAt", "updatedAt") VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
    [name, description, hours, customerId, createdAt, updatedAt]
  );
  console.log(rows);
  res.json(rows[0]);
});

router.put("/:projectId", async (req, res, next) => {
  console.log(req.body);
  const updatedAt = new Date();
  const { name, description, hours, id } = req.body;
  const {
    rows,
  } = await db.query(
    'UPDATE "projects" SET "name" = ($1), "description" = ($2), "hours" = ($3), "updatedAt" = ($4) WHERE id=($5)',
    [name, description, hours, updatedAt, id]
  );
  res.json(rows);
});

router.delete("/:projectId", async (req, res, next) => {
  const { projectId } = req.params;
  const { rows } = await db.query('DELETE FROM "projects" WHERE "id" = ($1)', [
    projectId,
  ]);
  console.log();
  res.json(rows);
});

module.exports = router;
