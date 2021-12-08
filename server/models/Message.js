const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  convsersationId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  message: {
    type: String,
    default: "",
  },
});

module.exports = Message = mongoose.model("Message", messageSchema);
