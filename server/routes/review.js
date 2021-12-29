const express = require("express");
const { getAllReviews, createReview } = require("../controllers/review");

const router = express.Router();

router.route("/all/:sitterId").get(getAllReviews);
router.route("/create/:sitterId").post(createReview);

module.exports = router;
