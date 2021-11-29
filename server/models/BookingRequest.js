const mongoose = require("mongoose");

const bookingRequestSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    sitterId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    start: {
      type: Date,
      default: Date.now,
      required: true,
    },
    end: {
      type: Date,
      default: Date.now,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    accepted: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "declined"],
      default: "pending",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = BookingRequest = mongoose.model("Request", bookingRequestSchema);
