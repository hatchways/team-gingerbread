const asyncHandler = require("express-async-handler");
const Profile = require("../models/Profile");
const User = require("../models/User");

// @route POST /profile/edit
// @desc edit user profile
// @access Private
exports.editProfile = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.body.id);

  if (user) {
    const profile = await Profile.findByIdAndUpdate(user.profile, req.body.changes, { new: true });

    if (!profile) {
      res.status(500).send("An error occurred while editing profile.");
    } else {
      res.status(200).json({ success: { message: "Profile edited successfully!" } });
    }
  } else {
    res.status(500).send("An error occurred while editing profile.");
  }
});

// @route GET /profile/load/:id
// @desc Get user profile data
// @access Private
exports.loadProfile = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  const profileId = user.profile;
  const profile = await Profile.findById(profileId);

  if (!profile) {
    res.status(401);
    throw new Error("Not authorized");
  }

  res.status(200).json({ success: { profile } });
});

// @route GET /profile/listings
// @desc load users from db
// @access Public
exports.populateListings = async (req, res) => {
  const { numOfUsers } = req.query;
  const profiles = await Profile.find({ isSitter: true }).limit(Number(numOfUsers));

  if (!profiles) {
    res.status(500);
    throw new Error("Unable to load profiles");
  }

  res.status(200).json({ success: { profiles } });
};
