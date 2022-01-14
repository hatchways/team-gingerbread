const asyncHandler = require("express-async-handler");
const Profile = require("../models/Profile");
const User = require("../models/User");

// @route POST /profile/edit
// @desc edit user profile
// @access Private
exports.editProfile = asyncHandler(async (req, res, next) => {
  const { changes } = req.body;
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(404);
    throw new Error("User doesn't exist");
  }
  const profile = await Profile.findById(user.profile);
  for (const attr in changes) {
    profile[attr] = changes[attr];
  }
  const updatedProfile = await profile.save();
  res.status(200).json({
    success: {
      profile: updatedProfile,
    },
  });
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

// @route POST /profile/availability/edit
// @desc edit user profile
// @access Private
exports.editAvailability = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.body.user.id);
  if (!user) {
    res.status(404);
    throw new Error("User doesn't exist");
  }
  const profile = await Profile.findById(user.profile);
  let availableTime = profile.availableTime;
  const newDay = req.body.newDay;
  if (availableTime.startTime > availableTime.endTime) {
    res.status(401);
    throw new Error("Start time must occur before end time");
  }
  if (
    availableTime.some(
      (day) =>
        day.date.getDate() === new Date(newDay.date).getDate() &&
        day.date.getMonth() === new Date(newDay.date).getMonth() &&
        day.date.getFullYear() === new Date(newDay.date).getFullYear()
    )
  ) {
    availableTime = availableTime.map((day) => (day.date.getDate() === new Date(newDay.date).getDate() ? newDay : day));
  } else {
    availableTime.push(newDay);
  }
  profile.availableTime = availableTime;
  const updatedProfile = await profile.save();
  res.status(200).json({
    success: updatedProfile.availableTime,
  });
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
