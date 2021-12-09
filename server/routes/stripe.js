const express = require("express");
const router = express.Router();
const {
  test,
  createSession,
  createCustomer,
  retrieveCustomer,
  retrieveAllCustomers,
  createPaymentMethod,
  getAllPaymentMethods,
} = require("../controllers/stripe");

router.route("/test").get(test);
router.route("/session").post(createSession);
router.route("/customers/create").post(createCustomer);
router.route("/customers/retrieve/:id").get(retrieveCustomer);
router.route("/customers/all").get(retrieveAllCustomers);
router.route("/payment/create").post(createPaymentMethod);
router.route("/payment/all").get(getAllPaymentMethods);

module.exports = router;
