const express = require("express");

const router = express.Router();
const protect = require("../middleware/auth");
const validate = require("../middleware/reqValidation");
const { createNewMessage, loadMessages, updateIsRead } = require("../controllers/message");

router.route("/new").post(protect, validate("createNewMessage"), createNewMessage);

router.route("/load/:conversationId").get(protect, validate("loadMessages"), loadMessages);

router.route("/read/:messageId").patch(protect, validate("updateIsRead"), updateIsRead);

module.exports = router;
