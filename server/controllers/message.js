const mongoose = require("mongoose");

const User = require("../models/User");
const Message = require("../models/Message");
const Conversation = require("../models/Conversation");

exports.createNewMessage = async (req, res) => {
  const { conversationId, author, content } = req.body;

  const userExists = await User.exists({ _id: author });

  if (conversationId && userExists && content) {
    const conversation = await Conversation.findById({ _id: conversationId });

    if (!conversation) {
      res.status(400).send("Conversation not found.");
    } else {
      const newMessage = await Message.create({
        conversationId,
        author,
        content,
      });

      if (!newMessage) {
        res.status(500).send("An error occurred while sending a message.");
      } else {
        res.status(200).send({ success: newMessage });
      }
    }
  } else {
    res.status(400).send("Incorrect information sent.");
  }
};

exports.loadMessages = async (req, res) => {
  const { conversationId } = req.params;

  const conversationExists = await Conversation.exists({ _id: conversationId });

  if (conversationExists) {
    const messages = await Message.find({ conversationId });

    res.status(200).send({ success: messages });
  } else {
    res.status(400).send("Incorrect information sent.");
  }
};

exports.deleteMessage = async (req, res) => {
  const { userId, messageId } = req.params;

  const userExists = User.exists({ _id: userId });

  if (userExists) {
    const deleteMessage = await Message.deleteOne({ _id: messageId });

    if (!deleteMessage.n) {
      res.status(400).send("Message does not exist.");
    } else {
      res.status(200).send({ success: { message: "Message deleted." } });
    }
  } else {
    res.status(400).send("Incorrect information sent.");
  }
};
