const mongoose = require("mongoose");

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
      day: String,
      startTime: Number,
      endTime: Number,
      date: Date,
    }),
    default: [
      {
        day: "Monday",
        startTime: 10,
        endTime: 22,
        date: new Date("2019-6-17"),
      },
      {
        day: "Tuesday",
        startTime: 10,
        endTime: 22,
        date: new Date("2019-6-18"),
      },
      {
        day: "Wednesday",
        startTime: 10,
        endTime: 22,
        date: new Date("2019-6-19"),
      },
      {
        day: "Thursday",
        startTime: 10,
        endTime: 22,
        date: new Date("2019-6-20"),
      },
      {
        day: "Friday",
        startTime: 10,
        endTime: 22,
        date: new Date("2019-6-21"),
      },
      {
        day: "Saturday",
        startTime: 10,
        endTime: 22,
        date: new Date("2019-6-22"),
      },
      {
        day: "Sunday",
        startTime: 10,
        endTime: 22,
        date: new Date("2019-6-23"),
      },
    ],
  },
  photo: {
    type: String,
    default: "",
  },
  gender: {
    type: String,
    default: "",
  },
  email: {
    type: String,
    default: "",
  },
});

module.exports = Profile = mongoose.model("Profile", profileSchema);
