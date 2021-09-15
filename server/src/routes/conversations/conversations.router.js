const express = require("express");
const router = new express.Router();

const User = require("../../models/User");
const Conversation = require("../../models/Conversation");
const verifyToken = require("../../middlewares/protect");

// Create a conversation
router.post("/conversations/new/", verifyToken, async (req, res) => {
  try {
    const receiver = await User.findOne({ email: req.body.email });

    // Checking to see if conversation already exists
    const conversation = await Conversation.findOne({
      // Saving Sender and Reciver's ID
      "participants.participant": req.user._id,
      "participants.participant": receiver._id
    });

    // If a conversation already exists, return that conversation
    if (conversation) return res.send(conversation);

    // Otherwise, lets create a new conversation and save it
    const newConversation = new Conversation({
      participants: [
        {
          participant: req.user._id
        },
        {
          participant: receiver._id
        }
      ]
    });

    await newConversation.save();
    res.send(newConversation);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Get all conversations for a user
router.get("/conversations/", verifyToken, async (req, res) => {
  // Finds all conversations the user is associated with
  const conversations = await Conversation.find({
    "participants.participant": req.user._id
  });
  res.send(conversations);
});

// Get a specific conversation
router.get("/conversations/:id", (req, res) => {});

// Send message
router.post("/conversations/:id", (req, res) => {});

module.exports = router;