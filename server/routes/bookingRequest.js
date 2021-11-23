const express = require("express");

const router = express.Router();
const protect = require("../middleware/auth");
const { createBookingRequest, updateBookingRequest, getBookingRequests } = require("../controllers/bookingRequest");

router.route("/create").post(protect, createBookingRequest);
router.route("/update/:requestId").put(protect, updateBookingRequest);
router.route("/all").get(protect, getBookingRequests);

module.exports = router;
