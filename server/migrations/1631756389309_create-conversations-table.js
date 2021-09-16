/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql(`
      CREATE TABLE conversations (
        id SERIAL PRIMARY KEY,
        host_id INTEGER REFERENCES users(id),
        participant_id INTEGER REFERENCES users(id),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `);
};

exports.down = (pgm) => {
  pgm.sql(`
    DROP TABLE conversations;
  `);
};
