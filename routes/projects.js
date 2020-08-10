var express = require("express");
const bcrypt = require("bcrypt");
const Router = require("express-promise-router");
const db = require("../db");

const router = new Router({ mergeParams: true });

/*  GET all projects of a customer */
router.get("/", async (req, res, next) => {
  console.log("get customers");
  const { customerId } = req.params;
  const userId = req.session.currentUser;
  console.log("userId: ", userId);
  const {
    rows,
  } = await db.query(
    'SELECT * FROM projects WHERE "customerId" = $1 AND "userId" = $2',
    [customerId, userId]
  );
  console.log(rows);
  res.json(rows);
});

router.post("/", async (req, res, next) => {
  const { customerId } = req.params;
  const { name, description, hours } = req.body;
  const createdAt = new Date();
  const updatedAt = new Date();
  const userId = req.session.currentUser;
  const {
    rows,
  } = await db.query(
    'INSERT INTO "projects" ("name", "description", "hours", "customerId", "createdAt", "updatedAt", "userId") VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
    [name, description, hours, customerId, createdAt, updatedAt, userId]
  );
  console.log(rows);
  res.json(rows[0]);
});

router.put("/:projectId", async (req, res, next) => {
  console.log(req.body);
  const updatedAt = new Date();
  const { name, description, hours, id } = req.body;
  const userId = req.session.currentUser;

  const {
    rows,
  } = await db.query(
    'UPDATE "projects" SET "name" = ($1), "description" = ($2), "hours" = ($3), "updatedAt" = ($4) WHERE id=($5) AND "userId" = ($6)',
    [name, description, hours, updatedAt, id, userId]
  );
  res.json(rows);
});

router.delete("/:projectId", async (req, res, next) => {
  const { projectId } = req.params;
  const userId = req.session.currentUser;
  const {
    rows,
  } = await db.query(
    'DELETE FROM "projects" WHERE "id" = ($1) AND "userId" = $2',
    [projectId, userId]
  );
  res.json(rows);
});

module.exports = router;
