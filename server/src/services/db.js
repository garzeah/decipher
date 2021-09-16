const { Pool } = require("pg");

const pool = new Pool({
  user: "Andy",
  password: "",
  port: 5432,
  database: "Decipher"
});

// Checking if our database is working
const isDatabaseWorking = () => {
  pool.query("SELECT 1 + 1", (error, results, fields) => {
    if (error) throw error;
    console.log("Successfully connected to our PostgreSQL database");
  });
};

module.exports = { pool, isDatabaseWorking };
