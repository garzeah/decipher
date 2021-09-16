const express = require("express");
const router = new express.Router();

const User = require("../../models/user.model");

// User register
router.post("/api/register", async (req, res) => {
  const user = new User(req.body);

  // Saving user and giving them a JWT
  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (err) {
    res.sendStatus(400);
  }
});

// User login
router.post("/api/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.status(200).send({ user, token });
  } catch (err) {
    res.sendStatus(400);
  }
});

module.exports = router;
