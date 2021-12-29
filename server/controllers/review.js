const Review = require("../models/Review");

// @route GET /reviews/all/:sitterId
// @desc gets all reviews for sitter
// @access Public
exports.getAllReviews = async (req, res) => {
  const reviews = await Review.find({ sitterId: req.params.sitterId });
  res.json({ success: reviews });
};

// @route POST /reviews/create/:sitterId
// @desc creates new review
// @access Public
exports.createReview = async (req, res) => {
  const { clientId, rating, description } = req.body;
  const review = new Review({
    sitterId: req.params.sitterId,
    clientId,
    rating,
    description,
  });
  const newReview = await review.save();
  res.json({ success: newReview });
};
