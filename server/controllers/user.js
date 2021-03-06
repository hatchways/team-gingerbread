const asyncHandler = require("express-async-handler");
const User = require("../models/User");

// @route POST /
// @desc Search for users
// @access Private
exports.searchUsers = asyncHandler(async (req, res, next) => {
  const searchString = req.query.search;

  let users;
  if (searchString) {
    users = await User.find({
      username: { $regex: searchString, $options: "i" },
    });
  }

  if (!users) {
    res.status(404);
    throw new Error("No users found in search");
  }

  res.status(200).json({ users });
});

// @route POST /load
// @desc load user profile data for one or many users
// @access Private
exports.loadUsersData = async (req, res) => {
  const { users } = req.body;

  const profiles = await User.find({ _id: { $in: users } })
    .select("profile")
    .populate("profile", "firstName lastName photo");

  if (!profiles) {
    res.status(500).send("An error occurred while retrieving profile data.");
  } else {
    res.status(200).send({ success: profiles });
  }
};
