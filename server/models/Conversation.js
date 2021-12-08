const mongoose = require("mongoose");

const messagesArrayBound = (val) => val.length <= 500;

const conversationSchema = new mongoose.Schema({
  startOfConversation: {
    type: Date,
    required: true,
    default: Date.now,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  converser: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  messages: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
      },
    ],
    validate: [messagesArrayBound, "Exceeded number of messages limit."],
    required: false,
    default: [],
  },
});

module.exports = Conversation = mongoose.model("Conversation", conversationSchema);
