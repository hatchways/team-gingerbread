const express = require("express");

const router = express.Router();
const protect = require("../middleware/auth");
const {
  startConversation,
  loadConversations,
  lastMessageRead,
  deleteConversation,
} = require("../controllers/conversation");

router.route("/start").post(protect, startConversation);

router.route("/load").get(protect, loadConversations);

router.route("/delete/:conversationId").delete(protect, deleteConversation);

router.route("/read/:conversationId").patch(protect, lastMessageRead);

module.exports = router;
