const mongoose = require("mongoose");
const Conversation = require("../models/Conversation");
const Message = require("../models/Message");

exports.startConversation = async (req, res) => {
  const { user1, user2 } = req.body;

  if (user1 && user2) {
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
  const { _id } = req.params;

  if (_id) {
    const conversations = await Conversation.find({
      users: { $in: [_id] },
    });
    res.status(200).send({
      success: { conversations },
    });
  } else {
    res.status(400).send("Incorrect information sent.");
  }
};

exports.deleteConversation = async (req, res) => {
  const { _id } = req.params;

  if (_id) {
    await Conversation.deleteOne({ _id });

    await Message.deleteMany({ conversationId: _id });

    res.status(200).send({
      success: { message: "Conversation deleted." },
    });
  } else {
    res.status(400).send("Incorrect information sent");
  }
};
