const express = require("express");
const protect = require("../middleware/auth");

const router = express.Router();
const { editProfile, loadProfile, populateListings } = require("../controllers/profile");
const { updateIsSitter } = require("../controllers/updateIsSitter");

router.route("/edit").post(protect, editProfile);

router.route("/load").get(protect, loadProfile);

router.route("/sitter").patch(updateIsSitter);

router.route("/listings").get(populateListings);

module.exports = router;
