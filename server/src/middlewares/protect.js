const jwt = require("jsonwebtoken");

const User = require("../models/user.model");

// Verifies a user's JWT
const protect = (req, res, next) => {
  const token = req.cookies.jwt;

  // Check if JWT exists & is verified
  if (token) {
    jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET,
      async (error, decodedToken) => {
        if (error) res.sendStatus(404);

        const user = await User.findById(decodedToken.id);
        req.user = user;
        next();
      }
    );
  } else res.sendStatus(404);
};

module.exports = protect;
