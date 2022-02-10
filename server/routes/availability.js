const express = require("express");

const router = express.Router();
const protect = require("../middleware/auth");
const {
  createSchedule,
  getSchedule,
  getActiveSchedule,
  getUserSchedule,
  setActiveSchedule,
} = require("../controllers/availability");

router.route("/").post(createSchedule); //add protect
router.route("/:scheduleId").get(getSchedule); //add protect, redo!!!
router.route("/active/:sitterId").get(getActiveSchedule); //add protect
router.route("/getUserSchedule").post(getUserSchedule); //add protect, change to get
router.route("/:scheduleId/activate").patch(setActiveSchedule);

module.exports = router;
