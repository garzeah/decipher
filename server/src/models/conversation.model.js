const { pool } = require("../services/db");
const toCamelCase = require("../utils/toCamelCase.utils");
const Message = require("./message.model");

const Conversation = {
  // Retrieves all of a user's conversations
  find: async (host) => {
    // Want to join the participants and conversations together
    const { rows } = await pool.query(
      `SELECT *
        FROM conversations
        WHERE host_id = $1;`,
      [host]
    );

    return toCamelCase(rows);
  },

  // Retrieves one conversation between host and participant
  findById: async (hostId, participantId) => {
    // Want to find the conversation associated with the users
    const conversation = await pool.query(
      `SELECT id
        FROM conversations
        WHERE host_id = $1
          AND participant_id = $2;`,
      [hostId, participantId]
    );

    // Find all the messages associated with the conversation
    const { rows } = Message.findById(conversation[0].id);

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
  }
};

module.exports = Conversation;
