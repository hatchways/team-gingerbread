const express = require("express");

const router = express.Router();
const protect = require("../middleware/auth");
const { createNewMessage, loadMessages, deleteMessage } = require("../controllers/message");

router.route("/new").post(createNewMessage);

router.route("/load/:conversationId").get(loadMessages);

router.route("/delete/:userId/:messageId").delete(deleteMessage);

module.exports = router;
