const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  sitterId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  description: {
    type: String,
    required: false,
  },
});

module.exports = Review = mongoose.model("Review", reviewSchema);
