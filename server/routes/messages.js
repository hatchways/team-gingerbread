const express = require("express");

const router = express.Router();
const protect = require("../middleware/auth");
const { createNewMessage, loadMessages } = require("../controllers/message");

router.route("/new").post(protect, createNewMessage);

router.route("/load/:conversationId").get(protect, loadMessages);

module.exports = router;
