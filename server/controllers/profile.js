const asyncHandler = require("express-async-handler");
const Profile = require("../models/Profile");
const User = require("../models/User");

// @route POST /profile/edit
// @desc edit user profile
// @access Public
exports.editProfile = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(404);
    throw new Error("User doesn't exist");
  }
  user.profile.set(req.body);
  const updatedUser = await user.save();
  res.status(200).json({
    success: {
      profile: updated_user.profile,
    },
  });
});

// @route GET /profile/load
// @desc Get user profile data
// @access Private
exports.loadProfile = asyncHandler(async (req, res, next) => {
  const profile = await User.findById(req.user.id, "profile");

  if (!profile) {
    res.status(401);
    throw new Error("Not authorized");
  }

  res.status(200).json({
    success: {
      profile,
    },
  });
});

exports.populateListings = async (req, res) => {
  const profiles = await Profile.find({ isSitter: true });

  if (!profiles) {
    res.status(500);
    throw new Error("Unable to load profiles");
  }

  res.status(200).json({
    success: {
      profiles,
    },
  });
};
