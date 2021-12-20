const express = require("express");

const router = express.Router();
const protect = require("../middleware/auth");
const { startConversation, loadConversations, deleteConversation } = require("../controllers/conversation");

router.route("/start").post(protect, startConversation);

router.route("/load/:_id").get(protect, loadConversations);

router.route("/delete/:_id").delete(protect, deleteConversation);

module.exports = router;
