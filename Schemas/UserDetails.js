const mongoose = require("mongoose");
const Transaction = require("./TransactionDetails");
const { mailTransport } = require("../utils/mail");

const UserDetailsSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: { type: String, unique: true },
    password: {
      type: String,
      required: true,
    },
    verified: {
      type: Boolean,
      default: false,
      required: true,
    },
    dateOfBirth: {
      type: String,
    },
    totalbalance: {
      type: Number,
      default: 0,
    },
    bitcoin: { type: Number, default: 0 }, // BTC
    ethereum: { type: Number, default: 0 }, // ETH
    binanceCoin: { type: Number, default: 0 }, // BNB
    solana: { type: Number, default: 0 }, // SOL
    cardano: { type: Number, default: 0 }, // ADA
    tether: { type: Number, default: 0 }, // USDT
    ripples: { type: Number, default: 0 }, // XRP
    polkadot: { type: Number, default: 0 }, // DOT
    avalanche: { type: Number, default: 0 }, // AVAX
    dogecoin: { type: Number, default: 0 }, // DOGE
    transactions: [Transaction.schema],
  },
  {
    collection: "UserInfo",
  }
);

UserDetailsSchema.methods.buyCoin = async function (
  coinName,
  coinQuantity,
  coinPrice
) {
  try {
    // Calculate the total cost
    const totalCost = coinQuantity * coinPrice;

    // Check if the user has enough balance for the purchase
    if (this.totalbalance < totalCost) {
      throw new Error("Insufficient balance");
    }

    // Deduct the total cost from the user's balance
    this.totalbalance -= totalCost;

    // Update the specific coin balance
    if (coinName === "bitcoin") {
      this.bitcoin += coinQuantity;
    } else if (coinName === "ethereum") {
      this.ethereum += coinQuantity;
    } else if (coinName === "binanceCoin") {
      this.binanceCoin += coinQuantity;
    } else if (coinName === "solana") {
      this.solana += coinQuantity;
    } else if (coinName === "cardano") {
      this.cardano += coinQuantity;
    } else if (coinName === "tether") {
      this.tether += coinQuantity;
    } else if (coinName === "ripples") {
      this.ripples += coinQuantity;
    } else if (coinName === "polkadot") {
      this.polkadot += coinQuantity;
    } else if (coinName === "avalanche") {
      this.avalanche += coinQuantity;
    } else if (coinName === "dogecoin") {
      this.dogecoin += coinQuantity;
    }
    // Add other coins as needed...

    // Add a transaction record
    this.transactions.push({
      type: "Buy",
      coinName,
      quantity: coinQuantity,
      price: coinPrice,
      date: new Date(),
    });

    await this.sendTransactionEmail(
      "Buy",
      coinName,
      coinQuantity,
      coinPrice,
      new Date()
    );

    return this.save();
  } catch (err) {
    throw err; // Propagate the error to the caller
  }
};

UserDetailsSchema.methods.sellCoin = async function (
  coinName,
  coinQuantity,
  coinPrice
) {
  try {
    // Check if the user has enough coins to sell
    if (coinName === "bitcoin" && this.bitcoin < coinQuantity) {
      throw new Error("Insufficient Bitcoin balance");
    } else if (coinName === "ethereum" && this.ethereum < coinQuantity) {
      throw new Error("Insufficient Ethereum balance");
    } else if (coinName === "binanceCoin" && this.binanceCoin < coinQuantity) {
      throw new Error("Insufficient Binance Coin balance");
    } else if (coinName === "solana" && this.solana < coinQuantity) {
      throw new Error("Insufficient Solana Coin balance");
    } else if (coinName === "cardano" && this.cardano < coinQuantity) {
      throw new Error("Insufficient Cardano Coin balance");
    } else if (coinName === "tether" && this.tether < coinQuantity) {
      throw new Error("Insufficient Tether Coin balance");
    } else if (coinName === "ripples" && this.ripples < coinQuantity) {
      throw new Error("Insufficient Ripples Coin balance");
    } else if (coinName === "polkadot" && this.polkadot < coinQuantity) {
      throw new Error("Insufficient Polkadot Coin balance");
    } else if (coinName === "polkadot" && this.polkadot < coinQuantity) {
      throw new Error("Insufficient Polkadot Coin balance");
    } else if (coinName === "avalanche" && this.avalanche < coinQuantity) {
      throw new Error("Insufficient Avalanche Coin balance");
    } else if (coinName === "dogecoin" && this.dogecoin < coinQuantity) {
      throw new Error("Insufficient Dogecoin Coin balance");
    }
    // Add other coins as needed...

    // Calculate the total sale amount
    const totalAmount = coinQuantity * coinPrice;

    // Update the user's balance and coin balance after selling
    this.totalbalance += totalAmount;
    if (coinName === "bitcoin") {
      this.bitcoin -= coinQuantity;
    } else if (coinName === "ethereum") {
      this.ethereum -= coinQuantity;
    } else if (coinName === "binanceCoin") {
      this.binanceCoin -= coinQuantity;
    } else if (coinName === "solana") {
      this.solana -= coinQuantity;
    } else if (coinName === "cardano") {
      this.cardano -= coinQuantity;
    } else if (coinName === "tether") {
      this.tether -= coinQuantity;
    } else if (coinName === "ripples") {
      this.ripples -= coinQuantity;
    } else if (coinName === "polkadot") {
      this.polkadot -= coinQuantity;
    } else if (coinName === "avalanche") {
      this.avalanche -= coinQuantity;
    } else if (coinName === "dogecoin") {
      this.dogecoin -= coinQuantity;
    }
    // Add other coins as needed...

    // Add a transaction record
    this.transactions.push({
      type: "Sell",
      coinName,
      quantity: coinQuantity,
      price: coinPrice,
      date: new Date(),
    });

    await this.sendTransactionEmail(
      "Sell",
      coinName,
      coinQuantity,
      coinPrice,
      new Date()
    );

    return this.save();
  } catch (err) {
    throw err; // Propagate the error to the caller
  }
};

UserDetailsSchema.methods.sendTransactionEmail = async function (
  type,
  coinName,
  quantity,
  price,
  date
) {
  try {
    const transactionTemplate = (type, coinName, quantity, price, date) => {
      return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Transaction Notification</title>
      </head>
      <body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f8f8f8;">
      
        <div style="max-width: 600px; margin: 20px auto; padding: 20px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
          <div style="background-color: #420c8e; color: #ffffff; padding: 20px; text-align: center;">
            <h1 style="color: #f8f8f8; font-size: 24px; margin-bottom: 10px;">Transaction Notification</h1>
          </div>
          <div style="margin-bottom: 20px; padding: 10px;">
            <p style="color: #555555; font-size: 16px; line-height: 1.5; margin-bottom: 10px;"><strong>Type:</strong> ${type}</p>
            <p style="color: #555555; font-size: 16px; line-height: 1.5; margin-bottom: 10px;"><strong>Coin Name:</strong> ${coinName}</p>
            <p style="color: #555555; font-size: 16px; line-height: 1.5; margin-bottom: 10px;"><strong>Quantity:</strong> ${quantity}</p>
            <p style="color: #555555; font-size: 16px; line-height: 1.5; margin-bottom: 10px;"><strong>Price:</strong> ${price}</p>
            <p style="color: #555555; font-size: 16px; line-height: 1.5; margin-bottom: 10px;"><strong>Date:</strong> ${date}</p>
          </div>
          <div style="text-align: center; color: #999999; font-size: 14px;">
            <p>If you have any questions or need assistance, feel free to contact us at <a href="mailto:support@example.com">support@example.com</a>.</p>
            <p>Thank you,<br> Bitnex Team</p>
          </div>
        </div>
      
      </body>
      </html>
      
      `;
    };

    await mailTransport().sendMail({
      from: "Bitnex@gmail.com",
      to: this.email,
      subject: "Transaction Notification",
      html: transactionTemplate(type, coinName, quantity, price, date),
    });

    console.log("Transaction email sent successfully");
  } catch (err) {
    console.error("Error sending transaction email:", err);
    throw err; // Propagate the error to the caller
  }
};

mongoose.model("UserInfo", UserDetailsSchema);
