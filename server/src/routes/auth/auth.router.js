const express = require("express");
const router = new express.Router();
const protect = require("../../middlewares/protect");
const { register, login, logout, isLoggedIn } = require("./auth.controller.js");

router.post("/register", register);
router.post("/login", login);
router.get("/logout", protect, logout);
router.get("/me", protect, isLoggedIn);

module.exports = router;
