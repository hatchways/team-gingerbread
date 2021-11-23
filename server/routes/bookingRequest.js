const express = require("express");

const router = express.Router();
const protect = require("../middleware/auth");
const { bookRequest, updateRequest, getRequests } = require("../controllers/bookingRequest");

router.route("/create").post(protect, bookRequest);
router.route("/update/:requestId").put(protect, updateRequest);
router.route("/all").get(protect, getRequests);

module.exports = router;
