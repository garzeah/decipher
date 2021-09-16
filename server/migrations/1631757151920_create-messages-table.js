/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql(`
    CREATE TABLE messages (
      id SERIAL PRIMARY KEY,
      conversation_id INTEGER REFERENCES conversations(id),
      author_id INTEGER REFERENCES users(id),
      content VARCHAR,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `);
};

exports.down = (pgm) => {
  pgm.sql(`
    DROP TABLE messages;
  `);
};
