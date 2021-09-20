const express = require("express");
const router = new express.Router();
const { fetchLanguages } = require("./google.controller");

router.get("/languages", fetchLanguages);

module.exports = router;
