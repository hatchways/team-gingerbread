const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const BookingRequest = require("../models/BookingRequest");

// @route POST /bookingrequests/create
// @desc Create a new request
// @access Private

exports.createBookingRequest = asyncHandler(async (req, res, next) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    const { sitterId, start, end, description } = req.body;
    if (user) {
      const sitter = await User.findById(sitterId);
      if (sitter) {
        const bookingRequest = await BookingRequest.create({
          userId: user,
          sitterId: sitter,
          start,
          end,
          description,
        });

        res.status(201).json({
          success: {
            bookingRequest: {
              request_id: bookingRequest._id,
              userId: bookingRequest.userId._id,
              sitterId: bookingRequest.sitterId._id,
              start: bookingRequest.start,
              end: bookingRequest.end,
              description: bookingRequest.description,
            },
          },
        });
      } else {
        res.status(400);
        throw new Error("Unable to find the dog sitter info");
      }
    } else {
      res.status(400);
      throw new Error("Unable to find the dog owner info");
    }
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
});

// @route PUT /bookingrequests/update/:requestId
// @desc Update a booking request (only for users who created a request)
// @access Private

exports.updateBookingRequest = asyncHandler(async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { requestId } = req.params;

    if (requestId && requestId) {
      const filter = { _id: requestId, userId };
      const { ...requestUpdate } = req.body || {};

      const bookingRequest = await BookingRequest.findOneAndUpdate(
        filter,
        {
          $set: requestUpdate,
        },
        {
          returnOriginal: false,
        }
      );

      res.status(200).json({
        updatedSuccess: {
          bookingRequest,
        },
      });
    } else {
      res.status(401);
      throw new Error("Unauthorized: Invalid Data");
    }
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
});

// @route GET /bookingrequests/all
// @desc Get all requests for logged in user
// @access Private

exports.getBookingRequests = asyncHandler(async (req, res, next) => {
  try {
    const userId = req.user.id;
    if (userId) {
      const bookingRequests = (await BookingRequest.find({ userId }).exec()) || [];
      if (bookingRequests.length > 0) {
        res.status(200).json({
          bookingRequestsWereFound: true,
          bookingRequests,
        });
      } else {
        res.status(204).json({
          bookingRequestsWereFound: false,
          message: "No booking requests found for this user",
        });
      }
    } else {
      res.status(400);
      throw new Error("Unable to access user id");
    }
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
});
