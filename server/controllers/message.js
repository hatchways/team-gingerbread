const Message = require("../models/Message");
const Conversation = require("../models/Conversation");

// @route POST /new
// @desc create a new message associated with a conversation
// @access Private
exports.createNewMessage = async (req, res) => {
  const userId = req.user.id;
  const { conversationId, content } = req.body;

  if (conversationId && content) {
    const conversation = await Conversation.findById({ _id: conversationId });

    if (!conversation) {
      res.status(400).send("Conversation not found.");
    } else {
      const newMessage = await Message.create({
        conversationId,
        author: userId,
        content,
      });

      if (!newMessage) {
        res.status(500).send("An error occurred while sending a message.");
      } else {
        const willRead = conversation.users.filter((user) => String(user) !== String(userId));

        await Conversation.findByIdAndUpdate(
          { _id: conversationId },
          { lastMessage: newMessage._id, isLastMessageRead: false, willRead },
          { new: true }
        );

        res.status(200).send({ success: newMessage });
      }
    }
  } else {
    res.status(400).send("Incorrect information sent.");
  }
};

// @route GET /load/:conversationId
// @desc load all messages for a conversation
// @access Private
exports.loadMessages = async (req, res) => {
  const { conversationId } = req.params;

  if (conversationId) {
    const conversationExists = await Conversation.exists({ _id: conversationId });

    if (conversationExists) {
      const messages = await Message.find({ conversationId });

      res.status(200).send({ success: messages });
    } else {
      res.status(400).send("Incorrect information sent.");
    }
  }
};
