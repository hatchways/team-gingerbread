const Profile = require("../models/Profile");
const User = require("../models/User");
const asyncHandler = require("express-async-handler");

// @route POST /profile/edit
// @desc edit user profile
// @access Private
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
      profile: profile,
    },
  });
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
  const availableTime = profile.availableTime; //creates variable representing user's availability
  const newDay = req.body.newDay;

  if (
    //checks if newDay is already in availableTime
    availableTime.some(
      (day) =>
        day.date.getDate() === new Date(newDay.date).getDate() &&
        day.date.getMonth() === new Date(newDay.date).getMonth() &&
        day.date.getFullYear() === new Date(newDay.date).getFullYear()
    )
  ) {
    //if match, find match and set to newDay (updates match)
    availableTime.forEach((day) => {
      if (day.date === newDay.date) day = newDay;
    });
  } else {
    //if no match, push newDay to availableTime
    availableTime.push(newDay);
  }

  // profile.availableTime = availableTime; //updates user's availability with new value of availability var
  // const updatedProfile = await profile.save(); //saves changes
  // res.status(200).json({
  //   success: updatedProfile.availableTime,
  // });
  res.status(200).json({
    success: availableTime,
  });
});
