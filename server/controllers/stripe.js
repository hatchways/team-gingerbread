const stripe = require("stripe")(process.env.STRIPE_API_KEY);

const YOUR_DOMAIN = process.env.DOMAIN;

// @route GET /stripe/session
// @desc create new session to save user's payment method
// @access Public
exports.createSession = async (req, res) => {
  const customer = await stripe.customers.create();
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "setup",
    customer: customer.id,
    success_url: "http://localhost:3000/edit-profile?success?session_id={CHECKOUT_SESSION_ID}",
    cancel_url: "http://localhost:3000/edit-profile?cancel",
  });

  // const sessionRetrieve = await stripe.checkout.sessions.retrieve(session.id);

  res.json({ success: session.id });

  // res.redirect(303, session.url);

  // const setupIntent = await stripe.setupIntents.retrieve(sessionRetrieve.setup_intent);

  // res.json({ success: setupIntent.payment_method });
};

// @route POST /stripe/customers/create
// @desc create new customer
// @access Public
exports.createCustomer = async (req, res) => {
  const customer = await stripe.customers.create({
    description: req.body.description,
  });
  res.send(customer);
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

// @route POST /stripe/payment/create
// @desc creates new payment method
// @access Public
exports.createPaymentMethod = async (req, res) => {
  const paymentMethod = await stripe.paymentMethods.create({
    type: "card",
    card: {
      number: "4242424242424242",
      exp_month: 12,
      exp_year: 2022,
      cvc: "314",
    },
  });
  res.send(paymentMethod);
};

// @route GET /stripe/payment/all
// @desc gets all payment methods
// @access Public
exports.getAllPaymentMethods = async (req, res) => {
  const paymentMethods = await stripe.paymentMethods.list({
    customer: "cus_Kk1rd4KHOzlRC0",
    type: "card",
  });
  res.send(paymentMethods);
};

// @route POST /stripe/create-payment-intent
// @desc creates payment intent
// @access Public
exports.createPaymentIntent = async (req, res) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 1,
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
};
