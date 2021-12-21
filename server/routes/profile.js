const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const { editProfile, loadProfile, editAvailability } = require("../controllers/profile");

router.route("/edit").post(protect, editProfile);

router.route("/load/:id").get(protect, loadProfile);

router.route("/availability/edit").post(protect, editAvailability);

module.exports = router;
