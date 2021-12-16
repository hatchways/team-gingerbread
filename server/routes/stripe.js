const express = require("express");
const router = express.Router();
const {
  createSession,
  createCustomer,
  retrieveCustomer,
  createPaymentMethod,
  getAllPaymentMethods,
  sendPayment,
} = require("../controllers/stripe");

router.route("/session").post(createSession);
router.route("/customers/create").post(createCustomer);
router.route("/customers/retrieve/:id").get(retrieveCustomer);
router.route("/payment/create").post(createPaymentMethod);
router.route("/payment/all/:customerId").get(getAllPaymentMethods);
router.route("/request/:id/pay").post(sendPayment);

module.exports = router;
