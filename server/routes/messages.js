const express = require("express");

const router = express.Router();
const protect = require("../middleware/auth");
const { createNewMessage, loadMessages, deleteMessage } = require("../controllers/message");

router.route("/new").post(protect, createNewMessage);

router.route("/load/:conversationId").get(protect, loadMessages);

router.route("/delete/:_id").delete(protect, deleteMessage);

module.exports = router;
