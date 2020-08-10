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
  // .then(() => db.query("DROP TABLE session"))
  .then(() => db.query("DROP TABLE IF EXISTS customers"))
  .then(() =>
    db.query(
      'CREATE TABLE IF NOT EXISTS "users" (ID SERIAL PRIMARY KEY, username VARCHAR(30) UNIQUE, password VARCHAR(60))'
    )
  )
  .then(() =>
    db.query(
      'CREATE TABLE IF NOT EXISTS "customers" (ID SERIAL PRIMARY KEY, "firm" VARCHAR(30) UNIQUE, "firstName" VARCHAR(30), "lastName" VARCHAR(30), "street" VARCHAR(30), "zip" VARCHAR(30), "city" VARCHAR(30), "country" VARCHAR(30), "taxId" VARCHAR(30), "hourlyRate" REAL, "userId" INTEGER REFERENCES users("id"))'
    )
  )
  .then(() =>
    db.query(
      'CREATE TABLE IF NOT EXISTS "projects" (ID SERIAL PRIMARY KEY, "name" VARCHAR(30) UNIQUE, "description" VARCHAR(140), "hours" REAL, "customerId" INTEGER REFERENCES customers("id"), "createdAt" TIMESTAMP, "updatedAt" TIMESTAMP, "userId" INTEGER REFERENCES users("id"))'
    )
  )
  .then(() =>
    customers.map((c) =>
      db.query(
        'INSERT INTO "customers" ("firm", "firstName", "lastName", "street", "city", "zip","country", "taxId","hourlyRate") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)',
        [
          c.firm,
          c.firstName,
          c.lastName,
          c.street,
          c.city,
          c.zip,
          c.country,
          c.taxId,
          c.hourlyRate,
        ]
      )
    )
  )
  .then(() =>
    projects.map((p) =>
      db.query(
        'INSERT INTO "projects" ("name", "description", "hours", "createdAt", "updatedAt", "customerId") VALUES ($1, $2, $3, $4, $5, $6)',
        [p.name, p.description, p.hours, p.createdAt, p.updatedAt, p.customerId]
      )
    )
  )
  .then(() => console.log("Tables created: users, customers"))
  .catch((e) => console.log(e));
