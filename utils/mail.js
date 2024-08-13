const nodemailer = require("nodemailer");

// const transporter = nodemailer.createTransport({
//   host: "mail.trustleger.com",
//   port: 587,
//   secure: false,
//   auth: {
//     user: "support@trustleger.com",
//     pass: "Trustleger14",
//   },
//   tls: {
//     rejectUnauthorized: false,
//   },
// });

// async function sendMail(to, subject, text, html) {
//   const mailOptions = {
//     from: "support@trustleger.com",
//     to,
//     subject,
//     text,
//     html,
//   };

//   return transporter.sendMail(mailOptions);
// }

const transporter = nodemailer.createTransport({
  host: "mail.bitvelar.com",
  port: 465, //465 is true & other port are false
  secure: true,
  auth: {
    user: "support@bitvelar.com",
    pass: "Bitvelar@14",
  },
  tls: {
    rejectUnauthorized: false,
  },
});

async function sendMail(to, subject, text, html) {
  const mailOptions = {
    from: "support@bitvelar.com",
    to,
    subject,
    text,
    html,
  };

  return transporter.sendMail(mailOptions);
}

module.exports = { sendMail };
