const { Client } = require("pg");

const conString =
  process.env.DATABASE_URL ||
  "postgres://fabi:dbaccess@localhost:5432/cashmashine";

const client = new Client({
  connectionString: conString,
  ssl: { rejectUnauthorized: false },
});

client.connect((err) => {
  if (err) console.log("db error:", err);
  else console.log("db connected");
});

module.exports = {
  query: (text, params) => client.query(text, params),
  conString,
};
