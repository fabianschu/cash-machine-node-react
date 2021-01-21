const db = require("../db");
const { NetworkAuthenticationRequire } = require("http-errors");

customers = [
  {
    firm: "Bahlsen AG",
    firstName: "Hans",
    lastName: "Bahlsen",
    street: "Alttempelhofer Damm 165",
    city: "Berlin",
    zip: "12344",
    country: "Deutschland",
    taxId: "DE1342812104",
    hourlyRate: 40,
  },
  {
    firm: "Bananenbrot GmbH",
    firstName: "Wiebke",
    lastName: "Schnippelbach",
    street: "Aamseestraße 542",
    city: "Alkreuchenberg-Schnuppenzwing",
    zip: "11122",
    country: "Österreich",
    taxId: "AT9317461934876",
    hourlyRate: 50,
  },
  {
    firm: "Koppenrat und Wiese Co. KG",
    firstName: "Sabine",
    lastName: "Losen",
    street: "Altamm 65",
    city: "Lutz",
    zip: "12412",
    country: "Deutschland",
    taxId: "DE1342812104",
    hourlyRate: 45,
  },
];

projects = [
  {
    name: "Folder für dies und jenes",
    description:
      "Einmal hier was machen, dann dort, dann wieder hier. Jetzt fertig. juhu",
    hours: 4,
    createdAt: new Date(),
    updatedAt: new Date(),
    customerId: 2,
  },
  {
    name: "Schmuckes Logo",
    description:
      "dort Einmal hier was machen, dann wieder was anderes. Jetzt hier was machen, dann. Jetzt fertig. juhu",
    hours: 3.5,
    createdAt: new Date(),
    updatedAt: new Date(),
    customerId: 2,
  },
  {
    name: "Website Olala",
    description:
      "Einmal hier was machen, dann dort, dann wieder hier. Jetzt fertig. juhuJetzt fertig. juhu Jetzt fertig. juhu Jetzt fertig. juhu ",
    hours: 2.5,
    createdAt: new Date(),
    updatedAt: new Date(),
    customerId: 2,
  },
];

db.query("DROP TABLE IF EXISTS projects")
  .then(() => db.query("DROP TABLE IF EXISTS invoices"))
  .then(() => db.query("DROP TABLE IF EXISTS customers"))
  .then(() =>
    db.query(
      'CREATE TABLE IF NOT EXISTS "users" (ID SERIAL PRIMARY KEY, username VARCHAR(30) UNIQUE, password VARCHAR(60))'
    )
  )
  .then(() =>
    db.query(
      'CREATE TABLE IF NOT EXISTS "userProfiles" (ID SERIAL PRIMARY KEY, "name" VARCHAR(30), "street" VARCHAR(50), "zip" VARCHAR(30), "city" VARCHAR(30), "email" VARCHAR(30), "phone" VARCHAR(30), "iban" VARCHAR(30), "bic" VARCHAR(30), "taxId" VARCHAR(30), "uId" VARCHAR(30), "userId" INTEGER REFERENCES users("id"), "updatedAt" TIMESTAMP, "createdAt" TIMESTAMP)'
    )
  )
  .then(() =>
    db.query(
      'CREATE TABLE IF NOT EXISTS "customers" (ID SERIAL PRIMARY KEY, "firm" VARCHAR(30) UNIQUE, "firstName" VARCHAR(30), "lastName" VARCHAR(30), "street" VARCHAR(30), "zip" VARCHAR(30), "city" VARCHAR(30), "country" VARCHAR(30), "taxId" VARCHAR(30), "hourlyRate" REAL, "active" BOOL DEFAULT true, ,"createdAt" TIMESTAMP, "updatedAt" TIMESTAMP, "userId" INTEGER REFERENCES users("id"))'
    )
  )
  .then(() =>
    db.query(
      `CREATE TABLE IF NOT EXISTS "invoices" (ID SERIAL PRIMARY KEY, "title" VARCHAR(60), "status" VARCHAR(30) DEFAULT 'open', "customerId" INTEGER REFERENCES customers("id"), "createdAt" TIMESTAMP, "updatedAt" TIMESTAMP, "userId" INTEGER REFERENCES users("id"), "totalSum" INTEGER, "totalHours" FLOAT, , "taxRate" FLOAT)`
    )
  )
  .then(() =>
    db.query(
      'CREATE TABLE IF NOT EXISTS "projects" (ID SERIAL PRIMARY KEY, "name" VARCHAR(30), "description" VARCHAR(400), "hours" REAL, "customerId" INTEGER REFERENCES customers("id"), "createdAt" TIMESTAMP, "updatedAt" TIMESTAMP, "userId" INTEGER REFERENCES users("id"), "invoiceId" INTEGER REFERENCES invoices("id"))'
    )
  )
  .then(() => console.log("Tables deleted and newly created"))
  .catch((e) => console.log(e));

//ALTER TABLE invoices ADD COLUMN "totalSum" INTEGER, ADD COLUMN "totalHours" FLOAT, ADD COLUMN "taxRate" FLOAT;
