const mongoose = require("mongoose");
const Message = require("../models/Message");
const Conversation = require("../models/Conversation");

exports.createNewMessage = async (req, res) => {
  const { conversationId, author, content } = req.body;

  if (conversationId && author && content) {
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

  if (conversationId) {
    const messages = await Message.find({ conversationId });

    res.status(200).send({ success: messages });
  } else {
    res.status(400).send("Incorrect information sent.");
  }
};

exports.deleteMessage = async (req, res) => {
  const { _id } = req.params;

  if (_id) {
    const deleteMessage = await Message.deleteOne({ _id });

    if (!deleteMessage.n) {
      res.status(400).send("Message does not exist.");
    } else {
      res.status(200).send({ success: { message: "Message deleted." } });
    }
  } else {
    res.status(400).send("Incorrect information sent.");
  }
};
