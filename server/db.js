/*const Pool = require("pg").Pool;
require("dotenv").config(); //hold sensitive info



const pool = new Pool({
  user: "postgres",
  password: "Sibir111",
  host: "localhost",
  port: 5432,
  database: "mojProjekt",
});

module.exports = pool;*/
const { Pool } = require("pg");

const pool = new Pool({
  user: "rfmzpuww", // Your ElephantSQL username
  password: "3TE30jD_m36jCPKgJoMzD9gG_sOTvt1r", // Your ElephantSQL password
  host: "cornelius.db.elephantsql.com", // Your ElephantSQL host
  port: 5432, // Default PostgreSQL port
  database: "rfmzpuww", // Your default database
});

module.exports = pool;
