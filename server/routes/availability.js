const express = require("express");
const protect = require("../middleware/auth");
const {
  createAvailability,
  addSchedule,
  getSchedule,
  getActiveSchedule,
  getUserSchedules,
  setActiveSchedule,
} = require("../controllers/availability");

const router = express.Router();

router.route("/createAvailability").post(protect, createAvailability);
router.route("/").post(protect, addSchedule);
router.route("/:availabilityId/:scheduleId/getSchedule").get(protect, getSchedule);
router.route("/:sitterId/getActiveSchedule").get(protect, getActiveSchedule);
router.route("/getUserSchedules").post(protect, getUserSchedules);
router.route("/setActiveSchedule").patch(protect, setActiveSchedule);

module.exports = router;
