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
