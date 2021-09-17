const express = require("express");
const router = new express.Router();
const protect = require("../../middlewares/protect");
const { fetchLanguages } = require("./google.controller");

router.get("/languages", protect, fetchLanguages);

module.exports = router;
