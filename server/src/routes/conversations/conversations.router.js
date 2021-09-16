const express = require("express");
const router = new express.Router();

const User = require("../../models/user.model");
const Conversation = require("../../models/conversation.model");
const protect = require("../../middlewares/protect");

// Create a conversation
router.post("/conversations/new/", protect, async (req, res) => {
  // Checking to see if conversation already exists
  // Saving Sender and Receiver's ID
  // If a conversation already exists, return that conversation
  // Otherwise, lets create a new conversation and save it
});

// Get all conversations for a user
router.get("/conversations/", protect, async (req, res) => {
  // Finds all conversations the user is associated with
});

// Get a specific conversation
router.get("/conversations/:id", (req, res) => {});

// Send message
router.post("/conversations/:id", (req, res) => {});

module.exports = router;
