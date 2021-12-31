const { validationResult } = require("express-validator");
const Message = require("../models/Message");
const Conversation = require("../models/Conversation");

// @route POST /new
// @desc create a new message associated with a conversation
// @access Private
exports.createNewMessage = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const { conversationId, content } = errors.mapped();

      if (conversationId && content) {
        res.status(422).send(`${conversationId.msg} ${content.msg}`);
      } else if (conversationId && !content) {
        res.status(422).send(conversationId.msg);
      } else res.status(422).send(content.msg);

      return;
    }

    const userId = req.user.id;
    const { conversationId, content } = req.body;

    const currConversation = await Conversation.findById({ _id: conversationId });

    if (currConversation) {
      const newMessage = await Message.create({
        conversationId,
        author: userId,
        content,
      });

      currConversation.lastMessage = newMessage;
      await currConversation.save();

      if (newMessage) {
        res.status(200).send({ success: newMessage });
      } else {
        res.status(500).send("An error occurred while sending a message.");
      }
    } else {
      res.status(404).send("Conversation not found.");
    }
  } catch (e) {
    res.status(500).send("Unable to start conversation.");
  }
};

// @route GET /load/:conversationId
// @desc load all messages for a conversation the logged in user is part of
// @access Private
exports.loadMessages = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const { conversationId } = errors.mapped();

      res.status(422).send(conversationId.msg);
      return;
    }
    const userId = req.user.id;
    const { conversationId } = req.params;

    const conversationExists = await Conversation.exists({
      _id: conversationId,
      users: { $in: [userId] },
    });

    if (conversationExists) {
      const messages = await Message.find({ conversationId });

      res.status(200).send({ success: messages });
    } else {
      res.status(404).send("Conversation does not exist.");
    }
  } catch (e) {
    res.status(500).send("Unable to message(s).");
  }
};

// @route PATCH /read/:messageId
// @desc update read status of all received messages
// @access Private
exports.updateIsRead = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const { messageId } = errors.mapped();

      res.status(422).send(messageId.error);
      return;
    }
    const userId = req.user.id;
    const { messageId } = req.params;

    const currMessage = await Message.findById({ _id: messageId });

    if (currMessage) {
      if (String(currMessage.author) === String(userId)) {
        res.status(403).send("User cannot change read status of own message(s).");
      } else {
        await Message.updateMany(
          {
            conversationId: currMessage.conversationId,
            author: currMessage.author,
            isRead: false,
          },
          { $set: { isRead: true } }
        );

        res.status(200).send("Message(s) read.");
      }
    } else {
      res.status(404).send("Message not found.");
    }
  } catch (e) {
    res.status(500).send("Unable to set message status as read.");
  }
};
