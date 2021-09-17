const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user.model");

// Generates a JWT
const generateAuthToken = (userId) => {
  const token = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET);
  return token;
};

// Hashes information
const hash = async (str) => await bcrypt.hash(str, 8);

// Verifies login information
const verifyCredentials = async (email, password) => {
  // Checking if user exists
  const user = await User.findByEmail(email);
  if (!user) throw new Error("Invalid login information");

  // Checking if credentials match
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid login information");

  return user;
};

module.exports = { generateAuthToken, hash, verifyCredentials };
