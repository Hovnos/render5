const { Pool } = require("pg");

const pool = new Pool({
  user: "rfmzpuww",
  password: "3TE30jD_m36jCPKgJoMzD9gG_sOTvt1r",
  host: "cornelius.db.elephantsql.com",
  port: 5432,
  database: "rfmzpuww",
});

module.exports = pool;
