const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const Profile = require("../models/Profile");
const User = require("../models/User");

// @route POST /profile/edit
// @desc edit user profile
// @access Public
exports.editProfile = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.body.user.id);

  if (!user) {
    res.status(404);
    throw new Error("User doesn't exist");
  }
  const profile = await Profile.findById(user.profile);
  profile.set(req.body);
  const updatedProfile = await profile.save();
  res.status(200).json({
    success: {
      profile: updatedProfile,
    },
  });
});

// @route GET /profile/load
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

  res.status(200).json({
    success: {
      profile,
    },
  });
});
