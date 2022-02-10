const isValidObjectId = require("mongoose").isValidObjectId;
const Availability = require("../models/Availability");

// @route POST /availability
// @desc creates new schedule
// @access Private
exports.createSchedule = async (req, res) => {
  const userId = req.body.userId;
  if (isValidObjectId(userId)) {
    const existingAvailability = await Availability.findOne({ sitterId: userId });
    if (existingAvailability) {
      res.json({ error: "A schedule for this user already exists!" });
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
  } else {
    res.json({ error: "Invalid userId" });
  }
};

// @route GET /availability/:scheduleId
// @desc gets schedule by scheduleId
// @access Private
exports.getSchedule = async (req, res) => {
  const scheduleId = req.params.scheduleId;
  if (isValidObjectId(scheduleId)) {
    const schedule = await Availability.findById(scheduleId);
    if (!schedule) {
      res.json({ error: "A schedule with this id does not exist!" });
    } else {
      res.json({ success: schedule });
    }
  } else {
    res.json({ error: "Invalid scheduleId" });
  }
};

// @route GET /availability/active/:sitterId
// @desc gets active schedule by sitterId
// @access Private
exports.getActiveSchedule = async (req, res) => {
  const sitterId = req.params.sitterId;
  if (isValidObjectId(sitterId)) {
    const schedule = await Availability.findOne({ sitterId: sitterId });
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

// @route GET /availability/getUserSchedule
// @desc gets schedule by sitterId of loggedInUser
// @access Private
exports.getUserSchedule = async (req, res) => {
  const userId = req.body.userId;
  // const userId = req.user.id
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

// @route PATCH /availability/:scheduleId/activate
// @desc gets schedule by sitterId of loggedInUser
// @access Private
exports.setActiveSchedule = async (req, res) => {
  const userId = req.body.userId;
  const availabilityId = req.body.availabilityId;

  if (isValidObjectId(userId)) {
    if (isValidObjectId(availabilityId)) {
      const userAvailability = await Availability.findById(availabilityId);
      if (!userAvailability) {
        res.json({ error: "A schedule with this id does not exist!" });
      } else if (userAvailability.sitterId != userId) {
        res.json({
          error: "The provided userId does not match the provided availabilityId's availability's sitterId",
        });
      } else {
        const schedule = await Availability.findOne({ sitterId: userId });
        if (!schedule) {
          res.json({ error: "A schedule associated with this userId does not exist!" });
        } else {
          let scheduleToActivate = schedule.defaultSchedule;
          let scheduleToDeactivate = schedule.defaultSchedule;

          //add in check to see which is current active, and if provided scheduleId is already active
          if (schedule.defaultSchedule.active) {
            scheduleToActivate = schedule.alternateSchedules.find((altSchedule) => altSchedule.active === false);
          } else {
            scheduleToDeactivate = schedule.alternateSchedules.find((altSchedule) => altSchedule.active === true);
          }

          scheduleToDeactivate.active = false;
          scheduleToActivate.active = true;

          // res.json({
          //   success: {
          //     activatedSchedule: {
          //       name: scheduleToActivate.name ? scheduleToActivate.name : "Default Schedule",
          //       active: scheduleToActivate.active,
          //       _id: scheduleToActivate._id ? scheduleToActivate._id : "default, no id",
          //     },
          //     deactivatedSchedule: {
          //       name: scheduleToDeactivate.name ? scheduleToDeactivate.name : "Default Schedule",
          //       active: scheduleToDeactivate.active,
          //       _id: scheduleToDeactivate._id ? scheduleToDeactivate._id : "default, no id",
          //     },
          //   },
          // });

          const updatedAvailability = await schedule.save();
          res.json({
            success: {
              updatedAvailability,
            },
          });
        }
      }
    } else {
      res.json({ error: "Invalid scheduleId" });
    }
  } else {
    res.json({ error: "Invalid userId" });
  }
};
