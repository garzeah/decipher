const { Pool } = require("pg");

const pool = new Pool({
  user: "Andy",
  password: "",
  port: 5432,
  database: "Decipher"
});

module.exports = pool;
