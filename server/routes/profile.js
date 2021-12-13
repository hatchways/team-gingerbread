const express = require("express");

const router = express.Router();
const protect = require("../middleware/auth");
const { editProfile, loadProfile, batchLoadProfiles } = require("../controllers/profile");

router.route("/edit").post(editProfile); // add protect back in

router.route("/load/:id").get(loadProfile); // add protect back in

router.route("/batch").post(batchLoadProfiles);

module.exports = router;
