const { Pool, Client } = require("pg");

const conString =
  process.env.DATABASE_URL ||
  "postgres://fabi:dbaccess@localhost:5432/cashmashine";

const client = new Client(conString);

if (process.env.NODE_ENV == "production") {
  client.ssl = true;
}

client.connect();

module.exports = {
  query: (text, params) => client.query(text, params),
  conString,
};
