const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const {bookRequest} = require("../controllers/bookingRequest");

router.route("/create").post(protect, bookRequest);

module.exports = router;
