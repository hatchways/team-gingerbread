const isValidObjectId = require("mongoose").isValidObjectId;
const Availability = require("../models/Availability");

exports.createSchedule = async (req, res) => {
  const userId = req.body.userId;
  const existingAvailability = await Availability.findOne({ sitterId: userId });
  if (existingAvailability) {
    res.json({ error: "A schedule for this user already exists!", userId, schedule: existingAvailability });
  } else {
    const newAvailability = new Availability({
      sitterId: userId,
    });
    const saved = await newAvailability.save();
    res.json({
      success: {
        schedule: saved,
      },
    });
  }
};

exports.getSchedule = async (req, res) => {
  if (isValidObjectId(req.params.scheduleId)) {
    const schedule = await Availability.findById(req.params.scheduleId);
    if (!schedule) {
      res.json({ error: "A schedule with this id does not exist!" });
    } else {
      res.json({ success: schedule });
    }
  } else {
    res.json({ error: "Invalid scheduleId" });
  }
};

exports.getActiveSchedule = async (req, res) => {
  const userId = req.body.userId;
  if (isValidObjectId(userId)) {
    const schedule = await Availability.findOne({ sitterId: userId });
    if (!schedule) {
      res.json({ error: "A schedule associated with this userId does not exist!" });
    } else {
      if (schedule.defaultSchedule.active) {
        res.json({
          success: {
            schedule: schedule.defaultSchedule.availability,
          },
        });
      } else {
        const activeAlternate = schedule.alternateSchedules.find((altSchedule) => altSchedule.active === true);
        if (activeAlternate) {
          res.json({
            success: {
              schedule: activeAlternate.availability,
            },
          });
        } else {
          res.json({ error: "None of the schedules associated with this userId are active!" });
        }
      }
    }
  } else {
    res.json({ error: "Invalid userId" });
  }
};

exports.getUserSchedule = async (req, res) => {
  const userId = req.body.userId;
  if (isValidObjectId(userId)) {
    const schedule = await Availability.findOne({ sitterId: userId });
    if (!schedule) {
      res.json({ error: "A schedule associated with this userId does not exist!" });
    } else {
      res.json({ success: schedule });
    }
  } else {
    res.json({ error: "Invalid userId" });
  }
};

exports.setActiveSchedule = async (req, res) => {
  const availabilityId = req.body.availabilityId;
  if (isValidObjectId(availabilityId)) {
    const userAvailability = await Availability.findById(availabilityId);
    if (!userAvailability) {
      res.json({ error: "A schedule with this id does not exist!" });
    } else {
    }
  } else {
    res.json({ error: "Invalid scheduleId" });
  }
  const userId = req.body.userId;
  if (isValidObjectId(userId)) {
    const schedule = await Availability.findOne({ sitterId: userId });
    if (!schedule) {
      res.json({ error: "A schedule associated with this userId does not exist!" });
    } else {
      let scheduleToActivate = schedule.defaultSchedule;
      let scheduleToDeactivate = schedule.defaultSchedule;
      if (schedule.defaultSchedule.active) {
        scheduleToActivate = schedule.alternateSchedules.find((altSchedule) => altSchedule.active === false);
      } else {
        scheduleToDeactivate = schedule.alternateSchedules.find((altSchedule) => altSchedule.active === true);
      }
      scheduleToActivate.active = true;
      scheduleToDeactivate.active = false;
      const updatedAvailability = await schedule.save();
      res.json({
        success: {
          updatedAvailability,
        },
      });
    }
  } else {
    res.json({ error: "Invalid userId" });
  }
};
