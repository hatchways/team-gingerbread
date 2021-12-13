const express = require("express");

const router = express.Router();
const protect = require("../middleware/auth");
const { createNewMessage, loadMessages, deleteMessage } = require("../controllers/message");

router.route("/new").post(protect, createNewMessage);

router.route("/load").post(protect, loadMessages);

router.route("/delete").post(protect, deleteMessage);

module.exports = router;
