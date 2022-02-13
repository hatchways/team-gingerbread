const sgMail = require("@sendgrid/mail");

const sendEmail = (API_KEY, to, from, subject, html) => {
  sgMail.setApiKey(API_KEY);
  const msg = {
    to,
    from,
    subject,
    html,
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
