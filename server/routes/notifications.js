const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const {
  createNotification,
  readNotification,
  getAllNotifications,
  getUnreadNotifications,
} = require("../controllers/notification");

router.route("/create").post(protect, createNotification);

router.route("/read/:id").patch(protect, readNotification);

router.route("/all").get(protect, getAllNotifications);

router.route("/unread").get(protect, getUnreadNotifications);

module.exports = router;
