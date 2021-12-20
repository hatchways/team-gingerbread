const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema.Types;

const messageSchema = new mongoose.Schema(
  {
    conversationId: {
      type: ObjectId,
      ref: "Conversation",
      required: true,
    },
    author: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      required: true,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = Message = mongoose.model("Message", messageSchema);
