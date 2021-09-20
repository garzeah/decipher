const { Translate } = require("@google-cloud/translate").v2;
const Conversation = require("../../models/conversation.model");
const Message = require("../../models/message.model");

// Create a conversation
const createConvo = async (req, res) => {
  const participantId = Number(req.body.id);

  if (!participantId) {
    return res.status(406).send({
      error: "Please send the id of the person you are conversing with"
    });
  }

  // If the user is trying to start a conversation with themselves
  if (req.user.id === participantId) {
    return res.status(406).json({
      error: "You cannot start a conversation with yourself!"
    });
  }

  try {
    // Checking to see if conversation already exists
    const isExists = await Conversation.findOne(req.user.id, participantId);
    if (isExists) {
      return res
        .status(406)
        .send({ error: "You already have a conversation with this user" });
    }

    // Otherwise, lets create a new conversation and save it
    const newConversation = await Conversation.insert(
      req.user.id,
      participantId
    );

    res.status(201).send(newConversation);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

// Get all conversations for a user
const fetchAllMyConvos = async (req, res) => {
  try {
    // Finds all conversations the user is associated with
    const conversations = await Conversation.find(req.user.id);

    return res.status(200).send(conversations);
  } catch (error) {
    return res
      .status(500)
      .send({ error: "Server error, unable to fetch all conversations" });
  }
};

// Get a specific conversation and its messages
const fetchConvo = async (req, res) => {
  const { id } = req.params;
  const { translate } = req.query;
  const GOOGLE_CREDENTIALS = await JSON.parse(process.env.GOOGLE_CREDENTIALS);

  try {
    // Finding all messages associated with a specific conversation
    const messages = await Message.findById(id);

    if (translate === "true") {
      const translatedMessages = messages;

      // Translating our messages
      const googleTranslate = new Translate({
        credentials: GOOGLE_CREDENTIALS,
        projectId: GOOGLE_CREDENTIALS.project_id
      });

      // Translating our messages
      for (key in translatedMessages) {
        const [translatedMessage] = await googleTranslate.translate(
          translatedMessages[key].content,
          req.user.language
        );

        translatedMessages[key].content = translatedMessage;
      }

      return res.status(200).send(translatedMessages);
    }

    return res.status(200).send(messages);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

// Send message
const sendMessage = async (req, res) => {
  const id = Number(req.params.id);
  const content = req.body.content.trim();

  // If our message is empty then
  if (content.length === 0) return res.sendStatus(406);

  if (!id || !content) {
    return res.status(406).send({
      error: "Please enter a valid message"
    });
  }

  try {
    const { hostId, participantId } = await Conversation.findById(id);

    // Want to check if the user is associated with the conversation
    if (req.user.id === hostId || req.user.id === participantId) {
      // Inserting our message and updating our conversation
      await Message.insert(id, req.user.id, content);
      await Conversation.update(id, new Date());

      return res.sendStatus(202);
    } else {
      return res.status(403).send({
        error: "You need to create a conversation with this user first"
      });
    }
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

module.exports = {
  createConvo,
  fetchAllMyConvos,
  fetchConvo,
  sendMessage
};
