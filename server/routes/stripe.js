const express = require("express");
const router = express.Router();
const {
  createSession,
  retrieveCustomer,
  retrieveAllCustomers,
  getAllPaymentMethods,
  sendPayment,
} = require("../controllers/stripe");
const protect = require("../middleware/auth");

router.route("/session").post(createSession);
router.route("/customers/retrieve/:id").get(retrieveCustomer);
router.route("/customers/retrieveAll").get(retrieveAllCustomers);
router.route("/payment/all/:customerId").get(protect, getAllPaymentMethods);
router.route("/request/:id/pay").post(sendPayment);

module.exports = router;
