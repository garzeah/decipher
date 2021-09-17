const express = require("express");
const router = new express.Router();

const { register } = require("./auth.controller.js");

// User register
router.post("/register", register);
// router.post("/register", async (req, res) => {
// const { displayName, email, password, language } = req.body;
// if (!displayName || !email || !password || !language) {
//   return res.status(406).send({
//     error: "Missing input, please check your fields before submitting again"
//   });
// }
// const user = new User(req.body);
// // Saving user and giving them a JWT
// try {
//   await user.save();
//   const token = await user.generateAuthToken();
//   res.status(201).send({ user, token });
// } catch (err) {
//   res.sendStatus(400);
// }
// });

// User login
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
