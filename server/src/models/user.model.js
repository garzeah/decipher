const { pool } = require("../services/db");
const toCamelCase = require("../utils/toCamelCase.utils");

const User = {
  find: async () => {
    const { rows } = await pool.query("SELECT * FROM users;");

    return toCamelCase(rows);
  },

  findByEmail: async (email) => {
    const { rows } = await pool.query(
      `
      SELECT * FROM users
      WHERE email = $1;`,
      [email]
    );

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

  update: async (id, username, bio) => {
    const { rows } = await pool.query(
      "UPDATE users SET username = $1, bio = $2 WHERE id = $3 RETURNING *;",
      [username, bio, id]
    );

    return toCamelCase(rows)[0];
  }
};

module.exports = User;
