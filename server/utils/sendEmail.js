const sgMail = require("@sendgrid/mail");

const sendEmail = (API_KEY) => {
  // console.log(API_KEY);
  sgMail.setApiKey(API_KEY);
  const msg = {
    to: "justinofthebaytosh@gmail.com",
    from: "justin.baytosh@gmail.com",
    subject: "Sending with SendGrid is Fun",
    text: "and easy to do anywhere, even with Node.js",
    html: "<strong>and easy to do anywhere, even with Node.js</strong>",
  };
  sgMail
    .send(msg)
    .then((res) => {
      console.log(res[0].statusCode);
      console.log(res[0].headers);
    })
    .catch((err) => {
      console.error(error);
    });
};

module.exports = sendEmail;
