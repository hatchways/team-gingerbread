const mongoose = require("mongoose");

const availabilitySchema = mongoose.Schema({
  sitterId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Profile",
  },
  schedules: {
    type: [
      {
        name: String,
        active: Boolean,
        availability: {
          monday: {
            startTime: Number,
            endTime: Number,
            available: Boolean,
          },
          tuesday: {
            startTime: Number,
            endTime: Number,
            available: Boolean,
          },
          wednesday: {
            startTime: Number,
            endTime: Number,
            available: Boolean,
          },
          thursday: {
            startTime: Number,
            endTime: Number,
            available: Boolean,
          },
          friday: {
            startTime: Number,
            endTime: Number,
            available: Boolean,
          },
          saturday: {
            startTime: Number,
            endTime: Number,
            available: Boolean,
          },
          sunday: {
            startTime: Number,
            endTime: Number,
            available: Boolean,
          },
        },
      },
    ],
    required: true,
    default: [
      {
        name: "Default Schedule",
        active: true,
        availability: {
          monday: {
            startTime: -1,
            endTime: -1,
            available: false,
          },
          tuesday: {
            startTime: -1,
            endTime: -1,
            available: false,
          },
          wednesday: {
            startTime: -1,
            endTime: -1,
            available: false,
          },
          thursday: {
            startTime: -1,
            endTime: -1,
            available: false,
          },
          friday: {
            startTime: -1,
            endTime: -1,
            available: false,
          },
          saturday: {
            startTime: -1,
            endTime: -1,
            available: false,
          },
          sunday: {
            startTime: -1,
            endTime: -1,
            available: false,
          },
        },
      },
      {
        name: "Holiday Schedule",
        active: false,
        availability: {
          monday: {
            startTime: -1,
            endTime: -1,
            available: false,
          },
          tuesday: {
            startTime: -1,
            endTime: -1,
            available: false,
          },
          wednesday: {
            startTime: -1,
            endTime: -1,
            available: false,
          },
          thursday: {
            startTime: -1,
            endTime: -1,
            available: false,
          },
          friday: {
            startTime: -1,
            endTime: -1,
            available: false,
          },
          saturday: {
            startTime: -1,
            endTime: -1,
            available: false,
          },
          sunday: {
            startTime: -1,
            endTime: -1,
            available: false,
          },
        },
      },
    ],
  },
  overrides: {
    type: [
      {
        date: Date,
        startTime: Number,
        endTime: Number,
      },
    ],
    required: false,
  },
});

module.exports = Availability = mongoose.model("Availability", availabilitySchema);
