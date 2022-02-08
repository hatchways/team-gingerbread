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

router.route("/").post(createSchedule);
router.route("/:scheduleId").get(getSchedule);
router.route("/active").post(getActiveSchedule); //change to get and user protect middleware to get userId
router.route("/getUserSchedule").post(getUserSchedule);
router.route("/:scheduleId/activate").patch(setActiveSchedule);

module.exports = router;
