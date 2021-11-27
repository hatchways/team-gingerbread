const express = require("express");

const router = express.Router();
const protect = require("../middleware/auth");
const { createBookingRequest, updateBookingRequest, getBookingRequests } = require("../controllers/bookingRequest");

router.route("/").post(protect, createBookingRequest);
router.route("/:requestId").patch(protect, updateBookingRequest);
router.route("/").get(protect, getBookingRequests);

module.exports = router;
