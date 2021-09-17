/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql(`
    ALTER TABLE users
    RENAME COLUMN username TO display_name;
  `);
};

exports.down = (pgm) => {
  pgm.sql(`
    ALTER TABLE users
    RENAME COLUMN display_name TO username;
`);
};
