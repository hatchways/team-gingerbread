const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const { sendPayment } = require("../controllers/payment");

router.route("/request/:id/pay").post(sendPayment);

module.exports = router;
