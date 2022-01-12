const Review = require("../models/Review");
const User = require("../models/User");

// @route GET /reviews/all/:sitterId
// @desc gets all reviews for sitter
// @access Private
exports.getAllReviews = async (req, res) => {
  const user = await User.exists({ _id: req.params.sitterId }, async (error, result) => {
    if (error) {
      res.status(400).json({ error: "the provided sitterId does not correspond to any users" });
    } else {
      const reviews = await Review.find({ sitterId: req.params.sitterId });
      res.json({ success: reviews });
    }
  });
};

// @route POST /reviews/create
// @desc creates new review
// @access Private
exports.createReview = async (req, res) => {
  if (!("sitterId" in req.body && "rating" in req.body && "description" in req.body)) {
    res.status(400).json({ error: "missing request body parameters" });
  }

  const { sitterId, rating, description } = req.body;

  if (typeof description !== "string") {
    res.json({ error: "Description is not a string" });
  }

  const review = new Review({
    sitterId,
    clientId: req.user.id,
    rating,
    description,
  });
  const newReview = await review.save();
  res.status(201).json({ success: newReview });
};
