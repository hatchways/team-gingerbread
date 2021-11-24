const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
    type: {
        type: String,
        default: ""
    },
    title: {
        type: String,
        default: ""
    },
    description: {
        type: String,
        default: ""
    },
    read: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        default: null
    }
})

module.exports = Notification = mongoose.model("Notification", notificationSchema);