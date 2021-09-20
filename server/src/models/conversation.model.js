const { pool } = require("../services/db");
const toCamelCase = require("../utils/toCamelCase.utils");

const Conversation = {
  // Retrieves all of a user's conversations
  find: async (hostId) => {
    const { rows } = await pool.query(
      `SELECT *
        FROM conversations
        WHERE host_id = $1
        ORDER BY created_at ASC
      `,
      [hostId]
    );

    return toCamelCase(rows);
  },

  // Retrieves one conversation between host and participant
  findOne: async (hostId, participantId) => {
    // Want to find the conversation associated with the users
    const { rows } = await pool.query(
      `SELECT *
        FROM conversations
        WHERE host_id = $1
          AND participant_id = $2;`,
      [hostId, participantId]
    );

    return toCamelCase(rows)[0];
  },

  findById: async (conversationId) => {
    const { rows } = await pool.query(
      `SELECT * FROM conversations
        WHERE id = $1;`,
      [conversationId]
    );

    return toCamelCase(rows)[0];
  },

  // Creates a new conversation
  insert: async (hostId, participantId) => {
    const { rows } = await pool.query(
      `INSERT INTO conversations (host_id, participant_id)
        VALUES ($1, $2)
        RETURNING *;`,
      [hostId, participantId]
    );

    return toCamelCase(rows)[0];
  },

  // Updates a conversation
  update: async (conversationId, updatedAt) => {
    const { rows } = await pool.query(
      `UPDATE conversations
        SET
          updated_at = $2
          WHERE id = $1 RETURNING *;`,
      [conversationId, updatedAt]
    );

    return toCamelCase(rows)[0];
  }
};

module.exports = Conversation;
