const Notification = require("../models/Notifications");
const asyncHandler = require("express-async-handler");

// @route POST /notifications/create
// @desc create new notification
// @access Public
exports.createNotification = asyncHandler(async (req, res, next) => {
  const notification = new Notification(({ type, title, description, read, date, image, recipient } = req.body));

  const newNotification = await notification.save();
  res.status(200).json({
    success: {
      notification: newNotification,
    },
  });
});

// @route PATCH /notifications/read
// @desc mark notification as read
// @access Public
exports.readNotification = asyncHandler(async (req, res) => {
  const notification = await Notification.findById(req.params.id);
  if (!notification) {
    res.status(404);
    throw new Error("Notification doesn't exist");
  }
  notification.set("read", true);
  const updatedNotification = await notification.save();
  res.status(200).json({
    success: {
      notification: updatedNotification,
    },
  });
});

// @route GET /notifications/all
// @desc get all notifications
// @access Public
exports.getAllNotifications = asyncHandler(async (req, res) => {
  const notifications = await Notification.find({ recipient: req.user.id });
  res.status(200).json({
    success: {
      notifications,
    },
  });
});

// @route GET /notifications/unread
// @desc get all unread notifications
// @access Public
exports.getUnreadNotifications = asyncHandler(async (req, res) => {
  const notifications = await Notification.find({ recipient: req.user.id, read: false });
  res.status(200).json({
    success: {
      notifications,
    },
  });
});
