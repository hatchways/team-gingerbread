const express = require("express");

const router = express.Router();
const protect = require("../middleware/auth");
const { startConversation, loadConversations, deleteConversation } = require("../controllers/conversation");

router.route("/start").post(protect, startConversation);

router.route("/load").get(protect, loadConversations);

router.route("/delete").post(protect, deleteConversation);

module.exports = router;
