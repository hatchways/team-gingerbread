const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema.Types;
const usersArrayBound = (val) => val.length <= 2;
const willReadArrayBound = (val) => val.length <= 1;

const conversationSchema = new mongoose.Schema(
  {
    users: {
      type: [
        {
          type: ObjectId,
          ref: "User",
        },
      ],
      validate: [usersArrayBound, "Exceeds limit for number of users part of a conversation."],
      required: true,
      default: [],
    },
    lastMessage: {
      type: ObjectId,
      required: false,
      ref: "Message",
    },
    isLastMessageRead: {
      type: Boolean,
      default: false,
      required: false,
    },
    willRead: {
      type: [
        {
          type: ObjectId,
          ref: "User",
        },
      ],
      validate: [willReadArrayBound, "Exceeds limit for number of users part of a conversation."],
      required: false,
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = Conversation = mongoose.model("Conversation", conversationSchema);
