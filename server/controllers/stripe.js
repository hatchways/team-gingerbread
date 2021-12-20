const stripe = require("stripe")(process.env.STRIPE_API_KEY);

const YOUR_DOMAIN = process.env.DOMAIN;

// @route POST /stripe/session
// @desc create new session
// @access Public
exports.createSession = async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "T-shirt",
          },
          unit_amount: 2000,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${YOUR_DOMAIN}/success=true`,
    cancel_url: `${YOUR_DOMAIN}/canceled=true`,
  });

  res.redirect(303, session.url);
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
