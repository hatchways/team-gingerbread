const { validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const Conversation = require("../models/Conversation");
const Message = require("../models/Message");

// @route POST /start
// @desc start a new conversation with the logged in user and another valid user
// @access Private
exports.startConversation = asyncHandler(async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const { converser } = errors.mapped();

      res.status(422).send(converser.msg);
      return;
    }

    const userId = req.user.id;
    const { converser } = req.body;

    const converserExists = await User.exists({ _id: converser });

    if (converserExists) {
      const conversationExists = await Conversation.findOne({
        users: [userId, converser],
      });

      if (conversationExists) {
        res.status(403).send({ error: { message: "Cannot start multiple conversations with the same user." } });
      } else {
        const conversation = await Conversation.create({
          users: [userId, converser],
        });

        if (!conversation) {
          res.status(500).send({ error: { message: "Unable to start conversation." } });
        } else {
          res.status(200).send({ success: { message: "Conversation started." } });
        }
      }
    } else {
      res.status(404).send({ error: { message: "User not found." } });
    }
  } catch (e) {
    next(e);
  }
});

// @route GET /load
// @desc loads the current logged in user's conversations
// @access Private
exports.loadConversations = async (req, res) => {
  const userId = req.user.id;

  const conversations = await Conversation.find({
    users: { $in: [userId] },
  }).populate("lastMessage");

  res.status(200).send({ success: { conversations } });
};

// @route DELETE /delete/:conversationId
// @desc delete a conversation for one user at a time
// @access Private
exports.deleteConversation = asyncHandler(async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const { conversationId } = errors.mapped();

      res.status(422).send(conversationId.msg);
      return;
    }

    const userId = req.user.id;
    const { conversationId } = req.params;

    const currConversation = await Conversation.findById({ _id: conversationId });

    if (currConversation) {
      if (currConversation.users.length === 2) {
        const updated = currConversation.users.filter((user) => String(user) !== String(userId));

        currConversation.users = updated;
        await currConversation.save();

        res.status(200).send({ success: { message: "Conversation deleted." } });
      } else {
        await Conversation.deleteOne({ _id: conversationId });

        await Message.deleteMany({ conversationId });

        res.status(200).send({ success: { message: "Conversation deleted." } });
      }
    } else {
      res.status(404).send({ error: { message: "Conversation not found." } });
    }
  } catch (e) {
    next(e);
  }
});
