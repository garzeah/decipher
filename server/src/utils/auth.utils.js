const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Generates a JWT
const generateAuthToken = (email) => {
  const token = jwt.sign({ email }, process.env.ACCESS_TOKEN_SECRET);
  return token;
};

// Hashes information
const hash = async (str) => {
  return await bcrypt.hash(str, 8);
};

module.exports = { generateAuthToken, hash };
