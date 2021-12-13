const mongoose = require("mongoose");
const Message = require("../models/Message");
const Conversation = require("../models/Conversation");

exports.createNewMessage = async (req, res) => {
  const { conversationId, author, content } = req.body;

  const conversations = await Conversation.find({ _id: mongoose.Types.ObjectId(conversationId) });

  if (!conversations.length) {
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
      await Conversation.findByIdAndUpdate(
        { _id: mongoose.Types.ObjectId(conversationId) },
        { lastMessage: mongoose.Types.ObjectId(newMessage._id) }
      );
      res.status(200).send({ success: newMessage });
    }
  }
};

exports.loadMessages = async (req, res) => {
  const { conversationId } = req.body;

  const messages = await Message.find({ conversationId: mongoose.Types.ObjectId(conversationId) });

  if (!messages) {
    res.status(400).send("Conversation does not exist");
  } else {
    res.status(200).send({ success: messages });
  }
};

exports.deleteMessage = async (req, res) => {
  const { _id } = req.body;

  const deleteMessage = await Message.deleteOne({ _id: mongoose.Types.ObjectId(_id) });

  if (!deleteMessage.n) {
    res.status(400).send("Message does not exist.");
  } else {
    res.status(200).send({ success: { message: "Message deleted." } });
  }
};
