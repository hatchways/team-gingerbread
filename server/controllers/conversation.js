const mongoose = require("mongoose");
const Conversation = require("../models/Conversation");

exports.startConversation = async (req, res) => {
  const { user1, user2 } = req.body;

  const conversationExists = await Conversation.findOne({
    users: [mongoose.Types.ObjectId(user1), mongoose.Types.ObjectId(user2)],
  });

  if (conversationExists) {
    res.status(400).send("Conversation already exists.");
  } else {
    const conversation = await Conversation.create({
      users: [user1, user2],
    });

    if (!conversation) {
      res.status(500).send("Unable to start conversation.");
    }

    res.status(200).send({
      success: { message: "Conversation started." },
    });
  }
};

exports.loadConversations = async (req, res) => {
  const { user } = req.body;
  const conversations = await Conversation.find({
    users: { $in: [mongoose.Types.ObjectId(user)] },
  });

  if (!conversations.length) {
    res.status(400).send("Conversations do not exist.");
  } else {
    res.status(200).send({
      success: { message: `${conversations.length} conversations loaded.` },
    });
  }
};

exports.deleteConversation = async (req, res) => {
  const { user1, user2 } = req.body;

  const deleteConversation = await Conversation.deleteOne({
    users: [mongoose.Types.ObjectId(user1), mongoose.Types.ObjectId(user2)],
  });

  if (!deleteConversation.n) {
    res.status(400).send("Conversation does not exist.");
  } else {
    res.status(200).send({
      success: { message: "Conversation deleted." },
    });
  }
};