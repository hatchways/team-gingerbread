const express = require("express");
const router = express.Router();
const {
  createSession,
  createCustomer,
  retrieveCustomer,
  retrieveAllCustomers,
  createPaymentMethod,
  getAllPaymentMethods,
  createPaymentIntent,
} = require("../controllers/stripe");

router.route("/session").post(createSession);
router.route("/customers/create").post(createCustomer);
router.route("/customers/retrieve/:id").get(retrieveCustomer);
router.route("/customers/retrieveAll").get(retrieveAllCustomers);
router.route("/payment/create").post(createPaymentMethod);
router.route("/payment/all").get(getAllPaymentMethods);
router.route("/create-payment-intent").post(createPaymentIntent);

module.exports = router;
