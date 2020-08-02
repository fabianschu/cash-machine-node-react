const { Pool, Client } = require("pg");

const poolOptions = {
  user: "fabi",
  host: "localhost",
  database: "cashmashine",
  password: "dbaccess",
  port: 5432,
};

const conString =
  process.env.DATABASE_URL ||
  "postgres://fabi:dbaccess@localhost:5432/cashmashine";

const client = new Client(conString);

client.connect();
console.log("connected to db");
module.exports = {
  query: (text, params) => client.query(text, params),
  conString,
};
