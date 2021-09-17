const express = require("express");
const router = new express.Router();

const { register } = require("./auth.controller.js");

router.post("/register", register);
router.post("/login", async (req, res) => {
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
