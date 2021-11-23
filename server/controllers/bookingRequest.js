const User = require("../models/User");
const BookingRequest = require("../models/BookingRequest");
const asyncHandler = require("express-async-handler");

// @route POST /bookingrequests/create
// @desc Create a new request
// @access Private

exports.bookRequest = asyncHandler(async (req, res, next) => {

    try {
        const userId = req.user.id
        const user = await User.findById(userId)
        const {sitter_id, start, end, description} = req.body
        if (user) {
            const sitter = await User.findById(sitter_id)
            if (sitter){
                const bookingRequest = await BookingRequest.create({
                    user_id: user,
                    sitter_id: sitter,
                    start,
                    end,
                    description
                })
                console.log(bookingRequest)
            }
            else throw new Error("Unable to find the dog sitter info")
        } else throw new Error("Unable to find the dog owner info")
        // console.log(user)

    } catch (error){
        console.error(error)
        return error
    }

})