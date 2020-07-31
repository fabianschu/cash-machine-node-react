const { Pool } = require("pg");

const poolOptions = {
  user: "fabi",
  host: "localhost",
  database: "cashmashine",
  password: "dbaccess",
  port: 5432,
};

const pool = new Pool(poolOptions);

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool: pool,
};
