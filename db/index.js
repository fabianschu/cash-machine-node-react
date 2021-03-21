const { Client } = require("pg");

const conString =
  process.env.DATABASE_URL ||
  "postgres://fabi:dbaccess@localhost:5432/cashmashine";

const client = new Client(conString);

console.log("constring: ", conString);
console.log("node_env: ", process.env.NODE_ENV);
console.log("DATABASE_URL: ", process.env.DATABASE_URL);
console.log("connecting db");

client.connect((err) => {
  if (err) console.log("Custom-Error:", err);
  else console.log("db connected");
});

module.exports = {
  query: (text, params) => client.query(text, params),
  conString,
};
