const { Client } = require("pg");

const conString =
  process.env.DATABASE_URL ||
  "postgres://fabi:dbaccess@localhost:5432/cashmashine";

const client = new Client({
  connectionString: conString,
  ssl: process.env.NODE_ENV !== "development",
});
console.log("client: ", client);
console.log("node_env: ", process.env.NODE_ENV);
console.log("DATABASE_URL: ", process.env.DATABASE_URL);
console.log("connecting db");

client.connect((err) => {
  if (err) console.log("Custom-Error:", err);
  else console.log("connected");
});

module.exports = {
  query: (text, params) => client.query(text, params),
  conString,
};
