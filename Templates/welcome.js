module.exports.Welcome = (firstName) => {
  return `<!DOCTYPE html>
<html>
<head>
  <style>
    .container {
      font-family: Arial, sans-serif;
      margin: 0 auto;
      padding: 20px;
      max-width: 600px;
      color: #333;
    }
    .header {
      background-color: #222;
      color: #fff;
      padding: 20px;
      text-align: center;
      border-bottom: 4px solid #e0a800;
    }
    .logo {
      font-size: 24px;
      font-weight: bold;
      color: #e0a800;
    }
    .content {
      margin: 20px 0;
    }
    .footer {
      background-color: #f8f8f8;
      padding: 20px;
      text-align: center;
      border-top: 1px solid #e7e7e7;
      font-size: 12px;
      color: #666;
    }
    .button {
      display: inline-block;
      background-color: #e0a800;
      color: #fff;
      padding: 10px 20px;
      text-decoration: none;
      border-radius: 4px;
      margin-top: 10px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">Luxeride</div>
      <p>Luxury Car Rentals & Investments</p>
    </div>
    <div class="content">
      <p>Hi ${firstName},</p>
      <p>Welcome to <strong>Luxeride</strong>! We're delighted to have you join us.</p>
      <p>At Luxeride, we connect you with exclusive opportunities to experience luxury and invest in high-end vehicles. Whether you're renting a luxury car for an occasion or exploring profitable investments, you're in the right place.</p>
      <p>Your account is now active and ready to go. Feel free to browse our exclusive collections and investment opportunities!</p>
      <a href="https://luxeride.example.com/dashboard" class="button">Explore Luxeride</a>
    </div>
    <div class="footer">
      <p>If you have questions, our support team is here to help at <a href="mailto:support@luxeride.com">support@luxeride.com</a>.</p>
      <p>Thank you for choosing Luxeride.<br>Safe Travels, <br>The Luxeride Team</p>
    </div>
  </div>
</body>
</html>
`;
};
