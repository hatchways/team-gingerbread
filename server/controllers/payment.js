const asyncHandler = require("express-async-handler");

// @route POST /payment/request/:id/pay
// @desc send payment from client to sitter
// @access Public
exports.sendPayment = asyncHandler(async (req, res, next) => {
  const payment = ({ client, amount, description } = req.body);
  payment.recipient = req.params.id;

  res.status(200).json({
    success: {
      payment,
    },
  });
});
