const Review = require("../models/Review");

// @route GET /reviews/all/:sitterId
// @desc gets all reviews for sitter
// @access Private
exports.getAllReviews = async (req, res) => {
  const reviews = await Review.find({ sitterId: req.params.sitterId });
  res.json({ success: reviews });
};

// @route POST /reviews/create
// @desc creates new review
// @access Private
exports.createReview = async (req, res) => {
  const { sitterId, rating, description } = req.body;

  const sitter = await User.findById(sitterId);
  const sitterProfile = await Profile.findById(sitter.profile);

  if (!sitterProfile.isSitter) {
    res.json({ error: "Supplied sitter is not a sitter (this should be true)" });
  }

  res.send({ success: req.user.id });

  const client = await User.findById(req.user.id);
  const clientProfile = await Profile.findById(client.profile);

  if (clientProfile.isSitter) {
    res.json({ error: "Supplied client is a sitter (this should be false)" });
  }

  if (!(rating >= 1 && rating <= 5)) {
    res.json({ error: "Rating is out-of-bounds (1 to 5)" });
  }

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
  res.json({ success: newReview });
};
