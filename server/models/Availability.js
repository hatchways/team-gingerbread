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
            availabile: Boolean,
          },
          tuesday: {
            startTime: Number,
            endTime: Number,
            availabile: Boolean,
          },
          wednesday: {
            startTime: Number,
            endTime: Number,
            availabile: Boolean,
          },
          thursday: {
            startTime: Number,
            endTime: Number,
            availabile: Boolean,
          },
          friday: {
            startTime: Number,
            endTime: Number,
            availabile: Boolean,
          },
          saturday: {
            startTime: Number,
            endTime: Number,
            availabile: Boolean,
          },
          sunday: {
            startTime: Number,
            endTime: Number,
            availabile: Boolean,
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
            availabile: false,
          },
          tuesday: {
            startTime: -1,
            endTime: -1,
            availabile: false,
          },
          wednesday: {
            startTime: -1,
            endTime: -1,
            availabile: false,
          },
          thursday: {
            startTime: -1,
            endTime: -1,
            availabile: false,
          },
          friday: {
            startTime: -1,
            endTime: -1,
            availabile: false,
          },
          saturday: {
            startTime: -1,
            endTime: -1,
            availabile: false,
          },
          sunday: {
            startTime: -1,
            endTime: -1,
            availabile: false,
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
            availabile: false,
          },
          tuesday: {
            startTime: -1,
            endTime: -1,
            availabile: false,
          },
          wednesday: {
            startTime: -1,
            endTime: -1,
            availabile: false,
          },
          thursday: {
            startTime: -1,
            endTime: -1,
            availabile: false,
          },
          friday: {
            startTime: -1,
            endTime: -1,
            availabile: false,
          },
          saturday: {
            startTime: -1,
            endTime: -1,
            availabile: false,
          },
          sunday: {
            startTime: -1,
            endTime: -1,
            availabile: false,
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
