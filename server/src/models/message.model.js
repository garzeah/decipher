const { pool } = require("../services/db");
const toCamelCase = require("../utils/toCamelCase.utils");

const Message = {
  // Retrieves all messages for a given conversation
  findById: async (conversationId) => {
    // Want to find the messages associated with a conversation
    const { rows } = await pool.query(
      `SELECT *
        FROM messages
        WHERE conversation_id = $1
        ORDER BY created_at DESC;
      `,
      [conversationId]
    );

    return toCamelCase(rows);
  },

  // Creates a new message
  insert: async (conversationId, authorId, content) => {
    const { rows } = await pool.query(
      `INSERT INTO messages (conversation_id, author_id, content)
        VALUES ($1, $2, $3)
        RETURNING *;`,
      [conversationId, authorId, content]
    );

    return toCamelCase(rows)[0];
  }
};

module.exports = Message;
