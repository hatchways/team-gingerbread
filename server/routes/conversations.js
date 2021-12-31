const express = require("express");

const router = express.Router();
const protect = require("../middleware/auth");
const validate = require("../middleware/reqValidation");
const { startConversation, loadConversations, deleteConversation } = require("../controllers/conversation");

router.route("/start").post(protect, validate("startConversation"), startConversation);

router.route("/load").post(protect, loadConversations);

router.route("/delete/:conversationId").delete(protect, validate("deleteConversation"), deleteConversation);

module.exports = router;
