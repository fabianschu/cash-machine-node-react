var express = require("express");
const Router = require("express-promise-router");
const db = require("../db");
const Invoice = require("../models/Invoice");

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
  const result = await Invoice.create({ ...req.body, userId });
  res.json(result);
});

router.get("/", async (req, res, next) => {
  const userId = req.session.currentUser;
  const result = await Invoice.where({ userId });
  res.json(result);
});

router.patch("/:invoiceId", async (req, res, next) => {
  const userId = req.session.currentUser;
  const { invoiceId } = req.params;
  const result = await Invoice.update(
    { ...req.body },
    { userId, id: invoiceId }
  );
  res.json(result);
});

module.exports = router;
