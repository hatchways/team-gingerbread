const mongoose = require("mongoose");

const bookingRequestSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    sitter_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    start: {
        type: Date,
        default: Date.now,
        required: true
    },
    end: {
        type: Date,
        default: Date.now,
        required: true
    },
    description: {
        type: String,
        default: '',
    },
    accepted: {
        type: Boolean,
        default: false,
    },
    declined: {
        type: Boolean,
        default: false,
    },
    paid: {
        type: Boolean,
        default: false,
    }
})

module.exports = BookingRequest = mongoose.model("Request", bookingRequestSchema)