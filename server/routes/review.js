const express = require("express");
const { getAllReviews, createReview } = require("../controllers/review");
const protect = require("../middleware/auth");

const router = express.Router();

router.route("/all/:sitterId").get(protect, getAllReviews);
router.route("/create").post(protect, createReview);

module.exports = router;
