const mongoose = require("mongoose");
const Conversation = require("../models/Conversation");
const Message = require("../models/Message");

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
    } else {
      res.status(200).send({
        success: { message: "Conversation started." },
      });
    }
  }
};

exports.loadConversations = async (req, res) => {
  const { user } = req.body;
  const conversations = await Conversation.find({
    users: { $in: [mongoose.Types.ObjectId(user)] },
  }).populate("lastMessage");

  if (!conversations.length) {
    res.status(400).send("Conversations do not exist.");
  } else {
    res.status(200).send({
      success: { conversations },
    });
  }
};

exports.deleteConversation = async (req, res) => {
  const { _id } = req.body;

  const deleteConversation = await Conversation.deleteOne({ _id: mongoose.Types.ObjectId(_id) });

  const deleteMessages = await Message.deleteMany({ conversationId: mongoose.Types.ObjectId(_id) });

  if (!deleteConversation.n) {
    res.status(400).send("Conversation does not exist.");
  } else if (!deleteMessages.n) {
    res.status(400).send("No messages exist for that conversation.");
  } else {
    res.status(200).send({
      success: { message: "Conversation deleted." },
    });
  }
};
