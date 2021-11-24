const Notification = require("../models/Notifications");
const asyncHandler = require("express-async-handler");

// @route POST /notifications/create
// @desc create new notification
// @access Public
exports.createNotification = asyncHandler(async (req, res, next) => {
    const notification = new Notification({
        type: req.body.type,
        title: req.body.title,
        description: req.body.description,
        read: req.body.read,
        date: req.body.date
    });
    const newNotification = await notification.save()
    res.status(200).json({
        success: {
            notification: newNotification,
        }
    })
});

// @route POST /notifications/read
// @desc mark notification as read
// @access Public
exports.readNotification = asyncHandler(async (req, res, next) => {
    const notification = await Notification.findById(req.body.id);
    if (!notification) {
        res.status(404);
        throw new Error("Notification doesn't exist")
    }
    notification.set('read', true);
    const updatedNotification = await notification.save();
    res.status(200).json({
        success: {
            notification: updatedNotification
        }
    })
})

// @route GET /notifications/all
// @desc get all notifications
// @access Public
exports.getAllNotifications = asyncHandler(async (req, res, next) => {
    const notifications = await Notification.find({}); 
    res.status(200).json({
        success: {
            notifications: notifications
        }
    })
})

// @route GET /notifications/unread
// @desc get all unread notifications
// @access Public
exports.getUnreadNotifications = asyncHandler(async (req, res, next) => {
    const notifications = await Notification.find({}); 
    const unreadNotifications = notifications.filter(n => n.read === false);
    res.status(200).json({
        success: {
            notifications: unreadNotifications
        }
    })
})

