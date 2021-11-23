const BookingRequest = require("../models/BookingRequest")
const asyncHandler = require("express-async-handler")

// @route POST /bookingrequests
// @desc Create a new request
// @access Private

exports.bookRequest = asyncHandler(async (req, res, next) => {
    const user_id = req.user.id
    console.log(user_id)
})