const express = require("express");
const router = new express.Router();
const protect = require("../../middlewares/protect");
const {
  createConvo,
  fetchAllMyConvos,
  fetchConvo,
  sendMessage
} = require("./conversations.controller");

router.post("/new", protect, createConvo);
router.get("/", protect, fetchAllMyConvos);
router.get("/:id", protect, fetchConvo);
router.post("/:id", protect, sendMessage);

module.exports = router;
