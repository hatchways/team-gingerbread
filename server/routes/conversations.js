const express = require("express");

const router = express.Router();
const protect = require("../middleware/auth");
const { startConversation, loadConversations, deleteConversation } = require("../controllers/conversation");

router.route("/start").post(startConversation);

router.route("/load/:userId").get(loadConversations);

router.route("/delete/:userId/:conversationId").delete(deleteConversation);

module.exports = router;
