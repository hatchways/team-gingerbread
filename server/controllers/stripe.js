const stripe = require("stripe")(process.env.STRIPE_API_KEY);
const User = require("../models/User");

const YOUR_DOMAIN = process.env.DOMAIN;

// @route POST /stripe/session
// @desc create new session to save user's payment method
// @access Public
exports.createSession = async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "setup",
    customer: "cus_KrCousRxcC9lSY",
    success_url: "http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}",
    cancel_url: "http://localhost:3000/cancel",
  });

  res.json({ success: session.url });
};

// @route GET /stripe/customers/retrieve/:id
// @desc retrieve customer
// @access Public
exports.retrieveCustomer = async (req, res) => {
  const customer = await stripe.customers.retrieve(req.params.id);
  res.send(customer);
};

// @route GET /stripe/customers/retrieveAll
// @desc retrieve customer
// @access Public
exports.retrieveAllCustomers = async (req, res) => {
  const customers = await stripe.customers.list();
  res.send(customers);
};

// @route GET /stripe/payment/all
// @desc gets all payment methods
// @access Private
exports.getAllPaymentMethods = async (req, res) => {
  const user = await User.findById(req.user.id);
  const paymentMethods = await stripe.paymentMethods.list({
    customer: user.stripeId,
    type: "card",
  });
  res.send(paymentMethods);
};

// @route POST /stripe/request/:id/pay
// @desc send payment to sitter
// @access Public
exports.sendPayment = async (req, res) => {
  const { clientId, clientPaymentMethod, chargeAmount, payoutAmount, transferGroup } = req.body;

  const paymentIntent = await stripe.paymentIntents.create({
    amount: chargeAmount,
    currency: "usd",
    customer: clientId, //client is charged
    payment_method: clientPaymentMethod,
    off_session: true,
    confirm: true,
    transfer_group: transferGroup,
  });

  const transfer = await stripe.transfers.create({
    amount: payoutAmount,
    currency: "usd",
    destination: req.params.id, //sitter is paid
    transfer_group: transferGroup,
  });

  res.status(200).json({
    success: {
      transfer,
    },
  });
};
