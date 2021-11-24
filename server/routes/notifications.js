const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth');
const {
    createNotification,
    readNotification,
    getAllNotifications,
    getUnreadNotifications
} = require('../controllers/notification');

router.route('/create').post(createNotification);

router.route('/read').post(readNotification);

router.route('/all').get(getAllNotifications);

router.route('/unread').get(getUnreadNotifications);

module.exports = router;