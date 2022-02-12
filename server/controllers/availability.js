const isValidObjectId = require("mongoose").isValidObjectId;
const Availability = require("../models/Availability");

// @route POST /availability/createAvailability
// @desc creates new availability for a user
// @access Private
exports.createAvailability = async (req, res) => {
  const userId = req.user.id;
  if (isValidObjectId(userId)) {
    const existingAvailability = await Availability.findOne({ sitterId: userId });
    if (existingAvailability) {
      res.json({
        error: "An availability for this user already exists!",
        userId,
        availabilityId: existingAvailability._id,
      });
    } else {
      const newAvailability = new Availability({
        sitterId: userId,
      });
      const saved = await newAvailability.save();
      res.json({
        success: {
          availability: saved,
        },
      });
    }
  } else {
    res.json({ error: "Invalid userId" });
  }
};

// @route POST /availability
// @desc adds a new schedule to an existing user's availability
// @access Private
exports.addSchedule = async (req, res) => {
  const userId = req.body.id;
  const { availabilityId, newSchedule } = req.body;
  if (isValidObjectId(userId)) {
    if (isValidObjectId(availabilityId)) {
      const availability = await Availability.findById(availabilityId);
      if (availability) {
        if (availability.sitterId == userId) {
          let counter = 0;
          for (let day in newSchedule.availability) {
            const currentDay = newSchedule.availability[day];
            if (
              currentDay.startTime !== undefined &&
              currentDay.endTime !== undefined &&
              currentDay.available !== undefined
            ) {
              if (currentDay.available && parseInt(currentDay.startTime) < parseInt(currentDay.startTime)) {
                counter++;
              } else if (!currentDay.available) {
                currentDay.startTime = -1;
                currentDay.endTime = -1;
                counter++;
              }
            }
          }
          if (counter === 7 && newSchedule.name !== undefined && newSchedule.active !== undefined) {
            availability.schedules.push(newSchedule);
            const saved = await availability.save();
            res.json({
              success: {
                availability: saved,
              },
            });
          } else {
            res.json({ error: "Provided schedule is invalid", newSchedule, counter });
          }
        } else {
          res.json({
            error: "The provided userId does not match with the provided availabilityId's availability's sitterId",
          });
        }
      } else {
        res.json({ error: "No availability was found for the provided userId", userId });
      }
    } else {
      res.json({ error: "Invalid availabilityId" });
    }
  } else {
    res.json({ error: "Invalid userId" });
  }
};

// @route GET /availability/:availabilityId/:scheduleId/getSchedule
// @desc gets schedule from availability by availabilityId and scheduleId
// @access Private
exports.getSchedule = async (req, res) => {
  const { availabilityId, scheduleId } = req.params;
  if (isValidObjectId(availabilityId)) {
    if (isValidObjectId(scheduleId)) {
      const availability = await Availability.findById(availabilityId);
      if (!availability) {
        res.json({ error: "A schedule with this id does not exist!" });
      } else if (!availability.schedules.some((schedule) => schedule._id == scheduleId)) {
        res.json({
          error:
            "The provided scheduleId does not match with any schedules inside the provided availabilityId's availability's schedules",
          availabilityId,
          scheduleId,
        });
      } else {
        const matchedSchedule = availability.schedules.find((schedule) => schedule._id == scheduleId);
        res.json({ success: matchedSchedule });
      }
    } else {
      res.json({ error: "Invalid scheduleId" });
    }
  } else {
    res.json({ error: "Invalid availabilityId" });
  }
};

// @route GET /availability/:sitterId/getActiveSchedule
// @desc gets active schedule by sitterId
// @access Private
exports.getActiveSchedule = async (req, res) => {
  const { sitterId } = req.params;
  if (isValidObjectId(sitterId)) {
    const availability = await Availability.findOne({ sitterId: sitterId });
    if (!availability) {
      res.json({ error: "A schedule associated with this userId does not exist!" });
    } else {
      if (availability.schedules.some((schedule) => schedule.active)) {
        const activeSchedule = availability.schedules.find((schedule) => schedule.active);
        res.json({ success: activeSchedule });
      } else {
        res.json({ error: "None of the schedules associated with the provided sitterId are active", sitterId });
      }
    }
  } else {
    res.json({ error: "Invalid userId" });
  }
};

// @route GET /availability/getUserSchedules
// @desc gets all schedules in loggedInUser's availability
// @access Private
exports.getUserSchedules = async (req, res) => {
  const userId = req.user.id;
  if (isValidObjectId(userId)) {
    const availability = await Availability.findOne({ sitterId: userId });
    if (!availability) {
      res.json({ error: "A schedule associated with this userId does not exist!" });
    } else {
      res.json({ success: availability.schedules });
    }
  } else {
    res.json({ error: "Invalid userId" });
  }
};

// @route PATCH /availability/setActiveSchedule
// @desc gets schedule by sitterId of loggedInUser
// @access Private
exports.setActiveSchedule = async (req, res) => {
  const userId = req.user.id;
  const { availabilityId, scheduleId } = req.body;
  if (isValidObjectId(userId)) {
    if (isValidObjectId(availabilityId)) {
      if (isValidObjectId(scheduleId)) {
        const availability = await Availability.findById(availabilityId);
        if (!availability) {
          res.json({ error: "An availability with this id does not exist!" });
        } else if (availability.sitterId != userId) {
          res.json({
            error: "The provided userId does not match the provided availabilityId's availability's sitterId",
          });
        } else {
          if (availability.schedules.some((schedule) => schedule.active)) {
            let scheduleToActivate = availability.schedules.find((schedule) => schedule._id == scheduleId);
            if (scheduleToActivate.active === false) {
              let scheduleToDeactivate = availability.schedules.find((schedule) => schedule.active);
              scheduleToActivate.active = true;
              scheduleToDeactivate.active = false;
              const updatedAvailability = await availability.save();
              res.json({
                success: updatedAvailability,
              });
            } else {
              res.json({
                error: "The provided scheduleId corresponds to a schedule that is currently active",
                scheduleId,
                scheduleToActivate,
              });
            }
          } else {
            res.json({
              error:
                "The provided scheduleId does not match with any schedules inside the provided availabilityId's availability's schedules",
              availabilityId,
              scheduleId,
            });
          }
        }
      } else {
        res.json({ error: "Invalid scheduleId", availabilityId });
      }
    } else {
      res.json({ error: "Invalid availabilityId", availabilityId });
    }
  } else {
    res.json({ error: "Invalid userId", userId });
  }
};
