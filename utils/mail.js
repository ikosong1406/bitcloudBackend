const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "mail.bitcloud.bitvelar.com",
  port: 465, // 465 is true (secure), other ports use false for 'secure'
  secure: true, // true for 465, false for other ports
  auth: {
    user: "support@bitcloud.bitvelar.com", // your email
    pass: "Bitcloud@14", // your email password
  },
  tls: {
    rejectUnauthorized: false, // Optional: may be needed if TLS is an issue
  },
});

async function sendMail(to, subject, text, html) {
  const mailOptions = {
    from: "support@bitcloud.com",
    to,
    subject,
    text,
    html,
  };

  return transporter.sendMail(mailOptions);
}

module.exports = { sendMail };
