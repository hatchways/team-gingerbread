const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const {
  createNotification,
  readNotification,
  getAllNotifications,
  getUnreadNotifications,
} = require("../controllers/notification");

router.route("/create").post(createNotification);

router.route("/read/:id").patch(readNotification);

router.route("/all/:recipient").get(getAllNotifications);

router.route("/unread/:recipient").get(getUnreadNotifications);

module.exports = router;
