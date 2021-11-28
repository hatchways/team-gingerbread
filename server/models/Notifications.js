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
    },
    image: {
        type: String,
        default: ""
    },
})

module.exports = Notification = mongoose.model("Notification", notificationSchema);