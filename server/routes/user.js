const express = require("express");

const router = express.Router();
const protect = require("../middleware/auth");
const { searchUsers, loadUsersData } = require("../controllers/user");

router.route("/").get(protect, searchUsers);

router.route("/load").post(loadUsersData);

module.exports = router;
