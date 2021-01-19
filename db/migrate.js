const db = require("./index");
const Customer = require("../models/baseModel")("customers");
const Invoice = require("../models/baseModel")("invoices");
const Project = require("../models/baseModel")("projects");

const migrate = async () => {
  const { rows: unpopulatedInvoices } = await db.query(
    'SELECT * FROM "invoices" WHERE "totalSum" IS NULL;'
  );
  const unpopulatedInvoiceIds = unpopulatedInvoices.map(
    (invoice) => invoice.id
  );

  for (let i = 0; i < unpopulatedInvoiceIds.length; i++) {
    const invoiceId = unpopulatedInvoiceIds[i];

    const projects = await db.query(
      'SELECT * FROM "projects" WHERE "invoiceId" = $1;',
      [invoiceId]
    );

    if (projects.rows.length === 0) continue;

    const customerId = projects.rows[0]["customerId"];

    const customers = await db.query(
      'SELECT * FROM "customers" WHERE id = $1;',
      [customerId]
    );

    const hourlyRate = customers.rows[0]["hourlyRate"];
    const taxRate =
      (customers.rows[0]["country"] === "Deutschland" && 0.19) || null;

    const totalHours = projects.rows.reduce((acc, p) => {
      return acc + p.hours;
    }, 0);

    const totalSum = totalHours * hourlyRate;

    const result = await db.query(
      'UPDATE "invoices" SET "totalHours" = ($1), "totalSum" = ($2), "taxRate" = ($3) WHERE "id" = ($4) RETURNING *;',
      [totalHours, totalSum, taxRate, invoiceId]
    );
  }
};

module.exports = {
  migrate,
};
