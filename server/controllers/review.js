const Review = require("../models/Review");
const User = require("../models/User");

// @route GET /reviews/all/:sitterId
// @desc gets all reviews for sitter
// @access Private
exports.getAllReviews = async (req, res) => {
  const { sitterId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(sitterId)) {
    return res.status(400).send("Bad Request: sitterId");
  }
  const user = await User.exists({ _id: sitterId }, async (error, result) => {
    if (error) {
      res.status(400).json({ error: "the provided sitterId does not correspond to any users" });
    } else {
      const reviews = await Review.find({ sitterId: sitterId });
      res.json({ success: reviews });
    }
  });
};

// @route POST /reviews/create
// @desc creates new review
// @access Private
exports.createReview = async (req, res) => {
  const { sitterId, rating, description } = req.body;
  const clientId = req.user.id;

  if (!mongoose.Types.ObjectId.isValid(sitterId)) {
    return res.status(400).send("Bad Request: sitterId");
  }

  if (!mongoose.Types.ObjectId.isValid(clientId)) {
    return res.status(400).send("Bad Request: clientId");
  }

  if (!(sitterId && rating && description)) {
    res.status(400).json({ error: "missing request body parameters" });
  }

  if (typeof description !== "string") {
    res.json({ error: "Description is not a string" });
  }

  const review = new Review({
    sitterId,
    clientId,
    rating,
    description,
  });
  const newReview = await review.save();
  res.status(201).json({ success: newReview });
};
