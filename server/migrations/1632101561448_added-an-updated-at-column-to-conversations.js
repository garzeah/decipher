/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql(`
    ALTER TABLE conversations
    ADD updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP;
 `);
};

exports.down = (pgm) => {
  pgm.sql(`
    ALTER TABLE conversations
    DROP updated_at;
  `);
};
