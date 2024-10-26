module.exports.Portfolio = (firstName, share, amount, profit, name) => {
  return `<!DOCTYPE html>
<html>
<head>
  <style>
    .container {
      font-family: Arial, sans-serif;
      margin: 0 auto;
      padding: 20px;
      max-width: 800px;
      border: 1px solid #ddd;
      background-color: #fff;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
    }
    .header {
      text-align: center;
      padding: 20px;
      border-bottom: 2px solid #e0a800;
    }
    .header img {
      max-width: 50px;
      margin-bottom: 10px;
    }
    .header h1 {
      font-size: 24px;
      color: #222;
      margin: 5px 0;
    }
    .header p {
      font-size: 14px;
      color: #666;
    }
    .content {
      padding: 20px;
      line-height: 1.6;
    }
    .content h2 {
      font-size: 18px;
      color: #333;
      margin-bottom: 10px;
      text-align: center;
    }
    .investment-details {
      margin: 20px 0;
      font-size: 16px;
    }
    .investment-details li {
      padding: 8px 0;
      border-bottom: 1px solid #ddd;
    }
    .investment-details li strong {
      color: #333;
    }
    .footer {
      padding: 20px;
      text-align: center;
      font-size: 12px;
      color: #666;
      border-top: 2px solid #e0a800;
    }
    .note {
      font-size: 14px;
      margin-top: 20px;
      color: #888;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <img src="https://res.cloudinary.com/duqlw2kta/image/upload/v1729952036/logo_oljmhd.png" alt="Luxeride Logo">
      <h1>Luxeride</h1>
      <h2>Investment Agreement</h2>
    </div>

    <div class="content">
      <p>Dear ${firstName},</p>
      <p>Congratulations on securing your investment in Luxeride! We’re thrilled to have you as part of our exclusive community. Below is a summary of your recent investment:</p>

      <h2>Investment Breakdown</h2>
      <ul class="investment-details">
        <li><strong>Shareholding:</strong> ${share}%</li>
        <li><strong>Investment Amount:</strong> ${amount} days</li>
        <li><strong>Estimated Profit:</strong> ${profit}%</li>
        <li><strong>Car Model:</strong> ${name}</li>
      </ul>

      <p>With Luxeride, you’re not only investing in luxury but also in future financial growth. We look forward to achieving great returns together.</p>
      <p>For any inquiries or support, reach out to us at <a href="mailto:support@luxeride.com">support@luxeride.com</a>.</p>

      <p class="note">A full copy of this agreement will be sent to your email as a PDF document for your records.</p>
    </div>

    <div class="footer">
      <p>Thank you for choosing Luxeride. We appreciate your trust and commitment to luxury investments.</p>
      <p>&copy; ${new Date().getFullYear()} Luxeride | All rights reserved</p>
    </div>
  </div>
</body>
</html>
`;
};
