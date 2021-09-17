const express = require("express");
const router = new express.Router();
const protect = require("../../middlewares/protect");
const {
  createConvo,
  fetchAllConvos,
  fetchConvo,
  sendMessage
} = require("./conversations.controller");

router.post("/new", protect, createConvo);
router.get("/", protect, fetchAllConvos);
router.get("/:id", protect, fetchConvo);
router.post("/:id", protect, sendMessage);

module.exports = router;
