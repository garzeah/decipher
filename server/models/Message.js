const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
	conversationID: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Conversation"
	},
	sender: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User"
	},
	content: {
		type: String
	},
	timeCreated: {
		type: String,
		default: new Date()
	}
});

module.exports = mongoose.model("messages", messageSchema);