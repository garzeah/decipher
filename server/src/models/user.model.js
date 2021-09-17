const { pool } = require("../services/db");
const toCamelCase = require("../utils/toCamelCase.utils");

const User = {
  find: async () => {
    const { rows } = await pool.query("SELECT * FROM users;");

    return toCamelCase(rows);
  },

  findById: async (id) => {
    const { rows } = await pool.query("SELECT * FROM users WHERE id = $1;", [
      id
    ]);

    return toCamelCase(rows)[0];
  },

  findByEmail: async (email) => {
    const { rows } = await pool.query(`SELECT * FROM users WHERE email = $1;`, [
      email
    ]);

    return toCamelCase(rows)[0];
  },

  insert: async (displayName, email, password, language) => {
    const { rows } = await pool.query(
      `INSERT INTO users (display_name, email, password, language)
        VALUES ($1, $2, $3, $4)
        RETURNING *;`,
      [displayName, email, password, language]
    );

    return toCamelCase(rows)[0];
  },

  update: async (id, displayName, email, password, avatar, language) => {
    const { rows } = await pool.query(
      `UPDATE users
        SET
          display_name = $2,
          email = $3,
          password = $4,
          avatar = $5,
          language = $6
          WHERE id = $1 RETURNING *;`,
      [id, displayName, email, password, avatar, language]
    );

    return toCamelCase(rows)[0];
  }
};

module.exports = User;
