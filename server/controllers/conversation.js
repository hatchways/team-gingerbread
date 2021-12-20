const mongoose = require("mongoose");
const User = require("../models/User");
const Conversation = require("../models/Conversation");
const Message = require("../models/Message");

exports.startConversation = async (req, res) => {
  const { user1, user2 } = req.body;

  const usersExist = await User.countDocuments({ _id: { $in: [user1, user2] } });

  if (usersExist === 2) {
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
  } else {
    res.status(400).send("Incorrect information sent.");
  }
};

exports.loadConversations = async (req, res) => {
  const { userId } = req.params;

  const userExists = await User.exists({ _id: userId });

  if (userExists) {
    const conversations = await Conversation.find({
      users: { $in: [userId] },
    });
    res.status(200).send({
      success: { conversations },
    });
  } else {
    res.status(400).send("Incorrect information sent.");
  }
};

exports.deleteConversation = async (req, res) => {
  const { userId, conversationId } = req.params;

  const userExists = await User.exists({ _id: userId });

  if (userExists) {
    await Conversation.deleteOne({ _id: conversationId });

    await Message.deleteMany({ conversationId });

    res.status(200).send({
      success: { message: "Conversation deleted." },
    });
  } else {
    res.status(400).send("Incorrect information sent.");
  }
};
