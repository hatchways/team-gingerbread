const mongoose = require("mongoose");

const usersArrayBound = (val) => val.length <= 2;

const conversationSchema = new mongoose.Schema(
  {
    users: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
      validate: [usersArrayBound, "Exceeds limit for number of users part of a conversation."],
      required: true,
      default: [],
    },
    lastMessage: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "Message",
    },
  },
  { timestamps: true }
);

module.exports = Conversation = mongoose.model("Conversation", conversationSchema);
