const express = require("express");
const router = new express.Router();
const protect = require("../../middlewares/protect");
const { register, login, logout } = require("./auth.controller.js");

router.post("/register", register);
router.post("/login", login);
router.get("/logout", protect, logout);

module.exports = router;
