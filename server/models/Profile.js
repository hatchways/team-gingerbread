const mongoose = require("mongoose");
const Review = require("../models/Review");

const timeSlot = new mongoose.Schema({ start: Date, end: Date });

const profileSchema = new mongoose.Schema({
  firstName: {
    type: String,
    default: "",
  },
  lastName: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    default: "",
  },
  address: {
    type: String,
    default: "",
  },
  phoneNumber: {
    type: String,
    default: "",
  },
  dateOfBirth: {
    type: Date,
    default: null,
  },
  available: {
    type: Boolean,
    default: false,
  },
  availability: {
    type: String,
    default: "",
  },
  availableTime: {
    type: Array({
      date: Date,
      startTime: Number,
      endTime: Number,
      available: Boolean,
    }),
    default: [
      {
        date: new Date("2019-6-17"),
        startTime: 10,
        endTime: 22,
        available: true,
      },
      {
        date: new Date("2019-6-18"),
        startTime: 10,
        endTime: 22,
        available: true,
      },
      {
        date: new Date("2019-6-19"),
        startTime: 10,
        endTime: 22,
        available: true,
      },
      {
        date: new Date("2019-6-20"),
        startTime: 10,
        endTime: 22,
        available: true,
      },
      {
        date: new Date("2019-6-21"),
        startTime: 10,
        endTime: 22,
        available: true,
      },
      {
        date: new Date("2019-6-22"),
        startTime: 10,
        endTime: 22,
        available: true,
      },
      {
        date: new Date("2019-6-23"),
        startTime: 10,
        endTime: 22,
        available: true,
      },
    ],
  },
  photo: {
    url: {
      type: String,
      default: "",
    },
    key: {
      type: String,
      default: "",
    },
  },
  gender: {
    type: String,
    default: "",
  },
  email: {
    type: String,
    default: "",
  },
  isSitter: {
    type: Boolean,
    default: false,
  },
});

module.exports = Profile = mongoose.model("Profile", profileSchema);
