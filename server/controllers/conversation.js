const User = require("../models/User");
const Conversation = require("../models/Conversation");
const Message = require("../models/Message");

// @route POST /start
// @desc start a new conversation with the logged in user and another valid user
// @access Private
exports.startConversation = async (req, res) => {
  const userId = req.user.id;
  const { converser } = req.body;

  const converserExists = await User.exists({ _id: converser });

  if (converserExists) {
    const conversationExists = await Conversation.findOne({
      users: [userId, converser],
    });

    if (conversationExists) {
      res.status(400).send("Conversation already exists.");
    } else {
      const conversation = await Conversation.create({
        users: [userId, converser],
      });

      if (!conversation) {
        res.status(500).send("Unable to start conversation.");
      } else {
        res.status(200).send({
          success: { message: "Conversation started." },
        });
      }
    }
  } else {
    res.status(400).send("Incorrect information sent.");
  }
};

// @route GET /load
// @desc loads the current logged in user's conversations
// @access Private
exports.loadConversations = async (req, res) => {
  const userId = req.user.id;

  const conversations = await Conversation.find({
    users: { $in: [userId] },
  }).populate("lastMessage");
  res.status(200).send({
    success: { conversations },
  });
};

// @route DELETE /delete/:conversationId
// @desc delete a conversation for one user at a time
// @access Private
exports.deleteConversation = async (req, res) => {
  const userId = req.user.id;
  const { conversationId } = req.params;

  const conversationExists = await Conversation.exists({ _id: conversationId });

  if (conversationExists) {
    const curr = await Conversation.findById({ _id: conversationId }).select({ users: 1, _id: 0 });

    if (curr.users.length === 2) {
      const updatedUsers = curr.users.filter((user) => String(user) !== String(userId));

      // eslint-disable-next-line prettier/prettier
      await Conversation.findByIdAndUpdate(
        { _id: conversationId },
        { users: updatedUsers },
        { new: true },
      );

      res.status(200).send({
        success: { message: "Conversation deleted." },
      });
    } else {
      await Conversation.deleteOne({ _id: conversationId });

      await Message.deleteMany({ conversationId });

      res.status(200).send({
        success: { message: "Conversation deleted." },
      });
    }
  } else {
    res.status(400).send("Incorrect information sent.");
  }
};

// @route /read/:conversationId
// @desc set the lastMessageRead field to true
// @access Private
exports.lastMessageRead = async (req, res) => {
  const userId = req.user.id;
  const { conversationId } = req.params;

  if (conversationId) {
    const curr = await Conversation.findById({ _id: conversationId }).select({
      isLastMessageRead: 1,
      willRead: 1,
      _id: 0,
    });

    if (curr && !curr.isLastMessageRead && String(curr.willRead[0]) === String(userId)) {
      await Conversation.findByIdAndUpdate({ _id: conversationId }, { isLastMessageRead: true });

      res.status(200).send({ success: { message: "Message read." } });
    } else {
      res.status(400).send("Incorrect information sent.");
    }
  } else {
    res.status(400).send("Incorrect information sent.");
  }
};
