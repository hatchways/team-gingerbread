const express = require("express");

const router = express.Router();
const protect = require("../middleware/auth");
const { editProfile, loadProfile } = require("../controllers/profile");
const { updateIsSitter } = require("../controllers/updateIsSitter");

router.route("/edit").post(protect, editProfile);

router.route("/load").get(protect, loadProfile);

router.route("/sitter").patch(updateIsSitter);

module.exports = router;
